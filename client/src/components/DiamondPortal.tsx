import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as Tone from 'tone';

interface Diamond {
  name: string;
  color: number;
  note: string;
  desc: string;
}

export function DiamondPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDiamonds, setActiveDiamonds] = useState<Set<number>>(new Set());
  const synth = useRef<Tone.PolySynth | null>(null);
  const reverb = useRef<Tone.Reverb | null>(null);

  const diamondsData: Diamond[] = [
    { name: 'RUBY', color: 0xe0115f, note: 'C4', desc: 'El Ancla' },
    { name: 'SAPPHIRE', color: 0x0f52ba, note: 'E4', desc: 'El Cronista' },
    { name: 'PURE LIGHT', color: 0xffffff, note: 'G4', desc: 'La Transcendencia' },
    { name: 'GOLD', color: 0xffd700, note: 'B4', desc: 'El Guerrero' },
    { name: 'EMERALD', color: 0x50c878, note: 'D5', desc: 'La Interfaz' }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0x202020, 0.2));
    const keyLight = new THREE.PointLight(0xff003c, 3, 100);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x00ffff, 2, 100);
    fillLight.position.set(-5, 3, 3);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xffd700, 1.5, 100);
    backLight.position.set(0, -5, -5);
    scene.add(backLight);

    // Create diamonds
    const diamondMeshes: THREE.Group[] = [];
    const positions = [[-5, 0, 0], [-2.5, 1.5, -1], [0, -0.5, 1], [2.5, 1, -0.5], [5, -0.5, 0]];

    diamondsData.forEach((diamond, i) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: diamond.color,
        metalness: 0.1,
        roughness: 0.0,
        transmission: 0.9,
        thickness: 1.5,
        ior: 2.42,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        emissive: diamond.color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.95
      });

      const geo = new THREE.OctahedronGeometry(1.2, 0);
      geo.scale(1, 1.8, 1);

      const group = new THREE.Group();
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Wireframe
      const wireGeo = new THREE.EdgesGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
      group.add(new THREE.LineSegments(wireGeo, wireMat));

      // Glow
      const glowGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({ color: diamond.color, transparent: true, opacity: 0.6 });
      group.add(new THREE.Mesh(glowGeo, glowMat));

      group.position.set(...(positions[i] as [number, number, number]));
      group.scale.set(0.8, 0.8, 0.8);
      group.userData = { index: i, active: false };

      scene.add(group);
      diamondMeshes.push(group);
    });

    camera.position.set(0, 0, 10);

    // Raycasting for interaction
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();
    let hoveredDiamond: number | null = null;

    canvasRef.current.addEventListener('mousemove', (e) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(diamondMeshes, true);

      hoveredDiamond = null;
      diamondMeshes.forEach((mesh) => {
        mesh.children[0].scale.set(1, 1, 1);
      });

      if (intersects.length > 0) {
        let parent = intersects[0].object.parent;
        while (parent && !diamondMeshes.includes(parent as THREE.Group)) {
          parent = parent.parent;
        }
        if (parent && diamondMeshes.includes(parent as THREE.Group)) {
          hoveredDiamond = (parent as any).userData.index;
          (parent as any).children[0].scale.set(1.2, 1.2, 1.2);
        }
      }
    });

    canvasRef.current.addEventListener('click', async () => {
      if (hoveredDiamond !== null) {
        await activateDiamond(hoveredDiamond);
      }
    });

    // Initialize audio
    async function initAudio() {
      if (!synth.current) {
        await Tone.start();
        reverb.current = new Tone.Reverb({ decay: 5, wet: 0.4 }).toDestination();
        synth.current = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'fatsawtooth', count: 3, spread: 30 },
          envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 4 }
        }).connect(reverb.current);
        synth.current.volume.value = -10;
      }
    }

    async function activateDiamond(index: number) {
      const mesh = diamondMeshes[index];
      if (mesh.userData.active) return;

      mesh.userData.active = true;
      setActiveDiamonds((prev) => new Set(Array.from(prev).concat([index])));

      await initAudio();
      if (synth.current) {
        synth.current.triggerAttackRelease(diamondsData[index].note, '2n');
      }

      keyLight.color.setHex(diamondsData[index].color);

      // Shock wave
      const shockGeo = new THREE.RingGeometry(1, 1.2, 32);
      const shockMat = new THREE.MeshBasicMaterial({
        color: diamondsData[index].color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const shock = new THREE.Mesh(shockGeo, shockMat);
      shock.position.copy(mesh.position);
      scene.add(shock);

      // Animation
      let startTime = Date.now();
      const animateShock = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / 1, 1);
        shock.scale.set(1 + progress * 4, 1 + progress * 4, 1);
        shockMat.opacity = 0.8 * (1 - progress);
        if (progress < 1) {
          requestAnimationFrame(animateShock);
        } else {
          scene.remove(shock);
        }
      };
      animateShock();

      // Pulse
      let pulseTime = Date.now();
      const animatePulse = () => {
        const elapsed = (Date.now() - pulseTime) / 1000;
        const progress = Math.min(elapsed / 0.3, 1);
        const scale = 0.8 + Math.sin(progress * Math.PI) * 0.5;
        mesh.scale.set(scale, scale, scale);
        if (progress < 1) {
          requestAnimationFrame(animatePulse);
        } else {
          mesh.scale.set(0.8, 0.8, 0.8);
        }
      };
      animatePulse();
    }

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      diamondMeshes.forEach((mesh, i) => {
        mesh.rotation.y = elapsedTime * 0.5;
        mesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.3;
        mesh.position.y += Math.sin(elapsedTime * 2 + i) * 0.001;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="diamond-portal">
      <canvas ref={canvasRef} className="diamonds-canvas"></canvas>
      <div className="diamond-info">
        <p>Click on the diamonds to unlock fragments of the Judas Era.</p>
        <p>Unlocked: {Array.from(activeDiamonds).length} / 5</p>
      </div>
    </div>
  );
}
