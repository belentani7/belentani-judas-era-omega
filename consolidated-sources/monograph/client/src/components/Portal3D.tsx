import { useEffect, useRef, useState } from 'react';

/**
 * PORTAL 3D - Diamantes Interactivos
 * Utiliza Three.js para renderizar 5 diamantes que rotan y responden a interacciones
 * Cada diamante representa una fase de la crónica de Judas
 */

export default function Portal3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const diamondsRef = useRef<any[]>([]);
  const [selectedDiamond, setSelectedDiamond] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x050505, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff003c, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffd700, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create 5 diamonds
    const diamondPositions = [
      { x: -3, y: 0, z: 0 },
      { x: -1.5, y: 1.5, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1.5, y: -1.5, z: 0 },
      { x: 3, y: 0, z: 0 },
    ];

    const diamondPhases = [
      'El Hombre Integrado',
      'La Deuda Impagable',
      'El Robo y El Canto',
      'La Victoria Amarga',
      'La Mentira Compartida',
    ];

    diamondPositions.forEach((pos, idx) => {
      // Diamond geometry (octahedron)
      const geometry = new THREE.OctahedronGeometry(0.6, 2);

      // Material with emissive color
      const material = new THREE.MeshPhongMaterial({
        color: idx === 0 ? 0xffd700 : 0xff003c,
        emissive: idx === 0 ? 0xffd700 : 0xff003c,
        emissiveIntensity: 0.3,
        shininess: 100,
        wireframe: false,
      });

      const diamond = new THREE.Mesh(geometry, material);
      diamond.position.set(pos.x, pos.y, pos.z);
      diamond.userData = {
        index: idx,
        phase: diamondPhases[idx],
        originalPos: { ...pos },
        rotationSpeed: 0.01 + Math.random() * 0.01,
      };

      scene.add(diamond);
      diamondsRef.current.push(diamond);
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(diamondsRef.current);

      diamondsRef.current.forEach((diamond) => {
        diamond.scale.set(1, 1, 1);
      });

      if (intersects.length > 0) {
        const selected = intersects[0].object as any;
        selected.scale.set(1.3, 1.3, 1.3);
      }
    };

    const onMouseClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(diamondsRef.current);

      if (intersects.length > 0) {
        const clicked = intersects[0].object as any;
        setSelectedDiamond(clicked.userData.index);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      diamondsRef.current.forEach((diamond) => {
        diamond.rotation.x += diamond.userData.rotationSpeed;
        diamond.rotation.y += diamond.userData.rotationSpeed * 1.5;

        // Floating animation
        diamond.position.y = diamond.userData.originalPos.y + Math.sin(Date.now() * 0.001 + diamond.userData.index) * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="w-full h-96 bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(255,0,60,0.05)] clip-corner border border-[#ffffff]/20" />

      {selectedDiamond !== null && (
        <div className="mt-6 p-6 glass-panel bg-gradient-to-br from-[rgba(20,0,10,0.8)] to-[rgba(0,0,0,0.6)] backdrop-blur-2xl border border-[rgba(255,0,60,0.4)]">
          <h3 className="font-[Cinzel_Decorative] text-2xl font-bold text-[#ffd700] mb-2">
            FASE_{selectedDiamond + 1}
          </h3>
          <p className="text-[rgba(255,255,255,0.7)] font-mono text-sm">
            {['El Hombre Integrado', 'La Deuda Impagable', 'El Robo y El Canto', 'La Victoria Amarga', 'La Mentira Compartida'][selectedDiamond]}
          </p>
          <p className="text-[rgba(255,255,255,0.5)] text-sm mt-3">
            Haz clic en otro diamante para explorar más fases...
          </p>
        </div>
      )}
    </div>
  );
}
