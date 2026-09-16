"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder, Torus, ContactShadows, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function RGBFan({ position, color = "#00f0ff" }: { position: [number, number, number], color?: string }) {
  const fanRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (fanRef.current) {
      fanRef.current.rotation.z -= 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Outer casing */}
      <Cylinder args={[0.45, 0.45, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111" />
      </Cylinder>
      {/* Glowing Ring */}
      <Torus args={[0.4, 0.02, 16, 100]} rotation={[0, 0, 0]} position={[0, 0, 0.11]}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </Torus>
      {/* Blades */}
      <group ref={fanRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
            <boxGeometry args={[0.1, 0.8, 0.05]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function GamingPC() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Gentle floating and very slow rotation to show off the case
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3 - 0.5;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Chassis Frame (Back, Top, Bottom, Solid Side) */}
      <Box args={[2, 4.2, 4]} position={[-0.1, 2.1, 0]}>
        <meshStandardMaterial color="#0a0a0c" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Glass Side Panel */}
      <Box args={[0.05, 4, 3.8]} position={[1.0, 2.1, 0]}>
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.9} 
          opacity={1} 
          transparent 
          roughness={0.1} 
          metalness={0.1} 
          clearcoat={1}
        />
      </Box>

      {/* Front Mesh Panel */}
      <Box args={[1.9, 4, 0.05]} position={[0, 2.1, 2.0]}>
        <meshStandardMaterial color="#050505" wireframe />
      </Box>

      {/* Front RGB Fans */}
      <RGBFan position={[0, 3.3, 1.9]} color="#ff0055" />
      <RGBFan position={[0, 2.1, 1.9]} color="#b026ff" />
      <RGBFan position={[0, 0.9, 1.9]} color="#00f0ff" />

      {/* Rear Exhaust Fan */}
      <group rotation={[0, -Math.PI / 2, 0]} position={[-0.9, 3.3, -1.8]}>
        <RGBFan position={[0, 0, 0]} color="#00f0ff" />
      </group>

      {/* Inside Components */}
      {/* Motherboard */}
      <Box args={[0.1, 3.2, 2.8]} position={[-0.8, 2.4, -0.2]}>
        <meshStandardMaterial color="#111" />
      </Box>

      {/* AIO CPU Block */}
      <Cylinder args={[0.3, 0.3, 0.2, 32]} rotation={[0, 0, Math.PI / 2]} position={[-0.6, 3.0, -0.5]}>
        <meshStandardMaterial color="#000" />
      </Cylinder>
      <Torus args={[0.25, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]} position={[-0.49, 3.0, -0.5]}>
        <meshBasicMaterial color="#00f0ff" toneMapped={false} />
      </Torus>

      {/* RAM */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[-0.6, 3.0, 0.2 + i * 0.15]}>
          <Box args={[0.1, 0.6, 0.05]}>
            <meshStandardMaterial color="#222" />
          </Box>
          <Box args={[0.11, 0.5, 0.06]} position={[0, 0.05, 0]}>
            <meshBasicMaterial color="#b026ff" toneMapped={false} />
          </Box>
        </group>
      ))}

      {/* Massive GPU */}
      <group position={[-0.3, 1.5, 0]}>
        <Box args={[1.2, 0.4, 2.4]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.4} />
        </Box>
        {/* GPU Glow line */}
        <Box args={[1.21, 0.05, 2.41]} position={[0, 0.1, 0]}>
          <meshBasicMaterial color="#00f0ff" toneMapped={false} />
        </Box>
        <Text position={[0.61, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.15} color="#00f0ff" font="https://fonts.gstatic.com/s/orbitron/v25/yVQWdKpiFzjONJcxPhsX.woff">
          RTX 5090
        </Text>
      </group>

      {/* Power Supply Shroud */}
      <Box args={[1.9, 0.8, 3.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#111" />
      </Box>
    </group>
  );
}

export default function ThreeDShowcase() {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas camera={{ position: [6, 4, 7], fov: 45 }}>
        <color attach="background" args={['#0A0A0C']} />
        
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        {/* Interior Case Light */}
        <pointLight position={[0, 2.5, 0]} intensity={1} color="#b026ff" distance={4} />

        <GamingPC />
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={10} blur={2} far={4} color="#000000" />

        <OrbitControls 
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 2}
        />

        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer >
      </Canvas>
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none text-xs text-gray-500 uppercase tracking-[0.2em]">
        Interactive PC Rig (Drag to Rotate)
      </div>
    </div>
  );
}
