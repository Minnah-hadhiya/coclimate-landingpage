import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { simplex } from '../utils/noise';
import { TERRAIN } from '../utils/constants';

/**
 * Procedural terrain mesh using simplex noise.
 * Reveals based on scroll progress (0 = flat, 1 = fully formed).
 */
export default function TerrainMesh({ progress = 1, color1 = '#0a1a12', color2 = '#1a3a28', wireframe = false }) {
  const meshRef = useRef();
  const { positions, baseHeights, colors, indices } = useMemo(() => {
    const width = TERRAIN.WIDTH;
    const depth = TERRAIN.DEPTH;
    const seg = TERRAIN.SEGMENTS;
    const scale = TERRAIN.NOISE_SCALE;
    const heightScale = TERRAIN.HEIGHT_SCALE;

    const positions = new Float32Array((seg + 1) * (seg + 1) * 3);
    const baseHeights = new Float32Array((seg + 1) * (seg + 1));
    const colors = new Float32Array((seg + 1) * (seg + 1) * 3);
    const indices = [];

    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    const c3 = new THREE.Color('#245438');

    for (let j = 0; j <= seg; j++) {
      for (let i = 0; i <= seg; i++) {
        const idx = j * (seg + 1) + i;
        const x = (i / seg - 0.5) * width;
        const z = (j / seg - 0.5) * depth;

        // Multi-octave noise for natural terrain
        const h = simplex.fbm(x * scale, z * scale, 6, 2.0, 0.5) * heightScale;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0; // Start flat, animate to h
        positions[idx * 3 + 2] = z;
        baseHeights[idx] = h;

        // Color based on height
        const normalizedH = (h / heightScale + 1) * 0.5;
        const col = new THREE.Color();
        if (normalizedH < 0.4) {
          col.lerpColors(c1, c2, normalizedH / 0.4);
        } else {
          col.lerpColors(c2, c3, (normalizedH - 0.4) / 0.6);
        }

        colors[idx * 3] = col.r;
        colors[idx * 3 + 1] = col.g;
        colors[idx * 3 + 2] = col.b;
      }
    }

    for (let j = 0; j < seg; j++) {
      for (let i = 0; i < seg; i++) {
        const a = j * (seg + 1) + i;
        const b = j * (seg + 1) + (i + 1);
        const c = (j + 1) * (seg + 1) + (i + 1);
        const d = (j + 1) * (seg + 1) + i;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    return { positions, baseHeights, colors, indices };
  }, [color1, color2]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    // Smoothly interpolate terrain height based on progress
    const eased = Math.pow(progress, 1.5);
    for (let i = 0; i < baseHeights.length; i++) {
      arr[i * 3 + 1] = baseHeights[i] * eased;
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.slice(), 3]}
          count={(TERRAIN.SEGMENTS + 1) * (TERRAIN.SEGMENTS + 1)}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={(TERRAIN.SEGMENTS + 1) * (TERRAIN.SEGMENTS + 1)}
        />
        <bufferAttribute
          attach="index"
          args={[new Uint32Array(indices), 1]}
          count={indices.length}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        wireframe={wireframe}
        roughness={0.85}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
