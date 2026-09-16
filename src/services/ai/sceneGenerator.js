export const commandExamples = [
  'Cyberpunk neon city with hyper speed grid',
  'Calm ethereal sunset in a warm desert',
  'Volcanic magma chamber with intense ember storm',
  'Crystalline prism void with iridescent geometry',
  'Deep cosmos space warp with high particle density',
  'Bioluminescent organic forest with gentle spores',
  'Minimalist noir architectural black and white matrix',
  'Surreal floating structures in a dramatic storm'
]

// Adapter boundary: replace interpretLocally with a server-side LLM call without changing UI consumers.
export function generateSceneFromPrompt(prompt, current = {}) {
  const text = prompt.toLowerCase()
  const scene = {
    mood: 'cinematic',
    environment: 'ocean',
    architecture: 'futuristic',
    lighting: 'neon',
    density: 0.7,
    particleLevel: 0.8,
    energy: 0.65,
    motion: 'smooth',
    accentColor: '#d7ff58',
    glowColor: 'rgba(215, 255, 88, 0.4)',
    ...current
  }

  // Environment & Palette detection
  if (/desert|dune|sand|sahara|oasis/.test(text)) {
    scene.environment = 'desert'
    scene.lighting = 'warm'
    scene.mood = 'warm'
    scene.accentColor = '#ff9d42'
    scene.glowColor = 'rgba(255, 157, 66, 0.5)'
  } else if (/cyber|neon|matrix|grid|tokyo|synthwave|hacker|glitch/.test(text)) {
    scene.environment = 'cyberpunk'
    scene.lighting = 'neon'
    scene.mood = 'glitch'
    scene.architecture = 'cybernetic'
    scene.accentColor = '#00ffcc'
    scene.glowColor = 'rgba(0, 255, 204, 0.6)'
  } else if (/volcano|volcanic|magma|lava|fire|ember|inferno|flame|red/.test(text)) {
    scene.environment = 'volcanic'
    scene.lighting = 'volcanic'
    scene.mood = 'aggressive'
    scene.architecture = 'brutalist'
    scene.accentColor = '#ff3b30'
    scene.glowColor = 'rgba(255, 59, 48, 0.6)'
  } else if (/crystal|prism|gem|iridescent|diamond|glass|refract/.test(text)) {
    scene.environment = 'crystalline'
    scene.lighting = 'soft-pastel'
    scene.mood = 'surreal'
    scene.architecture = 'crystalline'
    scene.accentColor = '#c084fc'
    scene.glowColor = 'rgba(192, 132, 252, 0.5)'
  } else if (/space|cosmos|galaxy|orbit|star|nebula|warp|black hole|astral/.test(text)) {
    scene.environment = 'space'
    scene.lighting = 'dramatic'
    scene.mood = 'ethereal'
    scene.architecture = 'floating'
    scene.accentColor = '#38bdf8'
    scene.glowColor = 'rgba(56, 189, 248, 0.5)'
  } else if (/forest|bioluminescent|organic|spore|alien|nature|jungle|flora/.test(text)) {
    scene.environment = 'bioluminescent'
    scene.lighting = 'bioluminescent'
    scene.mood = 'serene'
    scene.architecture = 'organic'
    scene.accentColor = '#4ade80'
    scene.glowColor = 'rgba(74, 222, 128, 0.5)'
  } else if (/noir|black and white|monochrome|dark|shadow|void|minimal/.test(text)) {
    scene.environment = 'monochrome'
    scene.lighting = 'monochrome'
    scene.mood = 'minimal'
    scene.architecture = 'minimalist'
    scene.accentColor = '#e2e8f0'
    scene.glowColor = 'rgba(226, 232, 240, 0.3)'
  } else if (/ocean|water|sea|deep|underwater|cyan|aquatic/.test(text)) {
    scene.environment = 'ocean'
    scene.lighting = 'neon'
    scene.accentColor = '#38bdf8'
    scene.glowColor = 'rgba(56, 189, 248, 0.4)'
  }

  // Energy & Speed adjustments
  if (/hyper|fast|intense|high speed|storm|warp|extreme|frenzy|super/.test(text)) {
    scene.energy = 0.95
    scene.motion = 'warp'
  } else if (/slow|calm|serene|relax|peaceful|soft|gentle|still|quiet/.test(text)) {
    scene.energy = 0.25
    scene.motion = 'drift'
  } else if (/glitch|pulse|flicker|disrupt|chaos/.test(text)) {
    scene.energy = 0.85
    scene.motion = 'glitch'
  } else if (/moderate|balanced|normal/.test(text)) {
    scene.energy = 0.6
    scene.motion = 'smooth'
  }

  // Density & Particle adjustments
  if (/minimal|sparse|empty|clean|simple|reduce|less|few/.test(text)) {
    scene.density = 0.25
    scene.particleLevel = 0.2
  } else if (/dense|busy|crowded|storm|shower|field|swarm|infinite|max|many|more/.test(text)) {
    scene.density = 0.95
    scene.particleLevel = 1.0
  }

  // Specific architecture overrides
  if (/brutalist|heavy|stone|monolith/.test(text)) scene.architecture = 'brutalist'
  if (/organic|soft|fluid|blob/.test(text)) scene.architecture = 'organic'
  if (/futurist|cyber|tech/.test(text)) scene.architecture = 'futuristic'
  if (/crystal|geometric/.test(text)) scene.architecture = 'crystalline'

  return { source: 'local-demo-parser', scene }
}
