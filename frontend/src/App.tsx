import { useState } from 'react'
import type { PointerEvent } from "react"
import './App.css'

type StageObject = {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
}

type DragState = {
  offsetX: number
  offsetY: number
} | null

function Stage() {
  const [object, setObject] = useState<StageObject>({
    id: "amp-1",
    label: "Amp", 
    x: 100,
    y: 80,
    width: 100,
    height: 60
  })

  const [drag, setDrag] = useState<DragState>(null)

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)

    const objectRect = event.currentTarget.getBoundingClientRect()
    const x = objectRect.left - event.clientX
    const y = objectRect.top - event.clientY

    setDrag({
      offsetX: x,
      offsetY: y
    })
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    function clamp(value: number, min: number, max: number) {
      return Math.min(Math.max(value, min), max);
    }
    if (drag !== null) {
      const stageRect = event.currentTarget.getBoundingClientRect()
      const pointerX = event.clientX - stageRect.left
      const pointerY = event.clientY - stageRect.top

      const x = clamp(pointerX + drag.offsetX, 0, stageRect.width - object.width - 3)
      const y = clamp(pointerY + drag.offsetY, 0, stageRect.height - object.height - 3)

      setObject({
        id: object.id,
        label: object.label,
        x: x,
        y: y,
        width: object.width,
        height: object.height
      })
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId)

    setDrag(null)
  }


  return (
    <div 
      className="stage"
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      >
      <div
      className="stage-object"
      onPointerDown={handlePointerDown}
      style={{
        left: object.x,
        top: object.y,
        width: object.width,
        height: object.height,
      }}
      >
        {object.label}
      </div>
    </div>
  )
}

export default function App() {
  return <Stage />
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }
// 
// export default App
