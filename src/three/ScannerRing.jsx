import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated radar/scanner ring that sweeps across terrain.
 * Creates a "scanning" effect to visualize measurement.
 */
export default function ScannerRing({ progress = 0, position = [0, 0, 0] }) {
  const ringRef = useRef();

  const ringGeometry = new THREE.RingGeometry(3, 3.05, 64);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.elapsedTime;

    // Expand and contract
    const scale = 1 + Math.sin(time * 0.8) * 0.3;
    ringRef.current.scale.set(scale, scale, 1);

    // Pulse opacity
    ringRef.current.material.opacity = (0.15 + Math.sin(time * 1.5) * 0.1) * progress;
  });

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef} geometry={ringGeometry}>
        <meshBasicMaterial
          color="#7af0a0"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner scanning line */}
      {progress > 0 && (
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[0, 3, 64, 1, 0, Math.PI * 0.1]} />
          <meshBasicMaterial
            color="#7af0a0"
            transparent
            opacity={progress * 0.2}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}
