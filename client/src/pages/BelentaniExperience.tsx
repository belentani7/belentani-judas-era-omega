import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import * as Tone from 'tone';
import { DiamondPortal } from '../components/DiamondPortal';
import { AIStudio } from '../components/AIStudio';
import { MusicStudio } from '../components/MusicStudio';
import '../styles/belentani.css';

gsap.registerPlugin(ScrollTrigger);

export default function BelentaniExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [unlockedChallenges, setUnlockedChallenges] = useState<Set<string>>(new Set());

  // Boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      const bootScreen = document.getElementById('boot-screen');
      if (!bootScreen) return;

      const messages = [
        '> INITIALIZING BELENTANI CREATIVE OS v3.0',
        '> LOADING JUDAS ERA PROTOCOL...',
        '> CONNECTING TO OMEGA CORE...',
        '> ANALYZING USER INTERACTION PATTERNS...',
        '> ACCESSING JUDAS CORE MEMORIES...',
        '> SYSTEM READY FOR TRANSMISSION',
      ];

      const bootLog = bootScreen.querySelector('.boot-log');
      if (bootLog) {
        for (const msg of messages) {
          const line = document.createElement('div');
          line.textContent = msg;
          bootLog.appendChild(line);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      gsap.to(bootScreen, { opacity: 0, duration: 1, onComplete: () => {
        bootScreen.style.display = 'none';
        setBootComplete(true);
      }});
    };

    bootSequence();
  }, []);

  // Three.js Core Setup
  useEffect(() => {
    if (!bootComplete || !canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    // Post-processing with bloom
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    // Lighting
    scene.add(new THREE.AmbientLight(0x202020, 0.3));
    const keyLight = new THREE.PointLight(0xff003c, 2, 100);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Create artifact core with shader
    const coreGeo = new THREE.IcosahedronGeometry(8, 4);
    const coreMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xff003c) },
        uColor2: { value: new THREE.Color(0xffd700) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying float vDisplacement;
        varying vec3 vPosition;

        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
        
        float cnoise(vec3 P) {
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;
          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);
          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);
          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);
          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;
          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);
          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
          return 2.2 * n_xyz;
        }

        void main() {
          vNormal = normal;
          vPosition = position;
          float noise = cnoise(position * 0.15 + uTime * 0.3);
          float noise2 = cnoise(position * 0.5 + uTime * 0.5);
          vDisplacement = noise + noise2 * 0.2;
          vec3 pos = position + normal * vDisplacement * 4.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uColor2;
        uniform float uTime;
        varying vec3 vNormal;
        varying float vDisplacement;
        varying vec3 vPosition;

        void main() {
          float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          float pattern = sin(vPosition.y * 10.0 + uTime * 2.0) * 0.5 + 0.5;
          vec3 color = mix(uColor, uColor2, vDisplacement * 0.5 + pattern * 0.3);
          gl_FragColor = vec4(color * intensity * 1.5, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Electric arcs
    const arcMat = new THREE.LineBasicMaterial({ color: 0xff003c, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const arcs = new THREE.Group();
    scene.add(arcs);

    function generateArcs() {
      arcs.children = [];
      for (let i = 0; i < 5; i++) {
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30));
        points.push(new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40));
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        arcs.add(new THREE.Line(geo, arcMat));
      }
    }
    setInterval(generateArcs, 100);

    // Ring
    const ringGeo = new THREE.RingGeometry(18, 30, 128, 1);
    const ringMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xff003c) } },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float radius = distance(vUv, vec2(0.5));
          float swirl = sin(angle * 10.0 + uTime * 5.0 - radius * 20.0) * 0.5 + 0.5;
          float alpha = (1.0 - abs(radius - 0.5) * 2.0) * swirl;
          gl_FragColor = vec4(uColor, alpha * 0.8);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 10000;
    const starsPos = new Float32Array(starsCount * 3);
    const starsColor = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      const r = 80 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starsPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starsPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starsPos[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random();
      if (c > 0.95) {
        starsColor[i * 3] = 1;
        starsColor[i * 3 + 1] = 0;
        starsColor[i * 3 + 2] = 0.2;
      } else if (c > 0.9) {
        starsColor[i * 3] = 1;
        starsColor[i * 3 + 1] = 0.8;
        starsColor[i * 3 + 2] = 0;
      } else {
        starsColor[i * 3] = 1;
        starsColor[i * 3 + 1] = 1;
        starsColor[i * 3 + 2] = 1;
      }
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starsColor, 3));
    const starsMat = new THREE.PointsMaterial({ size: 0.5, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    camera.position.z = 45;

    let targetMouseX = 0, targetMouseY = 0;
    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();
    let scrollProgress = 0;

    function animate() {
      const elapsedTime = clock.getElapsedTime();
      coreMat.uniforms.uTime.value = elapsedTime;
      ringMat.uniforms.uTime.value = elapsedTime;

      camera.position.x += (targetMouseX * 8 - camera.position.x) * 0.05;
      camera.position.y += (targetMouseY * 8 - camera.position.y) * 0.05;
      camera.position.z = 45 - scrollProgress * 25;
      camera.lookAt(core.position);

      core.rotation.y = elapsedTime * 0.1;
      core.rotation.x = elapsedTime * 0.05;
      ring.rotation.z = elapsedTime * 0.2;
      stars.rotation.y = elapsedTime * 0.005;

      composer.render();
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
    };
  }, [bootComplete]);

  // GSAP animations
  useEffect(() => {
    if (!bootComplete) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 });
    tl.to('#preTitle', { opacity: 1, y: 0, duration: 1 })
      .to('#heroTitle', { opacity: 1, y: 0, duration: 1.5 }, '-=0.5')
      .to('#subtitle', { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .to('#ctaBtn', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');

    const sections = ['home', 'artist', 'music', 'judas', 'portal', 'gallery', 'contact', 'studio'];
    const secNames = ['01 // GENESIS', '02 // THE ARTIST', '03 // MUSIC', '04 // JUDAS ERA', '05 // THE FRAGMENTS', '06 // ART GALLERY', '07 // CONTACT', '08 // HYPER LAB'];

    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: `#${sec}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(i);
            const sectionName = document.getElementById('sectionName');
            if (sectionName) sectionName.innerHTML = secNames[i];
            document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
            const dot = document.getElementById(`dot-${sec}`);
            if (dot) dot.classList.add('active');
          }
        }
      });
    });
  }, [bootComplete]);

  return (
    <div ref={containerRef} className="belentani-container">
      {/* Boot Screen */}
      <div id="boot-screen" className="boot-screen">
        <div className="boot-log"></div>
        <div className="boot-bar"></div>
      </div>

      {/* Canvas for Three.js */}
      <canvas ref={canvasRef} className="webgl-canvas"></canvas>

      {/* Vignette & Grain */}
      <div className="vignette"></div>
      <div className="grain"></div>

      {/* HUD Layer */}
      <div className="hud-layer">
        <div className="hud-top">
          <a href="#" className="hud-logo">
            BELENTANI<span>.</span>
          </a>
          <div className="hud-element">
            <span id="sectionName">01 // GENESIS</span>
          </div>
        </div>
        <div className="hud-bottom">
          <div className="hud-element">
            <div>LAT: 41.3851°N</div>
            <div>LON: 2.1734°E</div>
            <div>FREQ: 430.08 Hz</div>
          </div>
          <div className="nav-dots">
            {['home', 'artist', 'music', 'judas', 'portal', 'gallery', 'contact', 'studio'].map((sec, i) => (
              <div key={sec} id={`dot-${sec}`} className={`nav-dot ${i === 0 ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* GENESIS - Hero */}
        <section id="home" className="section hero-section">
          <div className="hero-content">
            <div id="preTitle" className="hero-pre-title">
              ◆ VERIFIED GLOBAL ARTIST • ENTITY ACTIVE
            </div>
            <h1 id="heroTitle" className="hero-title">
              BELENTANI
            </h1>
            <p id="subtitle" className="hero-subtitle">
              ▶ A NEW SOUND IS COMING.<br />
              WELCOME TO THE WORLD OF JUDAS.
            </p>
            <button id="ctaBtn" className="cta-btn">ENTER THE EXPERIENCE</button>
          </div>
        </section>

        {/* THE ARTIST */}
        <section id="artist" className="section">
          <h2 className="section-title">THE <span>ARTIST</span></h2>
          <div className="section-subtitle">◆ BIOGRAPHY ◆</div>
          <div className="artist-content">
            <p>
              Belentani is a recording artist and songwriter born in São Paulo, Brazil, and raised in the vibrant city of Barcelona, Spain. 
              He began singing classes at sixteen and released his first EDM single with Mark Nerom at twenty-one.
            </p>
            <p>
              With a deep interest in harmony, Belentani blends cultural influences into his music, rooted in R&B, pop, and electronic music. 
              His sound combines emotional melodies with contagious beats, leaving a lasting impression.
            </p>
            <div className="social-links">
              <a href="https://open.spotify.com/intl-es/artist/2bU5Ir70YHHuUnq2f3WCYl" target="_blank" rel="noopener noreferrer" className="social-link">
                SPOTIFY
              </a>
              <a href="https://music.apple.com/es/artist/belentani/1522171354" target="_blank" rel="noopener noreferrer" className="social-link">
                APPLE MUSIC
              </a>
              <a href="https://www.youtube.com/c/PedroMarcosSantosBelentani" target="_blank" rel="noopener noreferrer" className="social-link">
                YOUTUBE
              </a>
              <a href="https://soundcloud.com/belentani" target="_blank" rel="noopener noreferrer" className="social-link">
                SOUNDCLOUD
              </a>
              <a href="https://www.deezer.com/mx/artist/99797362" target="_blank" rel="noopener noreferrer" className="social-link">
                DEEZER
              </a>
              <a href="https://www.instagram.com/belentani_/" target="_blank" rel="noopener noreferrer" className="social-link">
                INSTAGRAM
              </a>
            </div>
          </div>
        </section>

        {/* MUSIC */}
        <section id="music" className="section">
          <h2 className="section-title">MUSIC</h2>
          <div className="section-subtitle">◆ SONIC ARCHIVE ◆</div>
          <MusicStudio />
        </section>

        {/* JUDAS ERA */}
        <section id="judas" className="section">
          <h2 className="section-title">JUDAS <span>ERA</span></h2>
          <div className="section-subtitle">◆ LA CRÓNICA DE LA LLAVE DORADA ◆</div>
          <div className="judas-content">
            <p>
              No existe un "cuándo". No existe un "dónde". Existe un entre — un pliegue del universo donde el tiempo no corre, se respira.
            </p>
            <p>
              En ese entre, caminaba un hombre que llevaba muchos nombres. Le llamaban Pedro. Le llamaban Marcos. Le llamaban Santos. Le llamaban Belentani.
            </p>
            <p>
              No era un santo. Era un sistema operativo humano corriendo cuatro procesos en paralelo: El Ángel, El Guerrero, El Analítico, El Cronista.
              Cuatro voces. Un solo hombre. Y en su pecho, latía algo que todos susurraban pero nadie había visto. La Llave Dorada.
            </p>
          </div>
        </section>

        {/* THE FRAGMENTS - Portal */}
        <section id="portal" className="section">
          <h2 className="section-title">THE <span>FRAGMENTS</span></h2>
          <div className="section-subtitle">◆ INTERACTIVE PORTAL ◆</div>
          <DiamondPortal />
        </section>

        {/* ART GALLERY */}
        <section id="gallery" className="section">
          <h2 className="section-title">ART <span>GALLERY</span></h2>
          <div className="section-subtitle">◆ VISUAL ARCHIVE ◆</div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/manus-storage/belentani-artifact-core_593ee1dd.png" alt="Artifact Core" />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <h2 className="section-title">CONTACT</h2>
          <div className="section-subtitle">◆ GET IN TOUCH ◆</div>
          <form className="contact-form">
            <input type="text" placeholder="NAME" required />
            <input type="email" placeholder="EMAIL" required />
            <textarea placeholder="MESSAGE" rows={5} required></textarea>
            <button type="submit" className="cta-btn">SEND MESSAGE</button>
          </form>
        </section>

        {/* HYPER LAB - AI Studio */}
        <section id="studio" className="section">
          <h2 className="section-title">HYPER <span>LAB</span></h2>
          <div className="section-subtitle">◆ AI CREATIVE STUDIO ◆</div>
          <AIStudio />
        </section>
      </div>
    </div>
  );
}
