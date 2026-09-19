# Digital Atelier — AI Creative Engineering

## Overview

A cinematic portfolio prototype that demonstrates a clear path from natural-language intent to structured scene state and an interactive visual world.

## AI features

- Prompt-to-world input with an on-device, deterministic interpretation demo
- Cmd/Ctrl + K cinematic command interface
- Session-only creative profile derived from scene choices
- Explicit data-flow and technical architecture visualizations

## Architecture

React owns UI and scene state. `src/services/ai/sceneGenerator.js` exports the stable `generateSceneFromPrompt(prompt)` boundary. The current local parser produces safe visual parameters. A future backend endpoint can replace that parser and call OpenAI, Anthropic, or Gemini without exposing credentials to the browser. A scene controller/R3F layer can consume the same parameters to drive Three.js, WebGL, and GPU effects.

## AI development workflow

AI can support exploration, component drafting, debugging, documentation and testing. Human direction remains responsible for the system architecture, integration, visual decisions, quality, and final implementation.

## Running locally

```bash
npm install
npm run dev
npm run build
```

## Environment variables

This demo has no environment variables and makes no API calls. For a real provider, use a backend/serverless endpoint and keep credentials in server-side environment variables (for example `OPENAI_API_KEY`); never use a `VITE_` prefixed secret.


## Future improvements

- Replace the local parser through a server-side LLM adapter
- Move scene implementation to React Three Fiber / Three.js
- Add image and multimodal scene generation
- Voice-driven creation, persistent opt-in profiles, and WebGPU compute systems
