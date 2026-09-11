import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Globe from '../three/Globe';

/**
 * Act 5 Scene: The globe with verified sites.
 * Dramatic reveal of global scale.
 */
export default function GlobeScene({ progress = 0, isMobile = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: isMobile ? 55 : 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={0.5} color="#c8e6c0" />
        <directionalLight position={[-5, -2, -5]} intensity={0.15} color="#1a3a28" />
        <pointLight position={[0, 0, 4]} intensity={0.3} color="#7af0a0" distance={10} />

        <Globe progress={progress} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
