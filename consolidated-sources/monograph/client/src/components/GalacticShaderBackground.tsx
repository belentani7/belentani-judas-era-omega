import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * BELENTANI // JUDAS ERA — GalacticShaderBackground
 * Motor de Shaders en Tiempo Real: Nebulosa cuántica, distorsión gravitacional,
 * partículas estelares volumétricas y procesamiento post-rendering (bloom/aberración cromática).
 */
export default function GalacticShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom Galactic Shader Material for Nebula Cloud
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vec3 pos = position;
        
        // Gravitational wave distortion
        float wave = sin(pos.x * 0.01 + uTime * 0.5) * cos(pos.y * 0.01 + uTime * 0.5) * 15.0;
        pos.z += wave;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      // Simplex noise approximation for quantum nebula
      float noise(vec2 p) {
        return sin(p.x * 10.0 + uTime) * cos(p.y * 10.0 + uTime);
      }

      void main() {
        vec2 uv = vUv;
        vec2 mouseOffset = uMouse * 0.05;
        uv += mouseOffset;

        // Galactic color palette: Absolute void, Blood Red, Sacred Gold, Quantum Cyan
        vec3 colVoid = vec3(0.02, 0.02, 0.03);
        vec3 colBlood = vec3(1.0, 0.0, 0.23);
        vec3 colGold = vec3(1.0, 0.84, 0.0);
        vec3 colCyan = vec3(0.0, 1.0, 1.0);

        float n = noise(uv * 3.0 + uTime * 0.1);
        float dist = length(uv - vec2(0.5 + uMouse.x * 0.1, 0.5 + uMouse.y * 0.1));
        
        vec3 finalColor = mix(colVoid, colBlood, smoothstep(0.8, 0.1, dist));
        finalColor = mix(finalColor, colGold, abs(n) * 0.6);
        finalColor += colCyan * (1.0 - smoothstep(0.0, 0.4, dist)) * 0.4;

        // Scanline interference
        float scanline = sin(vPosition.y * 2.0 + uTime * 5.0) * 0.04;
        finalColor -= scanline;

        gl_FragColor = vec4(finalColor, 0.85);
      }
    `;

    const nebulaGeometry = new THREE.PlaneGeometry(1200, 1200, 64, 64);
    const nebulaUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const nebulaMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: nebulaUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebulaMesh);

    // Starfield Particle System
    const particleCount = 4500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 1600;
      particlePositions[i + 1] = (Math.random() - 0.5) * 1600;
      particlePositions[i + 2] = (Math.random() - 0.5) * 1600;

      const colorChoice = Math.random();
      if (colorChoice > 0.7) {
        // Gold
        particleColors[i] = 1.0;
        particleColors[i + 1] = 0.84;
        particleColors[i + 2] = 0.0;
      } else if (colorChoice > 0.4) {
        // Red Blood
        particleColors[i] = 1.0;
        particleColors[i + 1] = 0.0;
        particleColors[i + 2] = 0.23;
      } else {
        // Quantum Cyan
        particleColors[i] = 0.0;
        particleColors[i + 1] = 1.0;
        particleColors[i + 2] = 1.0;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starField);

    // Mouse interaction listener
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      nebulaUniforms.uTime.value = elapsedTime;
      nebulaUniforms.uMouse.value.set(mouse.x, mouse.y);

      // Rotate starfield & nebula slowly
      starField.rotation.y = elapsedTime * 0.03 + mouse.x * 0.1;
      starField.rotation.x = elapsedTime * 0.015 + mouse.y * 0.1;

      nebulaMesh.rotation.z = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: '#050505' }}
    />
  );
}
