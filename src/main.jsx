import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { generateSceneFromPrompt, commandExamples } from './services/ai/sceneGenerator'
import './styles.css'

const projects = [
  ['01', 'Synthetic Architecture', 'EXPERIMENT', 'AI-assisted 3D environment generation exploring spatial moods.', 'React · WebGL · Procedural systems', 'Visual exploration'],
  ['02', 'Neural Canvas', 'PROTOTYPE', 'A generative visual identity system shaped by direction and constraints.', 'Creative coding · GLSL · AI', 'Concept generation'],
  ['03', 'Spatial Intelligence', 'AI RESEARCH', 'Interactive information landscapes built around living data.', 'R3F · Three.js · Data', 'Procedural generation'],
  ['04', 'Impossible Objects', 'CONCEPT', 'Prompt-led geometry studies for surreal digital worlds.', 'Geometry · Shaders · Vite', 'Prompt-driven prototyping']
]
const metrics = [['SCENE MODE', 'DEMO'], ['FPS TARGET', '60'], ['AI LAYER', 'LOCAL'], ['VARIATIONS', '∞']]
const flow = ['IDEA', 'AI GENERATION', 'STRUCTURED DATA', 'CREATIVE PROCESSING', '3D EXPERIENCE', 'FINAL WORLD']
const architecture = [
  ['USER', 'A human intention, expressed in natural language.'],
  ['AI INTERFACE', 'The prompt field and command palette capture intent.'],
  ['AI / LLM LAYER', 'A replaceable local parser today; a server-side model adapter later.'],
  ['STRUCTURED SCENE STATE', 'Safe, typed visual parameters such as environment and density.'],
  ['SCENE CONTROLLER', 'Applies state changes smoothly to the visual system.'],
  ['REACT THREE FIBER', 'The intended reactive bridge between application state and 3D.'],
  ['WEBGL / GPU', 'The rendering substrate for immersive, efficient graphics.'],
  ['IMMERSIVE EXPERIENCE', 'The visual world the visitor can read and influence.']
]

function Scene({ scene }) {
  const particleCount = Math.floor(20 + (scene.particleLevel || 0.8) * 40)
  
  return (
    <div
      className={`scene scene--${scene.environment} scene--${scene.mood}`}
      data-environment={scene.environment}
      data-mood={scene.mood}
      data-lighting={scene.lighting}
      data-architecture={scene.architecture}
      data-motion={scene.motion || 'smooth'}
      style={{
        '--density': scene.density,
        '--energy': scene.energy,
        '--particle': scene.particleLevel,
        '--theme-accent': scene.accentColor || '#d7ff58',
        '--theme-glow': scene.glowColor || 'rgba(215, 255, 88, 0.4)'
      }}
      aria-hidden="true"
    >
      <div className="grain" />
      <div className="aurora" />
      <div className="aurora aurora--two" />
      <div className="sun" />
      <div className="reticle" />
      <div className="horizon" />
      <div className="grid" />
      <div className="scanline" />
      <div className="energy-ring" />
      <div className="monolith monolith--one" />
      <div className="monolith monolith--two" />
      <div className="monolith monolith--three" />
      <div className="orb orb--one" />
      <div className="orb orb--two" />
      <div className="particles">
        {Array.from({ length: particleCount }, (_, i) => (
          <i key={i} style={{ '--i': i, '--seed': (i * 17) % 100 }} />
        ))}
      </div>
    </div>
  )
}

function Flow({ items, compact = false }) {
  return (
    <div className={`flow ${compact ? 'flow--compact' : ''}`}>
      {items.map((item, i) => (
        <React.Fragment key={item}>
          <div className="flow__node">
            {String(i + 1).padStart(2, '0')} <span>{item}</span>
          </div>
          {i < items.length - 1 && <div className="flow__line" />}
        </React.Fragment>
      ))}
    </div>
  )
}

function App() {
  const [scene, setScene] = useState({
    mood: 'cinematic',
    environment: 'ocean',
    architecture: 'futuristic',
    lighting: 'neon',
    density: 0.7,
    particleLevel: 0.8,
    energy: 0.65,
    motion: 'smooth',
    accentColor: '#d7ff58',
    glowColor: 'rgba(215, 255, 88, 0.4)'
  })
  const [prompt, setPrompt] = useState('A futuristic gallery floating above a dark ocean.')
  const [lastResult, setLastResult] = useState(null)
  const [palette, setPalette] = useState(false)
  const [command, setCommand] = useState('')
  const [technical, setTechnical] = useState(false)
  const [activeNode, setActiveNode] = useState(2)
  const [visible, setVisible] = useState(new Set(['top']))

  const apply = (input) => {
    const result = generateSceneFromPrompt(input, scene)
    setScene(result.scene)
    setLastResult(result)
    setPalette(false)
    setCommand('')
  }

  useEffect(() => {
    // Update CSS custom property on root when scene accent changes
    if (scene.accentColor) {
      document.documentElement.style.setProperty('--acid', scene.accentColor)
    }
  }, [scene.accentColor])

  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((v) => !v)
      }
      if (e.key === 'Escape') setPalette(false)
    }
    addEventListener('keydown', key)
    return () => removeEventListener('keydown', key)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible((previous) => new Set([...previous, entry.target.id]))
        }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const reveal = (id) => `section reveal ${visible.has(id) ? 'is-visible' : ''}`
  const profile = useMemo(
    () => [
      scene.environment.toUpperCase(),
      scene.mood.toUpperCase(),
      scene.energy > 0.75 ? 'HIGH VELOCITY' : scene.energy < 0.4 ? 'SERENE DRIFT' : 'BALANCED MOTION',
      scene.density > 0.6 ? 'HIGH DENSITY' : 'MINIMALIST',
      scene.architecture.toUpperCase()
    ],
    [scene]
  )

  return (
    <main>
      <Scene scene={scene} />
      <header>
        <a className="brand" href="#top">
          DIGITAL<br />ATELIER
        </a>
        <nav>
          <a href="#lab">AI LAB</a>
          <a href="#work">WORK</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <button className="shortcut" onClick={() => setPalette(true)}>
          ⌘ K <span>COMMAND</span>
        </button>
      </header>
      <section id="top" data-reveal className={`${reveal('top')} hero`}>
        <p className="eyebrow">AI CREATIVE ENGINEERING · 2026</p>
        <h1>
          We craft worlds<br />
          <em>at lightspeed.</em>
        </h1>
        <p className="lede">
          Digital Atelier pairs human direction with generative systems, creative code, and immersive 3D engineering.
        </p>
        <div className="signals">
          <span>
            AI SYSTEM <b>ONLINE</b>
          </span>
          <span>
            ENVIRONMENT <b>{scene.environment.toUpperCase()}</b>
          </span>
          <span>
            MOTION <b>{scene.motion ? scene.motion.toUpperCase() : 'DYNAMIC'}</b>
          </span>
        </div>
        <a className="scroll" href="#lab">
          ENTER THE SYSTEM ↓
        </a>
      </section>
      <section id="lab" data-reveal className={`${reveal('lab')} split`}>
        <div>
          <p className="eyebrow">01 — AI LAB</p>
          <h2>
            Built with<br />
            <em>intelligence.</em>
          </h2>
          <p className="body">
            AI is not a decorative layer here. It translates a creative impulse into a legible scene state, which a
            visual system can render and evolve.
          </p>
        </div>
        <Flow items={flow} />
      </section>
      <section id="prompt" data-reveal className={`${reveal('prompt')} prompt-section`}>
        <p className="eyebrow">02 — PROMPT TO WORLD</p>
        <h2>
          Describe a <em>world.</em>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            apply(prompt)
          }}
        >
          <label htmlFor="world-prompt">Scene description</label>
          <div className="promptbox">
            <input
              id="world-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe something you want to see…"
            />
            <button>GENERATE ↗</button>
          </div>
        </form>
        {lastResult && (
          <div className="result">
            <span>NATURAL LANGUAGE</span>
            <i>→</i>
            <span>STRUCTURED DATA</span>
            <pre>{JSON.stringify(lastResult.scene, null, 2)}</pre>
          </div>
        )}
        <p className="caption">Local interpretation demo — no external model or personal data is used.</p>
      </section>
      <section id="work" data-reveal className={reveal('work')}>
        <p className="eyebrow">03 — SELECTED WORKS</p>
        <h2>
          Systems with a <em>point of view.</em>
        </h2>
        <div className="projects">
          {projects.map((p) => (
            <article key={p[0]}>
              <span>{p[0]}</span>
              <div>
                <p className="tag">{p[2]}</p>
                <h3>{p[1]}</h3>
                <p>{p[3]}</p>
              </div>
              <dl>
                <dt>TECH STACK</dt>
                <dd>{p[4]}</dd>
                <dt>AI ROLE</dt>
                <dd>{p[5]}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section className="section split process">
        <div>
          <p className="eyebrow">04 — DEVELOPMENT</p>
          <h2>
            Built <em>differently.</em>
          </h2>
          <p className="body">
            AI assisted exploration, component drafting, debugging and visual ideation. The final architecture, technical
            choices, integration and quality remain human-led.
          </p>
        </div>
        <Flow
          compact
          items={[
            'IDEA',
            'PROMPT',
            'AI EXPLORATION',
            'HUMAN DIRECTION',
            'CODE',
            'ITERATION',
            'OPTIMIZATION',
            'FINAL EXPERIENCE'
          ]}
        />
      </section>
      <section className="section architecture">
        <p className="eyebrow">05 — SYSTEM ARCHITECTURE</p>
        <h2>
          Intent, structured<br />
          <em>for a world.</em>
        </h2>
        <div className="architecture__layout">
          <div className="arch-nodes">
            {architecture.map(([name], i) => (
              <button
                key={name}
                className={activeNode === i ? 'active' : ''}
                onMouseEnter={() => setActiveNode(i)}
                onFocus={() => setActiveNode(i)}
                onClick={() => setActiveNode(i)}
              >
                {name}
              </button>
            ))}
          </div>
          <aside>
            <p className="tag">LAYER {String(activeNode + 1).padStart(2, '0')}</p>
            <h3>{architecture[activeNode][0]}</h3>
            <p>{architecture[activeNode][1]}</p>
          </aside>
        </div>
      </section>
      <section className="section stack">
        <p className="eyebrow">06 — THE CRAFT, DISTILLED</p>
        <div className="techs">
          {[
            'Three.js — spatial rendering',
            'React Three Fiber — scene state',
            'WebGL — GPU canvas',
            'GLSL / WGSL — shader language',
            'Vite — fast iteration',
            'Generative AI — creative collaborator',
            'Prompt engineering — intent design',
            'Procedural generation — variation'
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="metrics">
          {metrics.map(([l, v]) => (
            <div key={l}>
              <span>{l}</span>
              <b>{v}</b>
            </div>
          ))}
        </div>
      </section>
      <section className="section profile">
        <p className="eyebrow">YOUR CREATIVE PROFILE — SESSION ONLY</p>
        <div>
          {profile.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
        <p className="caption">Interpreted from your scene interactions. It is not saved or sent anywhere.</p>
      </section>
      <section id="contact" className="section contact">
        <p className="eyebrow">07 — CONTACT</p>
        <h2>
          Commission something<br />
          <em>intelligent.</em>
        </h2>
        <p className="lede">Interactive experiences, generative interfaces, and AI-powered digital worlds.</p>
        <div>
          <a className="cta" href="mailto:hello@digitalatelier.studio">
            START A PROJECT ↗
          </a>
          <a className="secondary" href="https://github.com" target="_blank" rel="noreferrer">
            VIEW GITHUB
          </a>
        </div>
      </section>
      <footer>
        <span>DIGITAL ATELIER</span>
        <span>AI CREATIVE ENGINEERING</span>
        <span>BUILT WITH REACT + GENERATIVE VISUALS</span>
        <span>© 2026</span>
      </footer>
      <button className="breakdown" onClick={() => setTechnical(true)}>
        VIEW TECHNICAL BREAKDOWN +
      </button>
      {palette && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="AI command palette">
          <div className="palette">
            <button className="close" onClick={() => setPalette(false)}>
              ×
            </button>
            <p className="eyebrow">AI COMMAND INTERFACE</p>
            <h3>Direct the atmosphere.</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                apply(command)
              }}
            >
              <input
                autoFocus
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Make the scene more futuristic…"
              />
              <button>APPLY ↗</button>
            </form>
            <div className="examples">
              {commandExamples.map((x) => (
                <button key={x} onClick={() => apply(x)}>
                  {x}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {technical && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Technical breakdown">
          <div className="palette breakdown-card">
            <button className="close" onClick={() => setTechnical(false)}>
              ×
            </button>
            <p className="eyebrow">RECRUITER MODE</p>
            <h3>Technical breakdown</h3>
            <p>
              <b>Architecture</b> — UI intent is parsed into a stable scene state, then a controller updates rendering
              parameters.
            </p>
            <p>
              <b>AI workflow</b> — a local rule-based adapter demonstrates the integration seam; a server-side provider
              can replace it.
            </p>
            <p>
              <b>3D pipeline</b> — this starter uses a GPU-conscious CSS visual layer. The state contract is ready for a
              Three.js/R3F scene.
            </p>
            <p>
              <b>Performance</b> — no network calls, low DOM count, capped decorative particles, and reduced-motion
              support.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
