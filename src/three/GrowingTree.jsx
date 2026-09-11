import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Stylized growing tree with animated trunk, branches, and canopy.
 * Growth controlled by `progress` (0 = nothing, 1 = full tree).
 */
export default function GrowingTree({ progress = 0, position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  const trunkRef = useRef();
  const canopyRefs = useRef([]);

  const trunkGeometry = useMemo(() => {
    // Tapered cylinder for trunk
    const geo = new THREE.CylinderGeometry(0.04, 0.08, 2, 8, 8);
    return geo;
  }, []);

  const branchData = useMemo(() => {
    return [
      { pos: [0.15, 1.2, 0], rot: [0, 0, -0.5], len: 0.6, threshold: 0.4 },
      { pos: [-0.12, 1.0, 0.1], rot: [0.3, 0.5, 0.4], len: 0.5, threshold: 0.45 },
      { pos: [0.08, 0.8, -0.12], rot: [-0.2, -0.3, -0.3], len: 0.45, threshold: 0.5 },
    ];
  }, []);

  const canopyData = useMemo(() => {
    return [
      { pos: [0, 1.8, 0], size: 0.7, threshold: 0.5 },
      { pos: [0.3, 1.5, 0.1], size: 0.45, threshold: 0.55 },
      { pos: [-0.25, 1.6, -0.15], size: 0.4, threshold: 0.6 },
      { pos: [0.1, 2.0, -0.2], size: 0.35, threshold: 0.65 },
      { pos: [-0.15, 1.9, 0.2], size: 0.3, threshold: 0.7 },
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Subtle wind sway
    if (progress > 0.3) {
      const sway = Math.sin(time * 0.8) * 0.02 * Math.min(1, progress);
      groupRef.current.rotation.z = sway;
    }
  });

  // Trunk grows first (progress 0 → 0.4)
  const trunkProgress = Math.min(1, progress / 0.4);
  const trunkScale = Math.pow(trunkProgress, 0.5);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh
        ref={trunkRef}
        geometry={trunkGeometry}
        position={[0, trunkScale, 0]}
        scale={[1, trunkScale, 1]}
      >
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>

      {/* Branches */}
      {branchData.map((branch, i) => {
        const bp = Math.max(0, Math.min(1, (progress - branch.threshold) / 0.2));
        if (bp <= 0) return null;
        return (
          <mesh
            key={`branch-${i}`}
            position={branch.pos}
            rotation={branch.rot}
            scale={[bp, bp, bp]}
          >
            <cylinderGeometry args={[0.015, 0.03, branch.len, 6]} />
            <meshStandardMaterial color="#4a3728" roughness={0.85} />
          </mesh>
        );
      })}

      {/* Canopy spheres */}
      {canopyData.map((canopy, i) => {
        const cp = Math.max(0, Math.min(1, (progress - canopy.threshold) / 0.25));
        if (cp <= 0) return null;
        const easedCp = Math.pow(cp, 0.6);
        return (
          <mesh
            key={`canopy-${i}`}
            ref={(el) => (canopyRefs.current[i] = el)}
            position={canopy.pos}
            scale={[easedCp * canopy.size, easedCp * canopy.size * 0.8, easedCp * canopy.size]}
          >
            <sphereGeometry args={[1, 12, 10]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#1a5a30' : '#245a38'}
              roughness={0.8}
              transparent
              opacity={Math.min(1, cp * 1.5)}
            />
          </mesh>
        );
      })}
    </group>
  );
}
