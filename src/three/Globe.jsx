import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLOBE, MOCK_SITES } from '../utils/constants';

/**
 * Stylized Earth globe with illuminated verification sites.
 * Sites pulse with a signal glow.
 */
export default function Globe({ progress = 0, isMobile = false }) {
  const globeRef = useRef();
  const sitesRef = useRef();

  // Convert lat/lon to 3D position on sphere
  const latLonToVec3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const sitePositions = useMemo(() => {
    const positions = new Float32Array(MOCK_SITES.length * 3);
    const radius = GLOBE.RADIUS + 0.02;

    MOCK_SITES.forEach((site, i) => {
      const pos = latLonToVec3(site.lat, site.lon, radius);
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    });

    return positions;
  }, []);

  // Create wireframe sphere with continent-like features
  const globeGeometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(GLOBE.RADIUS, isMobile ? 3 : 4);
  }, [isMobile]);

  useFrame((state) => {
    if (!globeRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow rotation
    globeRef.current.rotation.y = time * 0.06;

    // Pulse site dots
    if (sitesRef.current) {
      const mat = sitesRef.current.material;
      mat.opacity = 0.5 + Math.sin(time * 2) * 0.3;
    }
  });

  const siteVisibility = Math.max(0, Math.min(1, (progress - 0.3) / 0.4));

  return (
    <group ref={globeRef} scale={progress > 0 ? Math.min(1, progress * 1.5) : 0.01}>
      {/* Globe wireframe */}
      <mesh geometry={globeGeometry}>
        <meshStandardMaterial
          color="#0a1a12"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Globe solid (subtle) */}
      <mesh geometry={globeGeometry}>
        <meshStandardMaterial
          color="#061210"
          transparent
          opacity={0.6}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[GLOBE.RADIUS, 32, 32]} />
        <meshStandardMaterial
          color="#1a3a28"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Verification sites */}
      {siteVisibility > 0 && (
        <points ref={sitesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[sitePositions, 3]}
              count={MOCK_SITES.length}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.15 : 0.1}
            color="#7af0a0"
            transparent
            opacity={siteVisibility}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Larger glow dots for sites */}
      {siteVisibility > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[sitePositions, 3]}
              count={MOCK_SITES.length}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.4 : 0.3}
            color="#7af0a0"
            transparent
            opacity={siteVisibility * 0.15}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}
