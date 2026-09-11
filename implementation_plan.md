# Co-Climate — New Premium Landing Page

A completely new, immersive digital experience that communicates Co-Climate's brand at the intersection of **Nature × Data × Verification × Impact**.

---

## Creative Concept: "From Ground to Globe"

### Core Idea

The visitor begins with **nothingness** — a dark, breathing void with faint organic particles. As they scroll, the experience builds through **five cinematic acts**:

1. **VOID → TERRAIN** — Abstract data particles coalesce into a digital topographic landscape
2. **TERRAIN → LIFE** — Vegetation emerges from the terrain, a single tree grows
3. **LIFE → OBSERVATION** — The camera pulls back, data overlays appear — coordinates, measurements, growth metrics
4. **OBSERVATION → EVIDENCE** — Evidence crystallizes: photographic proof, verified data points, traceable claims
5. **EVIDENCE → SCALE** — The camera pulls dramatically outward to reveal the full globe, dotted with verified restoration sites

**The message builds organically:**
> *Something is growing. We can see it. We can measure it. We can prove it. And it's happening everywhere.*

This is not a website with sections. It's a **scrollable film** with moments of interaction.

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Vite + React |
| **3D Engine** | Three.js via React Three Fiber + Drei |
| **Animation** | GSAP (ScrollTrigger) + Framer Motion |
| **Styling** | Vanilla CSS with CSS custom properties |
| **Fonts** | Google Fonts: **Instrument Serif** (display) + **Inter** (body) |
| **Performance** | Intersection Observer, lazy loading, `prefers-reduced-motion`, code splitting |

---

## Visual Direction

### Color Palette

| Token | Value | Role |
|---|---|---|
| `--void` | `#050505` | Primary background — deep black |
| `--terrain` | `#0a1a12` | Dark forest green |
| `--canopy` | `#1a3a28` | Mid green |
| `--evidence` | `#c8e6c0` | Light verification green |
| `--signal` | `#a0f0b0` | Bright accent — data signal |
| `--earth` | `#e8dcc8` | Warm earth tone |
| `--chalk` | `#f5f2ed` | Off-white text |
| `--mist` | `rgba(245,242,237,0.06)` | Glassmorphism |

### Typography Scale

- **Display**: Instrument Serif, 8vw–12vw, tracking tight
- **Headline**: Instrument Serif, 3vw–5vw
- **Statement**: Inter, 1.25rem–1.5rem, 400 weight, generous line height
- **Label**: Inter, 0.75rem, uppercase, tracked wide, 500 weight
- **Body**: Inter, 1rem, 300 weight

### Design Principles

- **Dark-first**: The entire experience lives on near-black backgrounds
- **Cinematic aspect**: Full-viewport scenes, no visible chrome
- **Restrained motion**: Every animation serves the narrative
- **Organic geometry**: No sharp cards or boxy layouts — flowing, terrain-like compositions
- **Data as texture**: Numbers, coordinates, measurements appear as ambient visual elements

---

## Page Structure — Five Acts

### Act 0: Prelude (Loader)
A minimal black screen. Faint coordinate numbers count up. A thin progress line. The word "Co-Climate" fades in at the end, then the experience begins.

### Act 1: "Something is growing."
**The Hero — Data Becomes Terrain**

- Full-screen 3D canvas
- Thousands of subtle green particles drift in a void
- As the user scrolls, particles begin to organize — they form a terrain mesh
- A procedurally generated topographic landscape rises from the void
- Faint grid lines and contour marks appear on the terrain (like a topographic map)
- A single, bold statement fades in: **"The planet doesn't need promises. It needs proof."**
- Subtle cursor-driven parallax on the terrain

### Act 2: "Look closer."
**Observation — Life Emerges**

- Continued scroll drives the camera closer to the terrain surface
- A single stylized tree grows from the landscape (3D, animated growth)
- Then more trees begin to emerge across the terrain
- Data labels start appearing: `LAT 4.2°N` `LON 73.5°E` `ALT 42m`
- Statement: **"Every restoration begins with a place."**
- The terrain develops subtle color — greens deepen, earth tones appear

### Act 3: "Make it measurable."
**Evidence — Data Overlay**

- The scene transitions: the 3D terrain becomes semi-transparent
- Overlaid measurement graphics appear: growth rings, canopy density, biomass estimates
- Floating data cards with mock metrics: `+47% canopy cover` `12.4 tonnes CO₂/yr` `Verified: Aug 2026`
- A circular scanner/radar animation sweeps across the terrain
- Statement: **"Nature leaves evidence. We make it count."**
- Interactive: hovering on data points reveals deeper metrics

### Act 4: "Prove it."
**Verification — Trust Layer**

- The visual shifts from organic to structured
- A timeline visualization shows the lifecycle of a claim: `Planted → Growing → Measured → Verified → Impact`
- Each step illuminated with a subtle glow as user scrolls through
- Photographic evidence thumbnails appear (generated images of field work, satellite views)
- Statement: **"From ground truth to global trust."**
- Glassmorphic panels with verification data

### Act 5: "See the scale."
**Scale — The Globe**

- Dramatic camera pull-out
- The terrain we've been exploring is revealed as one small patch on a rotating globe
- Other verified sites illuminate across the globe — green pulses
- Counter animation: `2,847 sites verified` `14 countries` `1.2M hectares monitored`
- Statement: **"One site at a time. One planet to prove."**
- The globe slowly rotates, sites pulse softly

### Coda: Contact / CTA

- Minimal footer section
- Dark, clean, confident
- "Let's make impact visible." + email / contact form
- Social links
- © Co-Climate 2026

---

## Custom 3D Components

| Component | Description |
|---|---|
| `TerrainMesh` | Procedural terrain from noise, with scroll-driven reveal animation |
| `ParticleField` | Organic particle system that morphs from chaos → terrain shape |
| `GrowingTree` | Stylized tree with animated growth (trunk → branches → canopy) |
| `DataOverlay` | 3D-positioned HTML labels with coordinates and metrics |
| `GlobeScene` | Stylized Earth with illuminated verification sites |
| `ScannerRing` | Animated radar/scanner ring that sweeps across terrain |

---

## Custom UI Components

| Component | Description |
|---|---|
| `Preloader` | Minimal coordinate counter + progress line |
| `ScrollProgress` | Thin vertical line showing scroll position |
| `StatementReveal` | Text that reveals word-by-word on scroll |
| `MetricCard` | Glassmorphic floating data card |
| `VerificationTimeline` | Horizontal timeline with scroll-driven activation |
| `MagneticButton` | Button with magnetic cursor attraction |
| `SectionTransition` | Gradient fade between acts |

---

## Interactions

| Interaction | Location | Description |
|---|---|---|
| Scroll-driven 3D | Acts 1–5 | Camera position, terrain reveal, tree growth all driven by scroll progress |
| Cursor parallax | Act 1 | Subtle terrain tilt following mouse |
| Hover data reveal | Act 3 | Data points expand on hover to show deeper metrics |
| Magnetic CTA | Coda | Button follows cursor with elastic spring |
| Word-by-word reveal | All statements | Key sentences reveal progressively on scroll |

---

## Mobile Strategy

| Desktop | Mobile |
|---|---|
| Full 3D terrain with particles | Simplified terrain, fewer particles |
| Cursor-driven parallax | Device orientation tilt (if available) or static |
| Horizontal timeline | Vertical stacked timeline |
| Globe with many sites | Globe with fewer sites, larger markers |
| Complex hover states | Tap-to-reveal |
| Large viewport compositions | Focused single-element compositions |
| GSAP scroll animations | Simplified CSS-driven animations with `prefers-reduced-motion` |

---

## Performance Strategy

- **Three.js**: Use `InstancedMesh` for particles, low-poly geometries, compressed textures
- **GSAP**: Use `ScrollTrigger` with `scrub` for smooth scroll-driven animation
- **Code splitting**: Lazy-load 3D scenes per act using `React.lazy` + `Suspense`
- **Canvas management**: Only render visible 3D scenes, pause off-screen canvases
- **Mobile detection**: Reduce particle counts, simplify geometries, skip heavy shaders
- **`prefers-reduced-motion`**: Provide a graceful static version with key visuals

---

## File Structure

```
coclimate-landingpage/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── fonts/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css                    # Design system + tokens
│   ├── components/
│   │   ├── Preloader.jsx
│   │   ├── Preloader.css
│   │   ├── ScrollProgress.jsx
│   │   ├── ScrollProgress.css
│   │   ├── StatementReveal.jsx
│   │   ├── StatementReveal.css
│   │   ├── MetricCard.jsx
│   │   ├── MetricCard.css
│   │   ├── VerificationTimeline.jsx
│   │   ├── VerificationTimeline.css
│   │   ├── MagneticButton.jsx
│   │   ├── MagneticButton.css
│   │   ├── Navigation.jsx
│   │   └── Navigation.css
│   ├── scenes/
│   │   ├── HeroScene.jsx            # Act 1: Particles → Terrain
│   │   ├── ObservationScene.jsx     # Act 2: Life emerges
│   │   ├── MeasurementScene.jsx     # Act 3: Data overlay
│   │   ├── VerificationScene.jsx    # Act 4: Trust layer
│   │   └── GlobeScene.jsx           # Act 5: Global scale
│   ├── three/
│   │   ├── TerrainMesh.jsx
│   │   ├── ParticleField.jsx
│   │   ├── GrowingTree.jsx
│   │   ├── DataOverlay.jsx
│   │   ├── Globe.jsx
│   │   ├── ScannerRing.jsx
│   │   └── shaders/
│   │       ├── terrain.vert
│   │       ├── terrain.frag
│   │       ├── particle.vert
│   │       └── particle.frag
│   ├── sections/
│   │   ├── ActOne.jsx               # "Something is growing."
│   │   ├── ActTwo.jsx               # "Look closer."
│   │   ├── ActThree.jsx             # "Make it measurable."
│   │   ├── ActFour.jsx              # "Prove it."
│   │   ├── ActFive.jsx              # "See the scale."
│   │   └── Coda.jsx                 # Contact / CTA
│   ├── hooks/
│   │   ├── useScrollProgress.js
│   │   ├── useReducedMotion.js
│   │   ├── useMobile.js
│   │   └── useMousePosition.js
│   └── utils/
│       ├── noise.js                 # Simplex noise for terrain
│       └── constants.js
```

---

## Open Questions

> [!IMPORTANT]
> **Hero concept preference**: I've proposed "Data Becomes Terrain" (Option D from your brief, evolved). The particles → terrain → life → data → globe journey creates a cinematic arc. Are you drawn to this direction, or would you prefer one of the other options (Living Ecosystem, Digital Earth, One Living Object)?

> [!IMPORTANT]
> **Brand assets**: Do you have a Co-Climate logo (SVG preferred), brand colors, or any existing brand guidelines? If not, I'll design the logo treatment and define the full visual identity from scratch.

> [!NOTE]
> **Font choice**: I'm proposing **Instrument Serif** (display) + **Inter** (body). Instrument Serif has an elegant, editorial quality that feels both premium and organic. If you have a preference for different typography, let me know.

> [!NOTE]
> **Contact section**: Should the CTA lead to an email address, a contact form, or a Calendly-style booking link? I'll design it minimally either way.

---

## Verification Plan

### Dev Server Testing
- Run `npm run dev` and verify all 3D scenes render correctly
- Test scroll-driven animations through all five acts
- Verify mobile responsiveness at 375px, 428px, 768px, 1024px, 1440px, 1920px

### Performance
- Check Lighthouse performance score (target: 80+)
- Verify `prefers-reduced-motion` fallback works
- Test on simulated slow 3G for lazy loading behavior

### Visual Quality
- Browser recording of the full scroll experience
- Screenshot each act at desktop and mobile breakpoints
- Verify all text is readable, all interactions are smooth

### Build Verification
- Run `npm run build` to ensure production bundle compiles without errors
