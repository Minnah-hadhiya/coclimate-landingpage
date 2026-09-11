import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from '../three/ParticleField';
import TerrainMesh from '../three/TerrainMesh';

/**
 * Act 1 Scene: Particles coalesce into terrain.
 * progress 0→0.5: particles morph, 0.5→1: terrain rises
 */
export default function HeroScene({ progress = 0, isMobile = false }) {
  const particleProgress = Math.min(1, progress * 2);
  const terrainProgress = Math.max(0, (progress - 0.3) / 0.7);

  return (
    <Canvas
      camera={{ position: [0, 6, 14], fov: isMobile ? 60 : 50 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={0.6} color="#c8e6c0" />
        <directionalLight position={[-3, 5, -5]} intensity={0.2} color="#1a3a28" />
        <fog attach="fog" args={['#050505', 15, 40]} />

        <ParticleField progress={particleProgress} isMobile={isMobile} />
        {terrainProgress > 0 && (
          <TerrainMesh progress={terrainProgress} />
        )}
      </Suspense>
    </Canvas>
  );
}
