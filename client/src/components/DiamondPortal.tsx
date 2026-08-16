import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as Tone from 'tone';

interface Diamond {
  name: string;
  color: number;
  note: string;
  desc: string;
}

interface DiamondPortalProps {
  onInteraction?: () => void;
  onComplete?: () => void;
}

const DIAMONDS: Diamond[] = [
  { name: 'RUBY', color: 0xe0115f, note: 'C4', desc: 'EL ANCLA' },
  { name: 'SAPPHIRE', color: 0x0f52ba, note: 'E4', desc: 'EL CRONISTA' },
  { name: 'PURE LIGHT', color: 0xffffff, note: 'G4', desc: 'LA TRANSCENDENCIA' },
  { name: 'GOLD', color: 0xffd700, note: 'B4', desc: 'EL GUERRERO' },
  { name: 'EMERALD', color: 0x50c878, note: 'D5', desc: 'LA INTERFAZ' },
];

interface Shockwave {
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  age: number;
}

export function DiamondPortal({ onInteraction, onComplete }: DiamondPortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDiamonds, setActiveDiamonds] = useState<Set<number>>(new Set());
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const activeSetRef = useRef<Set<number>>(new Set());
  const onInteractionRef = useRef(onInteraction);
  const onCompleteRef = useRef(onComplete);
  onInteractionRef.current = onInteraction;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 520;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0x222222, 0.25));
    const keyLight = new THREE.PointLight(0xff003c, 3.5, 100);
    keyLight.position.set(4, 4, 6);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x00ffff, 1.2, 80);
    fillLight.position.set(-5, 3, 3);
    scene.add(fillLight);
    const goldLight = new THREE.PointLight(0xffd700, 1.4, 80);
    goldLight.position.set(0, -4, -4);
    scene.add(goldLight);

    const positions: [number, number, number][] = [[-5, 0, 0], [-2.5, 1.5, -1], [0, -0.5, 1], [2.5, 1, -0.5], [5, -0.5, 0]];
    const diamonds: THREE.Group[] = [];
    const shocks: Shockwave[] = [];

    DIAMONDS.forEach((diamond, index) => {
      const geometry = new THREE.OctahedronGeometry(1.2, 0);
      geometry.scale(1, 1.8, 1);
      const material = new THREE.MeshPhysicalMaterial({
        color: diamond.color,
        metalness: 0.1,
        roughness: 0.04,
        transmission: 0.72,
        thickness: 1.2,
        ior: 2.2,
        clearcoat: 1,
        emissive: diamond.color,
        emissiveIntensity: 0.18,
        transparent: true,
        opacity: 0.94,
      });
      const group = new THREE.Group();
      group.position.set(...positions[index]);
      group.scale.setScalar(0.82);
      group.userData = { index, active: false, baseY: positions[index][1], velocity: 0, hover: 0, pulse: 0 };
      group.add(new THREE.Mesh(geometry, material));
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 }));
      group.add(wire);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), new THREE.MeshBasicMaterial({ color: diamond.color, transparent: true, opacity: 0.55 }));
      group.add(glow);
      scene.add(group);
      diamonds.push(group);
    });

    camera.position.set(0, 0, 10);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered = -1;
    let frameId = 0;

    const initAudio = async () => {
      await Tone.start();
      if (!synthRef.current) {
        reverbRef.current = new Tone.Reverb({ decay: 4, wet: 0.35 }).toDestination();
        synthRef.current = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'fatsawtooth' }, envelope: { attack: 0.02, decay: 0.24, sustain: 0.35, release: 2.8 } }).connect(reverbRef.current);
        synthRef.current.volume.value = -12;
      }
    };

    const activate = async (index: number) => {
      const group = diamonds[index];
      if (!group || group.userData.active) return;
      group.userData.active = true;
      group.userData.pulse = 1;
      const next = new Set(activeSetRef.current);
      next.add(index);
      activeSetRef.current = next;
      setActiveDiamonds(next);
      onInteractionRef.current?.();
      if (next.size === DIAMONDS.length) onCompleteRef.current?.();
      await initAudio();
      synthRef.current?.triggerAttackRelease(DIAMONDS[index].note, '2n');
      keyLight.color.setHex(DIAMONDS[index].color);
      const material = new THREE.MeshBasicMaterial({ color: DIAMONDS[index].color, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
      const shock = new THREE.Mesh(new THREE.RingGeometry(1, 1.12, 40), material);
      shock.position.copy(group.position);
      shock.rotation.x = Math.PI / 2;
      scene.add(shock);
      shocks.push({ mesh: shock, material, age: 0 });
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(diamonds, true)[0];
      hovered = -1;
      diamonds.forEach((group) => { group.userData.hover = 0; });
      if (hit) {
        let parent: THREE.Object3D | null = hit.object;
        while (parent && !diamonds.includes(parent as THREE.Group)) parent = parent.parent;
        if (parent && diamonds.includes(parent as THREE.Group)) {
          hovered = (parent as THREE.Group).userData.index;
          (parent as THREE.Group).userData.hover = 1;
        }
      }
      canvas.style.cursor = hovered >= 0 ? 'pointer' : 'crosshair';
    };
    const handleClick = () => { if (hovered >= 0) void activate(hovered); };
    const handleResize = () => {
      const nextWidth = canvas.clientWidth || 900;
      const nextHeight = canvas.clientHeight || 520;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      diamonds.forEach((group, index) => {
        const data = group.userData;
        data.velocity += Math.sin(time * 1.35 + index * 0.85) * 0.002;
        data.velocity *= 0.96;
        group.position.y += data.velocity;
        group.position.y += (data.baseY + Math.sin(time * 1.5 + index) * 0.18 - group.position.y) * 0.045;
        group.rotation.y = time * (0.28 + index * 0.025);
        group.rotation.x = Math.sin(time * 0.45 + index) * 0.18;
        const targetScale = 0.82 + data.hover * 0.16 + data.pulse * 0.18;
        const nextScale = THREE.MathUtils.lerp(group.scale.x, targetScale, 0.16);
        group.scale.setScalar(nextScale);
        data.pulse *= 0.92;
      });
      shocks.forEach((shock) => {
        shock.age += 0.016;
        const progress = Math.min(shock.age / 1.1, 1);
        shock.mesh.scale.setScalar(1 + progress * 4.5);
        shock.material.opacity = 0.85 * (1 - progress);
      });
      while (shocks.length && shocks[0].age >= 1.1) {
        const expired = shocks.shift();
        if (expired) { scene.remove(expired.mesh); expired.mesh.geometry.dispose(); expired.material.dispose(); }
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);
      diamonds.forEach((group) => group.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((mat) => mat.dispose());
          else object.material.dispose();
        }
      }));
      renderer.dispose();
    };
  }, []);

  return (
    <div className="diamond-portal">
      <div className="portal-meta"><span>FRAGMENT ARRAY / {activeDiamonds.size.toString().padStart(2, '0')} OF 05 ONLINE</span><span>CLICK TO AWAKEN</span></div>
      <canvas ref={canvasRef} className="diamonds-canvas" aria-label="Portal 3D de cinco fragmentos interactivos"></canvas>
      <div className="diamond-info"><p>Five frequencies hold the missing architecture of the Judas Era.</p><p className="unlock-counter">{activeDiamonds.size === DIAMONDS.length ? '◆ ALL FRAGMENTS SYNCHRONIZED' : `UNLOCKED ${activeDiamonds.size} / ${DIAMONDS.length}`}</p></div>
      <div className="fragment-legend">{DIAMONDS.map((diamond, index) => <span key={diamond.name} className={activeDiamonds.has(index) ? 'active' : ''}><i style={{ backgroundColor: `#${diamond.color.toString(16).padStart(6, '0')}` }} />{diamond.name}<small>{diamond.desc}</small></span>)}</div>
    </div>
  );
}

export default DiamondPortal;
