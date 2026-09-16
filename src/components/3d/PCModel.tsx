"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder, Torus, ContactShadows, Text, RoundedBox, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

/* ─── High-Detail Spinning RGB Fan ─── */
function RGBFan({ position, rotation = [0, 0, 0], color = "#00f0ff", speed = 0.15 }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  speed?: number;
}) {
  const bladeRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z -= speed * delta * 60;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Fan Frame */}
      <Cylinder args={[0.46, 0.46, 0.12, 32]}>
        <meshStandardMaterial color="#1a1c23" metalness={0.6} roughness={0.3} />
      </Cylinder>
      {/* Front Glowing RGB Halo Ring */}
      <Torus args={[0.42, 0.025, 16, 64]} position={[0, 0.065, 0]}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </Torus>
      {/* Back Glowing RGB Halo Ring */}
      <Torus args={[0.42, 0.02, 16, 64]} position={[0, -0.065, 0]}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </Torus>
      {/* Hub */}
      <Cylinder args={[0.13, 0.13, 0.14, 24]}>
        <meshStandardMaterial color="#0d0e12" metalness={0.9} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.07, 0.07, 0.145, 16]}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </Cylinder>
      {/* 9 Blades */}
      <group ref={bladeRef}>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 9]}>
            <boxGeometry args={[0.08, 0.38, 0.02]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.88} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Compact, Centered Gaming PC (Default Component Showcase) ─── */
function CenteredPC({ accentColor, isHovered, viewMode }: { 
  accentColor: string; 
  isHovered: boolean;
  viewMode: "front" | "angle" | "side";
}) {
  const rigGroup = useRef<THREE.Group>(null);
  
  // Default is looking directly at the component showcase side (-Math.PI / 2) with slight dynamic angle
  const getTargetAngle = (mode: "front" | "angle" | "side") => {
    if (mode === "front") return -Math.PI / 2 + 0.12; // Component showcase view (RTX GPU, RAM, AIO)
    if (mode === "angle") return -0.65;              // 3/4 perspective
    return 0;                                       // Front intake fans
  };

  const targetRotationY = useRef(getTargetAngle(viewMode));

  useEffect(() => {
    targetRotationY.current = getTargetAngle(viewMode);
  }, [viewMode]);

  useFrame((state, delta) => {
    if (rigGroup.current) {
      // Gentle float animation
      rigGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      
      // Smoothly orient towards selected view mode
      rigGroup.current.rotation.y = THREE.MathUtils.damp(
        rigGroup.current.rotation.y,
        targetRotationY.current,
        3.5,
        delta
      );
    }
  });

  const secondaryColor = useMemo(() => {
    const c = new THREE.Color(accentColor);
    c.offsetHSL(0.08, 0.1, 0.1);
    return "#" + c.getHexString();
  }, [accentColor]);

  // Scaled to 0.68 and centered so full component array fits cleanly
  return (
    <group ref={rigGroup} rotation={[0, -Math.PI / 2 + 0.12, 0]} scale={isHovered ? 0.72 : 0.68}>
      {/* Inner offset group so (0,0,0) is true geometric center of case */}
      <group position={[0, -2.3, 0]}>
        
        {/* ─── 1. CHASSIS SHELL (POLISHED WHITE ANT ESPORTS) ─── */}
        {/* Top Roof Panel */}
        <RoundedBox args={[2.2, 0.14, 4.3]} radius={0.05} position={[0, 4.4, 0]}>
          <meshStandardMaterial color="#f0f3f7" metalness={0.3} roughness={0.2} />
        </RoundedBox>

        {/* Bottom Floor */}
        <RoundedBox args={[2.2, 0.14, 4.3]} radius={0.05} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#dce2ea" metalness={0.5} roughness={0.3} />
        </RoundedBox>

        {/* Solid Back Metal Plate */}
        <Box args={[0.1, 4.1, 4.2]} position={[-1.05, 2.3, 0]}>
          <meshStandardMaterial color="#1a1c22" metalness={0.8} roughness={0.4} />
        </Box>

        {/* Rear I/O Panel */}
        <Box args={[2.0, 4.1, 0.1]} position={[0, 2.3, -2.1]}>
          <meshStandardMaterial color="#21242c" metalness={0.7} roughness={0.4} />
        </Box>

        {/* Front White Bezel Frame */}
        <RoundedBox args={[2.25, 4.3, 0.15]} radius={0.06} position={[0, 2.3, 2.15]}>
          <meshStandardMaterial color="#f5f7fa" metalness={0.2} roughness={0.15} />
        </RoundedBox>
        {/* Front Air Intake Mesh */}
        <Box args={[1.75, 3.7, 0.08]} position={[0, 2.3, 2.18]}>
          <meshStandardMaterial color="#12141a" metalness={0.9} roughness={0.3} wireframe />
        </Box>

        {/* Front Top Power Button & I/O */}
        <Box args={[0.6, 0.05, 0.15]} position={[0.5, 4.48, 1.8]}>
          <meshStandardMaterial color="#181a20" metalness={0.9} />
        </Box>
        <Cylinder args={[0.04, 0.04, 0.04, 16]} position={[0.7, 4.5, 1.8]}>
          <meshBasicMaterial color={accentColor} toneMapped={false} />
        </Cylinder>

        {/* ─── 2. ULTRA-CLEAR TEMPERED GLASS PANEL (DIRECT VIEW OF COMPONENTS) ─── */}
        <Box args={[0.04, 4.1, 4.15]} position={[1.08, 2.3, 0]}>
          <meshPhysicalMaterial
            color="#eaf4ff"
            transmission={0.98}
            transparent
            opacity={0.15}
            roughness={0.02}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.02}
            ior={1.48}
            thickness={0.3}
          />
        </Box>
        {/* Corner Thumbscrews */}
        {[
          [1.11, 4.1, 1.8],
          [1.11, 4.1, -1.8],
          [1.11, 0.5, 1.8],
          [1.11, 0.5, -1.8],
        ].map((pos, idx) => (
          <Cylinder key={idx} args={[0.05, 0.05, 0.06, 16]} rotation={[0, 0, Math.PI / 2]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#8892a0" metalness={0.9} roughness={0.2} />
          </Cylinder>
        ))}

        {/* ─── 3. TRIPLE FRONT INTAKE RGB FANS ─── */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <RGBFan position={[0, -2.1, -3.4]} color={accentColor} speed={0.2} />
          <RGBFan position={[0, -2.1, -2.3]} color={secondaryColor} speed={0.18} />
          <RGBFan position={[0, -2.1, -1.2]} color={accentColor} speed={0.22} />
        </group>

        {/* Rear Exhaust RGB Fan */}
        <group rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <RGBFan position={[0, 1.0, -3.3]} color={accentColor} speed={0.16} />
        </group>

        {/* Top 240mm AIO Radiator Fans */}
        <group rotation={[0, 0, 0]}>
          <RGBFan position={[-0.2, 4.25, 0.6]} color={secondaryColor} speed={0.14} />
          <RGBFan position={[-0.2, 4.25, -0.6]} color={accentColor} speed={0.15} />
        </group>

        {/* ─── 4. MOTHERBOARD & HEATSINKS ─── */}
        <Box args={[0.08, 3.4, 3.2]} position={[-0.96, 2.5, 0]}>
          <meshStandardMaterial color="#161820" metalness={0.4} roughness={0.5} />
        </Box>
        {/* Silver VRM Heatsinks */}
        <RoundedBox args={[0.18, 0.8, 1.4]} radius={0.03} position={[-0.85, 3.6, -0.4]}>
          <meshStandardMaterial color="#c0c8d4" metalness={0.85} roughness={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.18, 1.2, 0.5]} radius={0.03} position={[-0.85, 3.1, -1.1]}>
          <meshStandardMaterial color="#949eb0" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* M.2 Armor Shield */}
        <Box args={[0.15, 0.25, 1.3]} position={[-0.86, 2.15, 0.3]}>
          <meshStandardMaterial color="#2d323d" metalness={0.8} roughness={0.2} />
        </Box>
        <Box args={[0.16, 0.04, 1.2]} position={[-0.85, 2.15, 0.3]}>
          <meshBasicMaterial color={accentColor} toneMapped={false} />
        </Box>

        {/* ─── 5. AIO CPU LIQUID COOLER PUMP & WATER TUBES ─── */}
        <group position={[-0.78, 3.1, -0.3]}>
          <Cylinder args={[0.34, 0.34, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#0f1117" metalness={0.9} roughness={0.15} />
          </Cylinder>
          {/* Infinity Mirror Ring */}
          <Torus args={[0.26, 0.03, 16, 64]} rotation={[0, Math.PI / 2, 0]} position={[0.11, 0, 0]}>
            <meshBasicMaterial color={accentColor} toneMapped={false} />
          </Torus>
          {/* Braided Water Tubes */}
          <Cylinder args={[0.04, 0.04, 1.6, 12]} position={[0.1, 0.55, 0.4]} rotation={[0.4, 0.1, -0.3]}>
            <meshStandardMaterial color="#1a1c22" roughness={0.7} />
          </Cylinder>
          <Cylinder args={[0.04, 0.04, 1.5, 12]} position={[0.1, 0.45, 0.2]} rotation={[0.4, -0.1, -0.2]}>
            <meshStandardMaterial color="#1a1c22" roughness={0.7} />
          </Cylinder>
        </group>

        {/* ─── 6. 4X HIGH-SPEED DDR5 RGB RAM ─── */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`ram-${i}`} position={[-0.75, 3.2, 0.35 + i * 0.16]}>
            <Box args={[0.08, 1.15, 0.05]}>
              <meshStandardMaterial color="#181a20" metalness={0.7} roughness={0.3} />
            </Box>
            <Box args={[0.09, 0.12, 0.055]} position={[0, 0.6, 0]}>
              <meshBasicMaterial color={i % 2 === 0 ? accentColor : secondaryColor} toneMapped={false} />
            </Box>
          </group>
        ))}

        {/* ─── 7. EXTREME DEDICATED GPU (RTX 5060) ─── */}
        <group position={[-0.1, 1.7, 0]}>
          <RoundedBox args={[1.5, 0.55, 2.8]} radius={0.06} position={[0, 0, 0]}>
            <meshStandardMaterial color="#252932" metalness={0.85} roughness={0.25} />
          </RoundedBox>
          {/* Backplate */}
          <Box args={[1.48, 0.04, 2.76]} position={[0, 0.28, 0]}>
            <meshStandardMaterial color="#b8c2d0" metalness={0.9} roughness={0.15} />
          </Box>
          {/* Aluminum Fins */}
          <Box args={[1.35, 0.38, 2.6]} position={[0, -0.02, 0]}>
            <meshStandardMaterial color="#7a8290" metalness={0.95} roughness={0.2} wireframe />
          </Box>
          {/* Illuminated RGB Accent Strip */}
          <Box args={[1.52, 0.04, 2.6]} position={[0, 0.18, 0]}>
            <meshBasicMaterial color={accentColor} toneMapped={false} />
          </Box>
          {/* Illuminated Logo */}
          <Text
            position={[0.76, 0.05, 0]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={0.16}
            color={accentColor}
            anchorX="center"
            anchorY="middle"
          >
            RTX 5060
          </Text>
          {/* Anti-Sag Bracket */}
          <Cylinder args={[0.04, 0.04, 0.9, 16]} position={[0.65, -0.65, 1.0]}>
            <meshStandardMaterial color="#505868" metalness={0.9} roughness={0.2} />
          </Cylinder>
        </group>

        {/* ─── 8. PSU BASEMENT SHROUD ─── */}
        <RoundedBox args={[2.1, 0.95, 4.2]} radius={0.04} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#1e222b" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        <Box args={[0.04, 0.4, 1.3]} position={[1.06, 0.7, -0.8]}>
          <meshStandardMaterial color="#0c0d12" metalness={0.9} />
        </Box>
        <Text
          position={[1.08, 0.7, -0.8]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.13}
          color="#8da0b8"
          anchorX="center"
          anchorY="middle"
        >
          DARKFLASH 850W
        </Text>

        {/* ─── 9. CASE STAND FEET ─── */}
        {[
          [-0.85, 0.06, 1.7],
          [0.85, 0.06, 1.7],
          [-0.85, 0.06, -1.7],
          [0.85, 0.06, -1.7],
        ].map((pos, i) => (
          <group key={`stand-${i}`} position={pos as [number, number, number]}>
            <Cylinder args={[0.14, 0.16, 0.12, 24]}>
              <meshStandardMaterial color="#c4cdd8" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.13, 0.13, 0.04, 24]} position={[0, -0.06, 0]}>
              <meshStandardMaterial color="#0f1014" roughness={0.9} />
            </Cylinder>
          </group>
        ))}

        {/* ─── 10. VIBRANT INTERIOR LIGHTING ─── */}
        <pointLight position={[0, 2.7, 0]} intensity={6} color={accentColor} distance={6} decay={2} />
        <pointLight position={[0.2, 1.3, 0.6]} intensity={4} color={secondaryColor} distance={4} decay={2} />
        <pointLight position={[0, 4.1, 0]} intensity={3} color={accentColor} distance={3} decay={2} />
      </group>
    </group>
  );
}

/* ─── Exported 3D Canvas with Perfect Framing & Default Front Face ─── */
export default function PCModel({ 
  accentColor = "#00f0ff",
  viewMode = "front",
  autoRotate = false,
}: { 
  accentColor?: string;
  viewMode?: "front" | "angle" | "side";
  autoRotate?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        /* Camera placed directly in front of the PC looking straight at (0, 0, 0) */
        camera={{ position: [0, 0.3, 5.8], fov: 38 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        {/* Environment Map for Photorealistic Glass & Metal Reflections */}
        <Environment preset="city" />

        {/* Studio Lighting */}
        <directionalLight position={[6, 8, 7]} intensity={2.4} castShadow />
        <directionalLight position={[-6, 5, -5]} intensity={1.2} color="#9ec5ff" />
        <spotLight position={[-4, 7, 7]} angle={0.5} penumbra={0.8} intensity={3.2} color={accentColor} />
        <ambientLight intensity={0.95} />

        {/* Perfectly Centered Gaming Rig */}
        <CenteredPC 
          accentColor={accentColor} 
          isHovered={isHovered} 
          viewMode={viewMode}
        />

        {/* Soft Ground Contact Shadow (placed below the feet) */}
        <ContactShadows position={[0, -1.65, 0]} opacity={0.65} scale={9} blur={2.2} far={4} color="#000000" />

        {/* Full Interactive Orbit Controls */}
        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={true}
          minDistance={3.2}
          maxDistance={7.5}
          autoRotate={autoRotate && !isHovered}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 4}
        />

        {/* Post-Processing Neon Glow Bloom */}
        <EffectComposer >
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.1} radius={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
