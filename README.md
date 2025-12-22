# Front end protfolio (2) version control 2025

I recently lost the source code to my original react site [arjunliji.free.nf](https://arjunliji.free.nf)
FYI that site I made was using ai like a crutch and I didnt bother to solve bugs and I ended up with a huge labarynth of a code noodles which got confusing progresively as it became bigger.
In 2025, now that I'm an under graduate in computer science engeering I decided to rebuild that portfolio again from scratch!
Except this time, its gonna be

- more visually appealing
- better ux and ui
- better design
- dynamic site with database
- custom domain instead of free.nf
- non-ai look and more personality and creativity

## Package commands (npm)

### Vite:-

`npm create vite@latest`

### Tailwind for vite:-

Step 1: `npm install tailwindcss @tailwindcss/vite`

Step 2:
[vite.config.js]
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})

```
Step 3:
index.css
`@import "tailwindcss";`

### react spring parallax
step :-
`npm i @react-spring/parallax`

step 2:-
app.jsx
`import { Parallax, ParallaxLayer } from '@react-spring/parallax'`