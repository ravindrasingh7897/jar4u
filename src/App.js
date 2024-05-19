import './App.css';
import { Canvas, useFrame } from "@react-three/fiber";
import { Splat, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import Navbar from './components/navbar';

function RotatingShowcase({ url }) {
  const showcaseRef = useRef();

  useFrame((state, delta) => {
    if (showcaseRef.current) {
      showcaseRef.current.rotation.y += delta;
      console.log(`Rotating: ${showcaseRef.current.rotation.y}`); // Debugging log
    }
  });

  return (
    <mesh ref={showcaseRef}>
      <mesh>
        <Splat src={url} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.5, 1.8, 1.5]} />
        <meshPhysicalMaterial
          opacity={0.3}
          transparent
        />
      </mesh>
    </mesh>
  );
}

function App() {
  const url = `./natraj.splat`;

  return (
    <>
      <Navbar />
      <div className="cursor"/>
      <h1 className='title'>JAR4U's Showcase</h1>
      <div className="App">

        <div className='background' style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/46730153.jpg)`,
          display: 'flex',
          backgroundPosition: 'center',
          backgroundSize: '100% auto',
          minHeight: '100vh',
          marginTop: '20px'


        }}>
        </div>

        <div className="canvas-container">
          <Canvas camera={{ position: [3, 0.5, 3.5] }}>
            <RotatingShowcase url={url} />
            <OrbitControls />
          </Canvas>
        </div>

      </div>
    </>
  );
}

export default App;
