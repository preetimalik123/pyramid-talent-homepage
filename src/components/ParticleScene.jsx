import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 14000;
const BIG_COUNT = 1000;

const DELIVERY_X = 10;
const DELIVERY_TEXT_X = 8.45;
const GLOBE_X = 8.25;
const FINAL_LEFT_X = -4.95;
const FINAL_RIGHT_X = 4.95;

function seededRandom(seed) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function clamp01(value) {
  return Math.min(Math.max(value, 0), 1);
}

function smoothstep(value) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function lerpPoint(from, to, progress, output, particleIndex) {
  const t = smoothstep(progress);
  const i = particleIndex * 3;

  output[i] = THREE.MathUtils.lerp(from[i], to[i], t);
  output[i + 1] = THREE.MathUtils.lerp(from[i + 1], to[i + 1], t);
  output[i + 2] = THREE.MathUtils.lerp(from[i + 2], to[i + 2], t);
}


function getDocumentTop(element) {
  if (!element) return 0;

  let top = 0;
  let node = element;

  while (node) {
    top += node.offsetTop || 0;
    node = node.offsetParent;
  }

  return top;
}

function getSectionProgressFromLayout(section, scrollY, viewportHeight) {
  if (!section) {
    return { active: false, progress: 0, before: true, after: false };
  }

  const top = section.top - scrollY;
  const bottom = top + section.height;

  const startLine = viewportHeight * 0.78;
  const endLine = viewportHeight * 0.22;
  const travel = section.height + startLine - endLine;

  const progress = clamp01((startLine - top) / Math.max(travel, 1));
  const active = top < startLine && bottom > endLine;

  return {
    active,
    progress,
    before: top >= startLine,
    after: bottom <= endLine,
  };
}

function getIntroProgressFromLayout(layout, scrollY, viewportHeight) {
  const { stage, delivery } = layout.current;

  if (!stage || !delivery) return 0;

  const travelled = Math.max(0, scrollY - stage.top);
  const distanceToDelivery = Math.max(
    viewportHeight,
    delivery.top - stage.top - viewportHeight * 0.7
  );

  return clamp01(travelled / distanceToDelivery);
}

function useParticleStoryLayout() {
  const layout = useRef({
    stage: null,
    delivery: null,
    globe: null,
    final: null,
    viewportHeight: typeof window === "undefined" ? 1 : window.innerHeight,
  });

  useEffect(() => {
    const measure = () => {
      const stageElement = document.querySelector(".particle-stage");
      const deliveryElement = document.getElementById("ux-particle-delivery-trigger");
      const globeElement = document.getElementById("ux-particle-globe-trigger");
      const finalElement = document.getElementById("ux-particle-final-trigger");

      const createSection = (element) => {
        if (!element) return null;

        return {
          top: getDocumentTop(element),
          height: element.offsetHeight,
        };
      };

      layout.current = {
        stage: createSection(stageElement),
        delivery: createSection(deliveryElement),
        globe: createSection(globeElement),
        final: createSection(finalElement),
        viewportHeight: window.innerHeight,
      };
    };

    measure();

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    const timeoutId = window.setTimeout(measure, 350);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return layout;
}

function createScatter(seed = 10, centerX = DELIVERY_X, spreadX = 15, spreadY = 8, spreadZ = 7) {
  const random = seededRandom(seed);
  const arr = [];

  for (let i = 0; i < COUNT; i++) {
    arr.push(
      centerX + (random() - 0.5) * spreadX,
      (random() - 0.5) * spreadY,
      (random() - 0.5) * spreadZ
    );
  }

  return arr;
}

function createLayeredFlow() {
  const random = seededRandom(22);
  const arr = [];

  for (let i = 0; i < COUNT; i++) {
    const layer = i % 8;
    const row = Math.floor(i / 8);

    const x = -7.4 + row * 0.009;
    const layerOffset = (layer - 3.5) * 0.46;

    const y =
      Math.sin(x * 0.88 + layer * 0.7) * 1.1 +
      Math.cos(x * 0.22 + layer * 0.45) * 0.62 +
      layerOffset;

    const z =
      Math.sin(x * 0.5 + layer * 1.4) * 1.05 +
      (random() - 0.5) * 0.55;

    arr.push(DELIVERY_X + x, y + 0.2, z);
  }

  return arr;
}

function createTextShape(lines, options = {}) {
  const {
    centerX = DELIVERY_X,
    fontSize = 150,
    lineHeight = 170,
    scale = 0.0098,
    yOffset = 0.15,
    seed = 44,
  } = options;

  const random = seededRandom(seed);

  const canvas = document.createElement("canvas");
  canvas.width = 2600;
  canvas.height = 1300;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px Arial`;

  const totalHeight = (lines.length - 1) * lineHeight;
  const startY = canvas.height / 2 - totalHeight / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
  });

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const points = [];

  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      const index = (y * canvas.width + x) * 4;

      if (data[index] > 50) {
        points.push(
          centerX + (x - canvas.width / 2) * scale,
          -(y - canvas.height / 2) * scale + yOffset,
          (random() - 0.5) * 0.2
        );
      }
    }
  }

  while (points.length < COUNT * 3) {
    const source = Math.floor(random() * (points.length / 3)) * 3;

    points.push(
      points[source] + (random() - 0.5) * 0.035,
      points[source + 1] + (random() - 0.5) * 0.035,
      points[source + 2] + (random() - 0.5) * 0.035
    );
  }

  return points.slice(0, COUNT * 3);
}

function createDemandDeliveryShape() {
  const random = seededRandom(333);

  const canvas = document.createElement("canvas");
  canvas.width = 2600;
  canvas.height = 1500;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "900 205px Arial";
  ctx.fillText("DEMAND", canvas.width / 2, 390);

  ctx.save();
  ctx.translate(canvas.width / 2, 750);
  ctx.lineWidth = 34;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.moveTo(0, -155);
  ctx.lineTo(0, 90);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-86, 22);
  ctx.lineTo(0, 108);
  ctx.lineTo(86, 22);
  ctx.stroke();

  ctx.restore();

  ctx.font = "900 205px Arial";
  ctx.fillText("DELIVERY", canvas.width / 2, 1110);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const points = [];
  const scale = 0.0088;
  const centerX = DELIVERY_X;
  const yOffset = 0.02;

  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      const index = (y * canvas.width + x) * 4;

      if (data[index] > 50) {
        points.push(
          centerX + (x - canvas.width / 2) * scale,
          -(y - canvas.height / 2) * scale + yOffset,
          (random() - 0.5) * 0.2
        );
      }
    }
  }

  while (points.length < COUNT * 3) {
    const source = Math.floor(random() * (points.length / 3)) * 3;

    points.push(
      points[source] + (random() - 0.5) * 0.035,
      points[source + 1] + (random() - 0.5) * 0.035,
      points[source + 2] + (random() - 0.5) * 0.035
    );
  }

  return points.slice(0, COUNT * 3);
}


function createDualTextShape() {
  const creatingValue = createTextShape(["CREATING", "GREATER", "VALUE"], {
    centerX: FINAL_LEFT_X,
    fontSize: 128,
    lineHeight: 142,
    scale: 0.0066,
    yOffset: 0.04,
    seed: 121,
  });

  const bestTalent = createTextShape(["BEST", "TALENT"], {
    centerX: FINAL_RIGHT_X,
    fontSize: 178,
    lineHeight: 195,
    scale: 0.0092,
    yOffset: 0.03,
    seed: 122,
  });

  const merged = [];
  const half = Math.floor(COUNT / 2);

  for (let i = 0; i < COUNT; i++) {
    const useLeft = i < half;
    const source = useLeft ? creatingValue : bestTalent;
    const sourceIndex = (useLeft ? i : i - half) * 3;

    merged.push(
      source[sourceIndex],
      source[sourceIndex + 1],
      source[sourceIndex + 2]
    );
  }

  return merged;
}

function createGlobeShape() {
  const random = seededRandom(88);
  const arr = [];
  const radius = 3.35;

  for (let i = 0; i < COUNT; i++) {
    const mode = i % 5;

    let x;
    let y;
    let z;

    if (mode === 0) {
      const latitudeIndex = Math.floor(random() * 9) - 4;
      const lat = latitudeIndex * 0.23;
      const ringRadius = radius * Math.cos(lat);
      const theta = random() * Math.PI * 2;

      x = ringRadius * Math.cos(theta);
      y = radius * Math.sin(lat);
      z = ringRadius * Math.sin(theta);
    } else if (mode === 1) {
      const longitudeIndex = Math.floor(random() * 12);
      const theta = (longitudeIndex / 12) * Math.PI * 2;
      const phi = random() * Math.PI - Math.PI / 2;

      x = radius * Math.cos(phi) * Math.cos(theta);
      y = radius * Math.sin(phi);
      z = radius * Math.cos(phi) * Math.sin(theta);
    } else {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);
    }

    arr.push(GLOBE_X + x, y, z);
  }

  return arr;
}


function usePageVisible() {
  const [isVisible, setIsVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

function SceneParticles() {
  const isPageVisible = usePageVisible();
  const storyLayout = useParticleStoryLayout();
  const geometryRef = useRef(null);
  const materialRef = useRef(null);
  const bigMaterialRef = useRef(null);

const scatterStart = useMemo(() => createScatter(11, 1.5, 28, 8, 7), []);
  const layeredFlow = useMemo(() => createLayeredFlow(), []);

  const bigPositions = useMemo(
  () => new Float32Array(createScatter(222, 1.5, 28, 8, 7).slice(0, BIG_COUNT * 3)),
  []
);

const bigColors = useMemo(() => {
  const arr = new Float32Array(BIG_COUNT * 3);
  const bigBlue = new THREE.Color("#60a5fa");
  const bigViolet = new THREE.Color("#c084fc");

  for (let i = 0; i < BIG_COUNT; i++) {
    const color = i % 2 === 0 ? bigBlue : bigViolet;
    const index = i * 3;

    arr[index] = color.r;
    arr[index + 1] = color.g;
    arr[index + 2] = color.b;
  }

  return arr;
}, []);

  const creatingValueRight = useMemo(() => createDemandDeliveryShape(), []);

  const scatterAfterValue = useMemo(() => createScatter(55, GLOBE_X, 16, 8, 7), []);
  const globe = useMemo(() => createGlobeShape(), []);
  const scatterAfterGlobe = useMemo(() => createScatter(77, GLOBE_X, 16, 8, 7), []);
  const dualValueTalent = useMemo(() => createDualTextShape(), []);
  const finalScatter = useMemo(() => createScatter(101, 1.2, 18, 8, 7), []);

  const positions = useMemo(() => new Float32Array(scatterStart), [scatterStart]);
  const colors = useMemo(() => new Float32Array(COUNT * 3), []);

  const blue = useMemo(() => new THREE.Color("#60a5fa"), []);
  const cyan = useMemo(() => new THREE.Color("#67e8f9"), []);
  const violet = useMemo(() => new THREE.Color("#c084fc"), []);

  useFrame(({ camera, clock }, delta) => {
    if (!isPageVisible || !geometryRef.current || !materialRef.current) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const viewportHeight = storyLayout.current.viewportHeight || window.innerHeight;

    const delivery = getSectionProgressFromLayout(
      storyLayout.current.delivery,
      scrollY,
      viewportHeight
    );
    const globeState = getSectionProgressFromLayout(
      storyLayout.current.globe,
      scrollY,
      viewportHeight
    );
    const finalState = getSectionProgressFromLayout(
      storyLayout.current.final,
      scrollY,
      viewportHeight
    );

    const introProgress = getIntroProgressFromLayout(
      storyLayout,
      scrollY,
      viewportHeight
    );

    let from = scatterStart;
    let to = layeredFlow;
    let local = introProgress;
    let globeVisibility = 0;
    let targetOpacity = 0.92;

    if (finalState.active) {
      if (finalState.progress < 0.2) {
        from = scatterAfterGlobe;
        to = finalScatter;
        local = clamp01(finalState.progress / 0.2);
      } else {
        from = finalScatter;
        to = dualValueTalent;
        local = clamp01((finalState.progress - 0.2) / 0.58);
      }

      targetOpacity = 1;
    } else if (finalState.after) {
      from = dualValueTalent;
      to = finalScatter;
      local = 1;
      targetOpacity = 0.08;
    } else if (globeState.active) {
      if (globeState.progress < 0.18) {
        from = creatingValueRight;
        to = scatterAfterValue;
        local = clamp01(globeState.progress / 0.18);
      } else if (globeState.progress < 0.78) {
        from = scatterAfterValue;
        to = globe;
        local = clamp01((globeState.progress - 0.18) / 0.6);
        globeVisibility = smoothstep(local);
      } else {
        from = globe;
        to = scatterAfterGlobe;
        local = clamp01((globeState.progress - 0.78) / 0.22);
        globeVisibility = 1 - smoothstep(local);
      }

      targetOpacity = 1;
    } else if (delivery.active) {
      if (delivery.progress < 0.24) {
        from = scatterStart;
        to = layeredFlow;
        local = clamp01(delivery.progress / 0.24);
      } else if (delivery.progress < 0.46) {
        from = layeredFlow;
        to = creatingValueRight;
        local = clamp01((delivery.progress - 0.24) / 0.22);
      } else {
        from = creatingValueRight;
        to = creatingValueRight;
        local = 1;
      }

      targetOpacity = 1;
    }

    const time = clock.getElapsedTime();
    const pos = geometryRef.current.attributes.position.array;
    const col = geometryRef.current.attributes.color.array;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;

      lerpPoint(from, to, local, pos, i);

      const shimmer =
        Math.sin(time * 0.52 + i * 0.017) * 0.015 +
        Math.cos(time * 0.34 + i * 0.011) * 0.012;

      pos[idx + 1] += shimmer;

      if (globeVisibility > 0.02) {
        const x = pos[idx] - GLOBE_X;
        const z = pos[idx + 2];
        const angle = time * 0.24 * globeVisibility;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        pos[idx] = GLOBE_X + x * cos - z * sin;
        pos[idx + 2] = x * sin + z * cos;
      }

      let highlight;

      if (finalState.active) {
        const isLeftMessage = i < COUNT / 2;
        highlight = isLeftMessage ? blue : violet;

        if (i % 13 === 0) {
          highlight = cyan;
        }
      } else {
        const mainColor = i % 2 === 0 ? blue : violet;
        highlight = i % 9 === 0 ? cyan : mainColor;
      }

      col[idx] = highlight.r;
      col[idx + 1] = highlight.g;
      col[idx + 2] = highlight.b;
    }

    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.attributes.color.needsUpdate = true;

    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      delta * 4
    );

    if (bigMaterialRef.current) {
      const bigIntroFade = 1 - smoothstep((introProgress - 0.28) / 0.46);
      const shouldShowBigParticles =
        delivery.before && !delivery.active && !globeState.active && !finalState.active;

   const bigTargetOpacity = shouldShowBigParticles
  ? 0.72 * bigIntroFade
  : 0;

      bigMaterialRef.current.opacity = THREE.MathUtils.lerp(
        bigMaterialRef.current.opacity,
        bigTargetOpacity,
        delta * 5
      );
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15.4, delta * 2);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 1.35, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.08, delta * 2);
    camera.lookAt(1.1, 0, 0);
  });

  return (
    <>
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={COUNT}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        ref={materialRef}
        vertexColors
          size={0.052}
      transparent
      opacity={0.9}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      />
    </points>
      <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={bigPositions}
          count={BIG_COUNT}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={bigColors}
          count={BIG_COUNT}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
       ref={bigMaterialRef}
  vertexColors
  size={0.13}
  transparent
  opacity={0}
  depthWrite={false}
  blending={THREE.AdditiveBlending}
      />
    </points>
    </>
  );
}

export default function ParticleScene() {
  return (
    <div className="canvasWrap" aria-hidden="true">
      <Canvas camera={{ position: [1.35, 0.08, 15.4], fov: 58 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <ambientLight />
        <SceneParticles />
      </Canvas>
    </div>
  );
}
