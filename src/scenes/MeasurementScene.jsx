import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TerrainMesh from '../three/TerrainMesh';
import ScannerRing from '../three/ScannerRing';

/**
 * Act 3 Scene: Data overlay / measurement view.
 * Semi-transparent terrain with scanner ring and data overlays.
 */
export default function MeasurementScene({ progress = 0, isMobile = false }) {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: isMobile ? 55 : 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 10, 5]} intensity={0.4} color="#7af0a0" />
        <directionalLight position={[-3, 5, -3]} intensity={0.15} color="#245438" />
        <fog attach="fog" args={['#050505', 15, 40]} />

        <TerrainMesh progress={1} wireframe color1="#0a1a12" color2="#245438" />
        <ScannerRing progress={progress} position={[0, 1, 0]} />
      </Suspense>
    </Canvas>
  );
}
