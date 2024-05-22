import './App.css';
import { Vector3 } from 'three'
import { Canvas, useFrame } from "@react-three/fiber";
import { Splat, OrbitControls, SpotLight, useDepthBuffer } from "@react-three/drei"; //collection of useful components and hooks for Three.js
import { useRef } from "react"; // React hook used for referencing DOM elements or React elements.
import Navbar from './components/navbar';


function SpotLightComponent(props) {
  const light = useRef()
  return <SpotLight castShadow ref={light} penumbra={1} distance={7} angle={0.35} attenuation={7} anglePower={4} intensity={2} {...props} />
}


//                       url as a prop
function RotatingShowcase({ url }) {
  const showcaseRef = useRef(); //useRef() creates a reference object that will be used to reference the mesh in the Three.js scene.

  //useFrame() is a hook provided by @react-three/fiber that allows performing actions on
  useFrame((state, delta) => {
    //it updates the rotation of the referenced mesh (showcaseRef) around the y-axis, making it rotate.
    if (showcaseRef.current) {
      showcaseRef.current.rotation.y += delta;
      console.log(`Rotating: ${showcaseRef.current.rotation.y}`); // Debugging log
    }
  });

  return (
    //It returns a mesh with a Splat component, possibly rendering an image or texture, 
    //and a transparent box geometry around it, creating a visual showcase.
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
  const url = `${process.env.PUBLIC_URL}/natraj.splat`;


  return (
    <>

      <Navbar />

      <h1 className='title'>JAR4U's Showcase</h1>
      <div className="App">
        <div className='background' style={{
          backgroundColor: `black`,
          display: 'flex',
          backgroundPosition: 'center',
          backgroundSize: '100% auto',
          minHeight: '100vh',
          marginTop: '20px'


        }}>
        </div>

        <div className="canvas-container">
          {/* It returns a mesh with a Splat component, possibly rendering an image or texture, and a transparent box geometry around it, creating a visual showcase. */}
          <Canvas camera={{ position: [3, 0.5, 3.5] }}>
            <SpotLightComponent color="#ffffff" position={[1, -3, -2]} />
            <SpotLightComponent color="#ffffff" position={[0, 0, 3]} />
            {/* RotatingShowcase component and OrbitControls component, allowing users to interactively orbit around the scene. */}
            <RotatingShowcase url={url} />
            <OrbitControls />

          </Canvas>
        </div>

      </div>
    </>
  );
}

export default App;
