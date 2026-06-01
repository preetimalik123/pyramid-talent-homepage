import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 14000;
const BIG_COUNT = 900;

const DESKTOP_PARTICLE_CONFIG = {
  deliveryX: 10,
  globeX: 8.25,
  finalLeftX: -4.95,
  finalRightX: 4.95,
  scatterCenterX: 1.5,
  scatterSpreadX: 28,
  scatterSpreadY: 8,
  scatterSpreadZ: 7,
  globeRadius: 3.35,
  cameraX: 1.35,
  cameraY: 0.08,
  cameraZ: 15.4,
  lookAtX: 1.1,
  pointSize: 0.052,
  bigPointSize: 0.13,
};

const MOBILE_PARTICLE_CONFIG = {
  deliveryX: 0,
  globeX: 0,
  finalLeftX: -2.15,
  finalRightX: 2.15,
  scatterCenterX: 0,
  scatterSpreadX: 9,
  scatterSpreadY: 5.8,
  scatterSpreadZ: 4.8,
  globeRadius: 2.35,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 18.8,
  lookAtX: 0,
  pointSize: 0.038,
  bigPointSize: 0.075,
};

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

   const startOffset = viewportHeight * 0.4;

  const travelled = Math.max(0, scrollY - stage.top - startOffset);
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

function createScatter(seed = 10, centerX = DESKTOP_PARTICLE_CONFIG.deliveryX, spreadX = 15, spreadY = 8, spreadZ = 7) {
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

function createLayeredFlow(centerX = DESKTOP_PARTICLE_CONFIG.deliveryX) {
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

    arr.push(centerX + x, y + 0.2, z);
  }

  return arr;
}

function createTextShape(lines, options = {}) {
  const {
    centerX = DESKTOP_PARTICLE_CONFIG.deliveryX,
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

function createDemandDeliveryShape(centerX = DESKTOP_PARTICLE_CONFIG.deliveryX, shapeScale = 0.0088) {
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
  ctx.fillText("DELIVER", canvas.width / 2, 1110);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const points = [];
  const scale = shapeScale;
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


function createDualTextShape(config = DESKTOP_PARTICLE_CONFIG) {
  const creatingValue = createTextShape(["CREATING", "GREATER", "VALUE"], {
    centerX: config.finalLeftX,
    fontSize: config === MOBILE_PARTICLE_CONFIG ? 104 : 128,
    lineHeight: config === MOBILE_PARTICLE_CONFIG ? 118 : 142,
    scale: config === MOBILE_PARTICLE_CONFIG ? 0.0056 : 0.0066,
    yOffset: 0.04,
    seed: 121,
  });

  const bestTalent = createTextShape(["BEST", "TALENT"], {
    centerX: config.finalRightX,
    fontSize: config === MOBILE_PARTICLE_CONFIG ? 132 : 178,
    lineHeight: config === MOBILE_PARTICLE_CONFIG ? 150 : 195,
    scale: config === MOBILE_PARTICLE_CONFIG ? 0.0068 : 0.0092,
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

function createGlobeShape(globeX = DESKTOP_PARTICLE_CONFIG.globeX, radius = DESKTOP_PARTICLE_CONFIG.globeRadius) {
  const random = seededRandom(88);
  const arr = [];

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

    arr.push(globeX + x, y, z);
  }

  return arr;
}


function useResponsiveParticleConfig() {
  const [isCompact, setIsCompact] = useState(() =>
      typeof window === "undefined" ? false : window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return isCompact ? MOBILE_PARTICLE_CONFIG : DESKTOP_PARTICLE_CONFIG;
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
  const config = useResponsiveParticleConfig();
  const isPageVisible = usePageVisible();
  const storyLayout = useParticleStoryLayout();
  const geometryRef = useRef(null);
  const materialRef = useRef(null);
  const bigMaterialRef = useRef(null);

const scatterStart = useMemo(() => createScatter(11, config.scatterCenterX, config.scatterSpreadX, config.scatterSpreadY, config.scatterSpreadZ), [config]);
  const layeredFlow = useMemo(() => createLayeredFlow(config.deliveryX), [config]);

  const bigPositions = useMemo(
  () => new Float32Array(createScatter(222, config.scatterCenterX, config.scatterSpreadX, config.scatterSpreadY, config.scatterSpreadZ).slice(0, BIG_COUNT * 3)),
  [config]
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

  const creatingValueRight = useMemo(() => createDemandDeliveryShape(config.deliveryX, config === MOBILE_PARTICLE_CONFIG ? 0.0062 : 0.0088), [config]);

  const scatterAfterValue = useMemo(() => createScatter(55, config.globeX, config === MOBILE_PARTICLE_CONFIG ? 8 : 16, config.scatterSpreadY, config.scatterSpreadZ), [config]);
  const globe = useMemo(() => createGlobeShape(config.globeX, config.globeRadius), [config]);
  const scatterAfterGlobe = useMemo(() => createScatter(77, config.globeX, config === MOBILE_PARTICLE_CONFIG ? 8 : 16, config.scatterSpreadY, config.scatterSpreadZ), [config]);
  const dualValueTalent = useMemo(() => createDualTextShape(config), [config]);
  const finalScatter = useMemo(() => createScatter(101, config.scatterCenterX, config === MOBILE_PARTICLE_CONFIG ? 9 : 18, config.scatterSpreadY, config.scatterSpreadZ), [config]);

  const positions = useMemo(() => new Float32Array(scatterStart), [scatterStart]);
  const colors = useMemo(() => new Float32Array(COUNT * 3), []);

  const blue = useMemo(() => new THREE.Color("#60a5fa"), []);
  const cyan = useMemo(() => new THREE.Color("#67e8f9"), []);
  const violet = useMemo(() => new THREE.Color("#c084fc"), []);

  useFrame(({ camera, clock }, delta) => {
    if (!isPageVisible || !geometryRef.current || !materialRef.current) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const viewportHeight = storyLayout.current.viewportHeight || window.innerHeight;

    const stage = storyLayout.current.stage;
    const isNearParticleStage =
      !stage ||
      (scrollY > stage.top - viewportHeight * 1.4 &&
        scrollY < stage.top + stage.height + viewportHeight * 1.2);

    if (!isNearParticleStage) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        0,
        delta * 5
      );

      if (bigMaterialRef.current) {
        bigMaterialRef.current.opacity = THREE.MathUtils.lerp(
          bigMaterialRef.current.opacity,
          0,
          delta * 5
        );
      }

      return;
    }

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
    let targetOpacity = introProgress > 0.08 ? 0.92 : 0;

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
        local = clamp01((globeState.progress - 0.18) / 0.5);
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
        const x = pos[idx] - config.globeX;
        const z = pos[idx + 2];
        const angle = time * 0.24 * globeVisibility;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        pos[idx] = config.globeX + x * cos - z * sin;
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
 const bigIntroReveal = smoothstep((introProgress - 0.18) / 0.24);
const bigIntroFade = 1 - smoothstep((introProgress - 0.72) / 0.22);

const shouldShowBigParticles =
  delivery.before && !delivery.active && !globeState.active && !finalState.active;

const bigTargetOpacity = shouldShowBigParticles
  ? 0.58 * bigIntroReveal * bigIntroFade
  : 0;

      bigMaterialRef.current.opacity = THREE.MathUtils.lerp(
        bigMaterialRef.current.opacity,
        bigTargetOpacity,
        delta * 5
      );
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, config.cameraZ, delta * 2);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, config.cameraX, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, config.cameraY, delta * 2);
    camera.lookAt(config.lookAtX, 0, 0);
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
          size={config.pointSize}
      transparent
      opacity={0}
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
  size={config.bigPointSize}
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
  const config = useResponsiveParticleConfig();

  return (
    <div className="canvasWrap" aria-hidden="true">
      <Canvas
        camera={{ position: [config.cameraX, config.cameraY, config.cameraZ], fov: config === MOBILE_PARTICLE_CONFIG ? 64 : 58 }}
        dpr={config === MOBILE_PARTICLE_CONFIG ? [1, 1] : [1, 1.25]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
        }}
      >
        <ambientLight />
        <SceneParticles />
      </Canvas>
    </div>
  );
}
