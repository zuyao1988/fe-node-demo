Note:

1. frontend React - Vite + TS
   npm create vite@latest frontend

2. additional packages for FE
   npm install react-router-dom
   npm install --save-dev @types/react-router-dom

//== tailwind css===
npm install -D tailwindcss @tailwindcss/vite
vite.config.ts ->
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react(), tailwindcss()],
});

Development mode:

1. Run NodeJS server
   npm run serve
2. Run FE
   cd frontend
   npm run dev
   by default: http://localhost:5173

Production:

1. Build FE
   cd frontend
   npm run build

2. Run NodeJS server

Node server:
ECMAScript Module (ES Module) / mjs
middleware
fs
**dirname / **filename (this 2 not available in "module / ESM")
EventEmitter
crypto
async await

FE
useState
useEffect
useContext + createContext
useRef

Redux
npm install @reduxjs/toolkit react-redux
-> slice
-> store / reducer -> provide the store
update: dispatch
display: useContent
