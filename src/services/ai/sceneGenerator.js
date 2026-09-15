export const commandExamples = ['Make the scene more futuristic', 'Reduce particles', 'Turn the environment into a desert', 'Make the lighting warmer', 'Create a more minimal atmosphere', 'Show me something experimental']

// Adapter boundary: replace interpretLocally with a server-side LLM call without changing UI consumers.
export function generateSceneFromPrompt(prompt, current = {}) {
  const text = prompt.toLowerCase()
  const scene = { mood: 'cinematic', environment: 'ocean', architecture: 'futuristic', lighting: 'neon', density: .7, particleLevel: .8, energy: .65, ...current }
  if (/desert|sand|dune/.test(text)) { scene.environment = 'desert'; scene.lighting = 'warm'; scene.mood = 'warm' }
  if (/ocean|water|sea/.test(text)) scene.environment = 'ocean'
  if (/futur|neon|cyber/.test(text)) { scene.architecture = 'futuristic'; scene.lighting = 'neon' }
  if (/warm|gold|sunset/.test(text)) { scene.lighting = 'warm'; scene.mood = 'warm' }
  if (/minimal|reduce|less/.test(text)) { scene.density = .3; scene.particleLevel = .25; scene.energy = .35 }
  if (/particle/.test(text) && /reduce|less|few/.test(text)) scene.particleLevel = .15
  if (/experimental|crystal|impossible/.test(text)) { scene.architecture = 'crystalline'; scene.energy = .9; scene.particleLevel = .95 }
  if (/dense|busy|more/.test(text)) { scene.density = .9; scene.particleLevel = .95 }
  return { source: 'local-demo-parser', scene }
}
