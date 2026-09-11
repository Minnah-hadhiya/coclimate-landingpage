import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TerrainMesh from '../three/TerrainMesh';
import GrowingTree from '../three/GrowingTree';

/**
 * Act 2 Scene: Life emerges from terrain.
 * Trees grow, data labels appear.
 */
export default function ObservationScene({ progress = 0, isMobile = false }) {
  const treeProgress = Math.min(1, progress * 1.5);

  // Multiple trees at different positions
  const trees = [
    { pos: [0, 0.6, -1], scale: 1.2, delay: 0 },
    { pos: [-3, 0.2, -2], scale: 0.7, delay: 0.15 },
    { pos: [2.5, 0.3, -1.5], scale: 0.8, delay: 0.2 },
    { pos: [-1.5, 0.1, 1], scale: 0.5, delay: 0.3 },
    { pos: [3.5, -0.1, 0.5], scale: 0.6, delay: 0.25 },
  ];

  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: isMobile ? 55 : 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 8, 3]} intensity={0.7} color="#c8e6c0" />
        <directionalLight position={[-2, 3, -4]} intensity={0.15} color="#245438" />
        <pointLight position={[0, 3, 0]} intensity={0.3} color="#7af0a0" distance={8} />
        <fog attach="fog" args={['#050505', 12, 35]} />

        <TerrainMesh progress={1} color1="#0a1a12" color2="#1a3a28" />

        {trees.map((tree, i) => {
          const tp = Math.max(0, Math.min(1, (treeProgress - tree.delay) / (1 - tree.delay)));
          return (
            <GrowingTree
              key={i}
              progress={tp}
              position={tree.pos}
              scale={tree.scale}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
}
