# BELENTANI // JUDAS ERA - Design Philosophy

## Enfoque Elegido: **AETHERPUNK ORACLE**

### Design Movement
**Aetherpunk Mysticism** - Fusión de cyberpunk futurista con misticismo digital. Un sistema operativo humano renderizado en código, donde la traición es input y la voz es output.

### Core Principles
1. **Máquina Viva:** La interfaz respira, pulsa, reacciona. Cada elemento tiene comportamiento orgánico dentro de la precisión algorítmica.
2. **Dualidad Sagrada:** Negro absoluto (vacío, silencio) vs. Rojo neón (presencia, energía, traición). Oro sagrado como revelación.
3. **Narrativa Interactiva:** El usuario es agente en la crónica de la Llave Dorada. Desafíos desbloquean capas de la historia.
4. **Precisión Estética:** Cada píxel cuenta. Tipografía monoespaciada para logs, fuentes fantasy para títulos, sans-serif para UI.

### Color Philosophy
- **Fondo:** `#050505` (negro absoluto - el vacío donde todo comienza)
- **Primario:** `#ff003c` (rojo sangre - traición, energía, presencia)
- **Acentos:** 
  - `#ffd700` (oro sagrado - revelación, llave dorada)
  - `#00ff41` (verde terminal - sistema operativo, logs)
  - `#00ffff` (cyan aether - lo etéreo, lo digital)
  - `#b026ff` (púrpura void - misterio, portal)
- **Texto:** Blanco puro con opacidades para jerarquía

### Layout Paradigm
**Scroll Narrativo Vertical con Navegación Lateral Flotante**
- Hero immersivo (100vh) con boot sequence
- 8 secciones temáticas con parallax y scroll triggers
- Navegación de puntos flotante (derecha) que refleja progreso
- Chat IA fijo (esquina inferior derecha)
- HUD cyberpunk en bordes (información del sistema)

### Signature Elements
1. **Boot Sequence:** Animación terminal verde que carga el sistema
2. **Glass Panels:** Bordes biselados con gradiente rojo, efecto blur y glow
3. **Rune Circles:** Símbolos rotativos (Llave Dorada, diamantes) que giran lentamente
4. **Cursor Personalizado:** Punto brillante + cruz roja + outline dinámico
5. **Glitch Effects:** Distorsiones visuales en momentos de "colapso" (desafíos)

### Interaction Philosophy
- **Hover States:** Elementos responden con glow rojo, cambio de escala sutil
- **Click Feedback:** Escala 0.97 con transición 160ms
- **Scroll Triggers:** Elementos se animan al entrar en viewport
- **Desafíos:** Interacciones que desbloquean contenido (puzzle, secuencia, timing)

### Animation Guidelines
- **Entrada:** Fade + translateY(-20px) en 600ms con ease-out
- **Parallax:** Velocidad diferenciada por sección (0.5x a 2x)
- **Scroll Triggers:** Stagger de 80ms entre elementos
- **Loops:** Rotaciones lentas (60-80s), pulsaciones suaves (2s)
- **Transiciones UI:** 300ms máximo, ease-out cúbica

### Typography System
- **Display:** `Cinzel Decorative` 900 (títulos, llave dorada)
- **UI:** `Chakra Petch` 500-700 (botones, nav, labels)
- **Mono:** `JetBrains Mono` (logs, terminal, código)
- **Futurista:** `Orbitron` 700-900 (subtítulos, efectos)

### Brand Essence
**"Un sistema operativo humano corriendo cuatro procesos en paralelo: El Ángel, El Guerrero, El Analítico, El Cronista. Una voz. Un hombre. Una Llave Dorada."**

**Personalidad:** Misterioso, preciso, poético, rebelde, sagrado

### Brand Voice
- **Tonalidad:** Poética pero técnica. Místico pero algorítmico.
- **Ejemplo 1:** "La traición es el input. La voz es el output."
- **Ejemplo 2:** "Recuperaremos la llave. O cambiaremos la cerradura."
- **Prohibido:** Frases genéricas como "Welcome" o "Get started today"

### Wordmark & Logo
**Símbolo:** Una llave dorada estilizada con circuitos digitales, sobre un fondo transparente. Debe ser audaz, reconocible, sagrado.

### Signature Brand Color
**Rojo Neón Sangre:** `#ff003c` - inconfundible, energético, presente en cada interacción.

---

## Secciones Planificadas

1. **HOME** - Boot sequence + hero title
2. **THE ARTIST** - Bio de Belentani (4 arquetipos)
3. **MUSIC** - Discografía con reproductores Spotify
4. **JUDAS** - La crónica de la Llave Dorada (5 fases)
5. **PORTAL** - Diamantes 3D interactivos (desafío)
6. **ART GALLERY** - Galería con efectos glitch
7. **STUDIO** - AI tools (chat, generador de letras, análisis emocional)
8. **CONTACT** - Links a redes sociales

---

## Desafíos Gamificados

- **Desafío 1 (Portal):** Secuencia de clics en diamantes → Desbloquea Studio
- **Desafío 2 (Studio):** Generar 3 variantes de letras → Desbloquea Gallery
- **Desafío 3 (Gallery):** Encontrar 5 símbolos ocultos → Desbloquea Llave Dorada
- **Desafío 4 (Final):** Completar la crónica → Acceso a contenido secreto

---

## Assets & Recursos

- **Imágenes:** Links de Judas (catbox.moe) - 12 fotos upscaladas 4x
- **Audio:** Tone.js para sintetizador + melodías
- **3D:** Three.js para diamantes del portal
- **Animaciones:** GSAP 3.12.2 + ScrollTrigger


## Style Decisions

La reconstrucción conserva la composición cinematográfica, la escala tipográfica y el tono poético, pero recupera de forma visible el ADN Aetherpunk Oracle. La interfaz debe leerse como un sistema operativo humano: HUD, terminal, oráculo y archivo vivo, no como un portfolio editorial neutro.

El mundo cromático permanece dentro del void negro. Se eliminan las superficies crema y neutras; el contraste se construye con Blood Neon, Sacred Gold y señales pequeñas de Terminal Green, Cyan Aether y Void Purple. Cada módulo debe incluir al menos un marcador o glyph del Judas-era: llave dorada, círculo rúnico, diamante fracturado, línea de terminal o progreso de archivo.

La tipografía ceremonial queda reservada para las frases míticas. La interfaz usa Chakra Petch y JetBrains Mono para labels, estados, coordenates, logs y acciones. La voz de marca usa input/output, archive, ritual, process, key, portal, signal y memory.

La tecnología debe ser atmosférica e intencional. Los shaders no compiten con la narrativa; reaccionan a scroll y estado, mientras que los overlays HUD, scanlines y glyphs hacen visible que la página está activa.
