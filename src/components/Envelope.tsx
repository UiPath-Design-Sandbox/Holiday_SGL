import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface EnvelopeProps {
  onComplete: () => void;
}

function Envelope({ onComplete }: EnvelopeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const startTime = useRef<number | null>(null);

  // Create closed envelope geometry
  const geometry = useMemo(() => {
    // Create a closed envelope - simple rectangular box with sealed flap
    const width = 1.2;
    const height = 0.8;
    const depth = 0.08;
    
    const vertices = new Float32Array([
      // Front face (sealed envelope)
      -width/2, -height/2, 0,        // 0: Bottom left
      width/2, -height/2, 0,           // 1: Bottom right
      width/2, height/2, 0,           // 2: Top right
      -width/2, height/2, 0,           // 3: Top left
      
      // Back face
      -width/2, -height/2, -depth,     // 4: Bottom left (back)
      width/2, -height/2, -depth,      // 5: Bottom right (back)
      width/2, height/2, -depth,       // 6: Top right (back)
      -width/2, height/2, -depth,      // 7: Top left (back)
    ]);

    const indices = new Uint16Array([
      // Front face
      0, 1, 2, 0, 2, 3,
      // Back face
      4, 6, 5, 4, 7, 6,
      // Left side
      0, 4, 7, 0, 7, 3,
      // Right side
      1, 2, 6, 1, 6, 5,
      // Bottom
      0, 5, 4, 0, 1, 5,
      // Top
      3, 7, 6, 3, 6, 2,
    ]);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    // Initialize start time
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    const duration = 2; // Faster animation - 2 seconds
    progress.current = Math.min(elapsed / duration, 1);

    if (progress.current >= 1) {
      onComplete();
      return;
    }

    // Linear movement - no easing for fast, direct motion
    const linearProgress = progress.current;
    
    // Direct path from center to right, going up and exiting
    // Start position (center of screen)
    const startX = 0;    // Center horizontally
    const startY = 0;    // Center vertically
    const startZ = 1;    // Slightly forward
    
    // End position (right side, going up and off-screen)
    const endX = 15;     // Right side (off-screen)
    const endY = 12;     // Up (off-screen)
    const endZ = -4;     // Further back
    
    // Calculate position - direct linear interpolation, no arc
    const x = THREE.MathUtils.lerp(startX, endX, linearProgress);
    const y = THREE.MathUtils.lerp(startY, endY, linearProgress);
    const z = THREE.MathUtils.lerp(startZ, endZ, linearProgress);
    
    groupRef.current.position.set(x, y, z);

    // Minimal rotation - just slight tilt in direction of travel, no floating
    const angle = Math.atan2(endY - startY, endX - startX);
    groupRef.current.rotation.z = angle + Math.PI / 2; // Point in direction of travel
    groupRef.current.rotation.x = -0.2; // Slight upward tilt
    groupRef.current.rotation.y = 0; // No yaw
    
    // No spinning or scaling animation - keep it stable
    meshRef.current.rotation.set(0, 0, 0);
    groupRef.current.scale.setScalar(1);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#FFE5B4"
          emissive="#FFD700"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glow effect - warm golden glow */}
      <pointLight position={[0, 0, 0]} intensity={1.0} color="#FFD700" distance={5} />
    </group>
  );
}

interface Envelope3DProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function Envelope3D({ isVisible, onComplete }: Envelope3DProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'transparent',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 15], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} />
            <Envelope onComplete={onComplete} />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


