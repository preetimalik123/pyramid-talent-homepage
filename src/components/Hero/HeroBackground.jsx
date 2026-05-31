import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createHorizontalLineLayer({
  width = 30,
  height = 18,
  columns = 160,
  rows = 70,
}) {
  const positions = [];
  const originals = [];

  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    const y = (v - 0.5) * height;

    for (let col = 0; col < columns; col++) {
      const u1 = col / columns;
      const u2 = (col + 1) / columns;

      const x1 = (u1 - 0.5) * width;
      const x2 = (u2 - 0.5) * width;

      // first point of segment
      positions.push(x1, y, 0);
      originals.push(x1, y, 0);

      // second point of segment
      positions.push(x2, y, 0);
      originals.push(x2, y, 0);
    }
  }

  return {
    positions: new Float32Array(positions),
    originals: new Float32Array(originals),
    count: positions.length / 3,
  };
}

function HorizontalFlowLines({
  width = 30,
  height = 18,
  columns = 150,
  rows = 58,
  color = "#93c5fd",
  opacity = 0.085,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  speed = 1,
  strength = 1,
  mouseStrength = 1,
}) {
  const lineRef = useRef(null);

  const layer = useMemo(
    () =>
      createHorizontalLineLayer({
        width,
        height,
        columns,
        rows,
      }),
    [width, height, columns, rows]
  );

  const smoothMouse = useRef({
    x: 0,
    y: 0,
  });

  useFrame((state) => {
    const line = lineRef.current;
    if (!line) return;

    const time = state.clock.getElapsedTime();
    const globalSpeed = 0.2;

    smoothMouse.current.x = THREE.MathUtils.lerp(
      smoothMouse.current.x,
      state.mouse.x * 7.5,
      0.055
    );

    smoothMouse.current.y = THREE.MathUtils.lerp(
      smoothMouse.current.y,
      state.mouse.y * 3.2,
      0.055
    );

    const positionAttr = line.geometry.attributes.position;
    const current = positionAttr.array;
    const original = layer.originals;

    for (let i = 0; i < layer.count; i++) {
      const index = i * 3;

      const x = original[index];
      const y = original[index + 1];
      const z = original[index + 2];

      const dx = x - smoothMouse.current.x;
      const dy = y - smoothMouse.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const mouseInfluence = Math.exp(-distance * distance * 0.07);

    const fold =
  Math.sin(y * 0.24 + x * 0.12 + time * 1.8 * speed * globalSpeed) *
  1.45 *
  strength;

      const flow =
        Math.sin(y * 0.95 + x * 0.38 + time * 2.9 * globalSpeed) *
          0.55 *
          strength +
        Math.cos(x * 0.24 + time * 1.3 * globalSpeed) *
          0.34 *
          strength;

      const secondaryFlow =
        Math.cos(y * 0.58 + x * 0.18 + time * 1.7 * globalSpeed) *
        0.24 *
        strength;

const mouseWake =
  Math.sin(distance * 2.2 - time * 1.8) *
  mouseInfluence *
  0.38 *
  mouseStrength;

      current[index] =
        x +
        Math.sin(y * 0.18 + time * 1.2 * globalSpeed) * 0.08 * strength +
        mouseInfluence * state.mouse.x * 0.25 * mouseStrength;

      current[index + 1] =
        y +
        Math.cos(x * 0.12 + time * 1.1 * globalSpeed) * 0.025 * strength +
        mouseInfluence * state.mouse.y * 0.16 * mouseStrength;

      current[index + 2] =
        z + fold + flow + secondaryFlow + mouseWake;
    }

    positionAttr.needsUpdate = true;

    line.position.x = Math.sin(time * 0.04 * globalSpeed) * 0.12;
    line.position.y = Math.cos(time * 0.03 * globalSpeed) * 0.08;

    line.rotation.y = THREE.MathUtils.lerp(
      line.rotation.y,
      state.mouse.x * 0.32,
      0.04
    );

    line.rotation.x = THREE.MathUtils.lerp(
      line.rotation.x,
      -state.mouse.y * 0.12,
      0.04
    );
  });

  return (
    <lineSegments ref={lineRef} position={position} scale={scale}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={layer.positions.slice()}
          count={layer.count}
          itemSize={3}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  );
}

function ClothMesh() {
  return (
    <>
   <HorizontalFlowLines
  width={100}
  height={14}
  columns={100}
  rows={250}
  color="#93c5fd"
  opacity={0.3}
  position={[.8, 0, 0]}
  scale={[1.05, 1, 1]}
  speed={1}
  strength={1.2}
  mouseStrength={1.6}
/>
  <HorizontalFlowLines
  width={100}
  height={13}
  columns={120}
  rows={70}
  color="#c4b5fd"
  opacity={0.0}
  position={[.2, 0, -4]}
  scale={[1.45, 1.25, 1]}
  speed={0.7}
  strength={0.7}
  mouseStrength={0}
/>
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="pt-hero-canvas">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 65,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
       dpr={[1, 1.35]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <fog attach="fog" args={["#071028", 12, 28]} />

        <ambientLight intensity={0.35} />

        <directionalLight position={[5, 5, 5]} intensity={3} color="#60a5fa" />

        <directionalLight
          position={[-5, -3, 2]}
          intensity={1.5}
          color="#a78bfa"
        />

        <ClothMesh />
</Canvas>

      <div className="pt-hero-overlay" />
    </div>
  );
}
