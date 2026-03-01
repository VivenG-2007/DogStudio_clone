import { useState } from 'react'
import './App.css'
import Dog from './components/dog.jsx'
import { Canvas } from '@react-three/fiber'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Canvas style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundImage:"url(/background-xl.png)",
          backgroundRepeat:'no-repeat',
          backgroundSize:'cover'
        }}>
        <Dog />
      </Canvas>
    </main >
        <section></section>
        <section></section>
        <section></section>
      
    </>
  )
}

export default App
