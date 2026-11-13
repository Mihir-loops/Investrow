/**
 * HeroBull — stylised low-poly 3D charging bull bust for the Investrow hero.
 * Built on three.js + @react-three/fiber (React 18 compatible v8).
 *
 * Design notes:
 *  - High-impact Bull Market / Stock Candlestick Green + Obsidian Palette.
 *  - Anatomically authentic bovine muzzle with recessed nostril apertures,
 *    muscular alar folds, planar rhinarium, and iconic golden septum ring.
 *  - Tapering curved horns with gradient from carbon obsidian to electric green tips.
 *  - Bullish electric trading green gaze with full-viewport cursor eye tracking.
 *  - Orbiting market tokens in bullish green & emerald.
 *  - Dynamic lighting with candlestick green silhouette rim light and underglow.
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "../../hooks/useReveal";

/* ------------------------------------------------------------------ */
/* Stock Market Bullish Green & Obsidian Palette                       */
/* Standard TradingView / NSE / Bloomberg Candlestick Green           */
/* ------------------------------------------------------------------ */

const OBSIDIAN = "#040d08";
const OBSIDIAN_DEEP = "#020704";
const BULL_GREEN_BRIGHT = "#10b981";
const CANDLE_GREEN_ELECTRIC = "#00dc82";
const MUZZLE_DARK = "#04140b";

function createGradientTexture(stops: { stop: number; color: string }[]): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    stops.forEach(({ stop, color }) => grad.addColorStop(stop, color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/* ------------------------------------------------------------------ */
/* Geometry: tapered curved tube (for the horns) with UV mapping       */
/* ------------------------------------------------------------------ */

function taperedTubeGeometry(
  curve: THREE.CatmullRomCurve3,
  radii: number[],
  tubularSegments: number,
  radialSegments: number,
): THREE.BufferGeometry {
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const radiusAt = (t: number) => {
    const f = t * (radii.length - 1);
    const i = Math.min(radii.length - 2, Math.floor(f));
    const local = f - i;
    return radii[i] + (radii[i + 1] - radii[i]) * local;
  };

  for (let j = 0; j <= tubularSegments; j++) {
    const t = j / tubularSegments;
    const p = curve.getPointAt(Math.min(t, 0.9999));
    const r = radiusAt(t);
    const normal = frames.normals[Math.min(j, tubularSegments - 1)];
    const binormal = frames.binormals[Math.min(j, tubularSegments - 1)];
    for (let i = 0; i < radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      const sin = Math.sin(theta);
      const cos = Math.cos(theta);
      positions.push(
        p.x + r * (cos * normal.x + sin * binormal.x),
        p.y + r * (cos * normal.y + sin * binormal.y),
        p.z + r * (cos * normal.z + sin * binormal.z),
      );
      uvs.push(i / radialSegments, t);
    }
  }

  for (let j = 0; j < tubularSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * radialSegments + i;
      const b = j * radialSegments + ((i + 1) % radialSegments);
      const c = (j + 1) * radialSegments + ((i + 1) % radialSegments);
      const d = (j + 1) * radialSegments + i;
      indices.push(a, b, c, a, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/* ------------------------------------------------------------------ */
/* Scene pieces                                                         */
/* ------------------------------------------------------------------ */

type BullProps = {
  animated: boolean;
  gazeRef?: React.RefObject<{ x: number; y: number }>;
};

type CoinsProps = {
  animated: boolean;
};

function Bull({ animated, gazeRef }: BullProps) {
  const parallaxRef = useRef<THREE.Group>(null);
  const rootRef = useRef<THREE.Group>(null);
  const leftHornRef = useRef<THREE.Group>(null);
  const rightHornRef = useRef<THREE.Group>(null);
  const eyeRGroupRef = useRef<THREE.Group>(null);
  const eyeLGroupRef = useRef<THREE.Group>(null);
  const pupilRRef = useRef<THREE.Group>(null);
  const pupilLRef = useRef<THREE.Group>(null);
  const irisRMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const irisLMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const scleraRMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const scleraLMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const flashRef = useRef<THREE.PointLight>(null);

  const charge = useRef({ active: 0 });
  const born = useRef<number | null>(null);
  const currentGaze = useRef({ x: 0, y: 0 });

  const rightHornGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.46, 0.44, -0.02),
        new THREE.Vector3(0.98, 0.6, -0.03),
        new THREE.Vector3(1.32, 1.02, -0.06),
        new THREE.Vector3(1.38, 1.6, -0.1),
      ],
      false,
      "catmullrom",
      0.35,
    );
    return taperedTubeGeometry(curve, [0.18, 0.155, 0.09, 0.014], 26, 7);
  }, []);

  const leftHornGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.46, 0.44, -0.02),
        new THREE.Vector3(-0.98, 0.6, -0.03),
        new THREE.Vector3(-1.32, 1.02, -0.06),
        new THREE.Vector3(-1.38, 1.6, -0.1),
      ],
      false,
      "catmullrom",
      0.35,
    );
    return taperedTubeGeometry(curve, [0.18, 0.155, 0.09, 0.014], 26, 7);
  }, []);

  // Stock Market Bullish Green procedural gradient textures
  const bodyGradientTexture = useMemo(
    () =>
      createGradientTexture([
        { stop: 0.0, color: "#020704" },   // Obsidian carbon crown
        { stop: 0.28, color: "#05180e" },  // Deep forest carbon
        { stop: 0.58, color: "#064e3b" },  // Intense stock market emerald
        { stop: 0.82, color: "#059669" },  // Dynamic trading green
        { stop: 1.0, color: "#10b981" },   // Electric bullish candle green jaw
      ]),
    [],
  );

  useEffect(
    () => () => {
      rightHornGeometry.dispose();
      leftHornGeometry.dispose();
      bodyGradientTexture.dispose();
    },
    [rightHornGeometry, leftHornGeometry, bodyGradientTexture],
  );

  useEffect(() => {
    const onCharge = () => {
      charge.current.active = 1;
    };
    window.addEventListener("bull:charge", onCharge);
    return () => window.removeEventListener("bull:charge", onCharge);
  }, []);

  useFrame((state, rawDelta) => {
    if (!animated) {
      if (rootRef.current) rootRef.current.rotation.y = Math.PI * 0.02;
      return;
    }
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;

    // Entrance (easeOutBack)
    if (born.current === null) born.current = t;
    const entry = Math.min(1, Math.max(0, (t - 0.18) / 1.15));
    const back = 1 + 2.70158 * Math.pow(entry - 1, 3) + 1.70158 * Math.pow(entry - 1, 2);
    const scale = animated ? Math.max(0.0001, back) : 1;

    // Charge countdown
    let k = 0;
    if (charge.current.active > 0) {
      charge.current.active = Math.max(0, charge.current.active - delta / 1.05);
      k = Math.sin((1 - charge.current.active) * Math.PI);
    }

    const root = rootRef.current;
    if (root) {
      root.scale.setScalar(scale * (1 - k * 0.05));
      root.rotation.y = (1 - back) * 1.1 + Math.sin(t * 0.32) * 0.075 + k * Math.sin(t * 34) * 0.03;
      root.position.y = Math.sin(t * 0.85) * 0.055 - (1 - back) * 0.45 - k * 0.16;
      root.position.z = k * 0.5;
      root.rotation.x = -k * 0.16;
    }

    // Camera pulls back slightly during the charge so the horns stay in frame
    const camera = state.camera as THREE.PerspectiveCamera;
    const targetZ = 5.15 + k * 0.65;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 5);

    // Dynamic gaze tracking towards cursor
    const targetGazeX = gazeRef?.current?.x ?? state.pointer.x;
    const targetGazeY = gazeRef?.current?.y ?? state.pointer.y;

    currentGaze.current.x += (targetGazeX - currentGaze.current.x) * Math.min(1, delta * 8.5);
    currentGaze.current.y += (targetGazeY - currentGaze.current.y) * Math.min(1, delta * 8.5);

    const gx = currentGaze.current.x;
    const gy = currentGaze.current.y;

    const parallax = parallaxRef.current;
    if (parallax) {
      parallax.rotation.y += (gx * 0.20 - parallax.rotation.y) * Math.min(1, delta * 4.5);
      parallax.rotation.x += (-gy * 0.12 - parallax.rotation.x) * Math.min(1, delta * 4.5);
      parallax.position.x += (gx * 0.15 - parallax.position.x) * Math.min(1, delta * 3);
    }

    const hornSway = Math.sin(t * 0.5) * 0.03;
    if (leftHornRef.current) leftHornRef.current.rotation.z = hornSway;
    if (rightHornRef.current) rightHornRef.current.rotation.z = -hornSway;

    // Eyeball 3D rotation tracking cursor — synchronized conjugate gaze
    if (eyeRGroupRef.current) {
      eyeRGroupRef.current.rotation.y = gx * 0.32;
      eyeRGroupRef.current.rotation.x = -gy * 0.24;
    }
    if (eyeLGroupRef.current) {
      eyeLGroupRef.current.rotation.y = gx * 0.32;
      eyeLGroupRef.current.rotation.x = -gy * 0.24;
    }

    // Pupils translation within the eye sockets — synchronized tracking in unison
    const maxPupilX = 0.020;
    const maxPupilY = 0.016;
    if (pupilRRef.current) {
      pupilRRef.current.position.x = gx * maxPupilX;
      pupilRRef.current.position.y = gy * maxPupilY;
    }
    if (pupilLRef.current) {
      pupilLRef.current.position.x = gx * maxPupilX;
      pupilLRef.current.position.y = gy * maxPupilY;
    }

    // Dynamic white eye glow & illumination
    const eyeGlow = 1.2 + Math.sin(t * 1.6) * 0.25 + k * 2.5;
    if (irisRMatRef.current) irisRMatRef.current.emissiveIntensity = eyeGlow * 1.5;
    if (irisLMatRef.current) irisLMatRef.current.emissiveIntensity = eyeGlow * 1.5;
    if (scleraRMatRef.current) scleraRMatRef.current.emissiveIntensity = 0.2 + eyeGlow * 0.15;
    if (scleraLMatRef.current) scleraLMatRef.current.emissiveIntensity = 0.2 + eyeGlow * 0.15;

    if (flashRef.current) flashRef.current.intensity = k * 32;
  });

  return (
    <>
      <pointLight ref={flashRef} position={[0, 0.4, 2.4]} color="#00ff88" intensity={0} distance={10} decay={2} />
      <group ref={parallaxRef}>
        <group ref={rootRef} position={[0, -0.05, 0]}>
          {/* Skull with Bullish Stock Market Green Gradient */}
          <mesh position={[0, 0.18, -0.06]} scale={[1.06, 0.94, 0.97]}>
            <icosahedronGeometry args={[0.96, 1]} />
            <meshStandardMaterial
              map={bodyGradientTexture}
              color="#ffffff"
              emissive="#042617"
              emissiveIntensity={0.28}
              flatShading
              roughness={0.48}
              metalness={0.28}
            />
          </mesh>

          {/* Crown tuft — razor obsidian crest */}
          <mesh position={[0, 0.78, 0.18]} scale={[0.92, 0.6, 0.7]}>
            <icosahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color={OBSIDIAN_DEEP}
              emissive="#064e3b"
              emissiveIntensity={0.22}
              flatShading
              roughness={0.65}
              metalness={0.2}
            />
          </mesh>

          {/* Anatomical Bovine Muzzle & Realistic Curvature Sculpture */}
          <group position={[0, -0.52, 0.44]}>
            {/* Main muzzle volume (smooth, rounded maxillary bridge connecting smoothly to skull) */}
            <mesh position={[0, 0.05, 0.02]} scale={[1.02, 0.72, 0.88]}>
              <sphereGeometry args={[0.54, 32, 24]} />
              <meshStandardMaterial
                color={MUZZLE_DARK}
                emissive="#064e3b"
                emissiveIntensity={0.25}
                roughness={0.65}
                metalness={0.18}
              />
            </mesh>

            {/* Organic rounded bovine nasal pad (rhinarium) — Zero boxy corners */}
            <mesh position={[0, 0.02, 0.36]} scale={[0.96, 0.46, 0.4]}>
              <sphereGeometry args={[0.36, 32, 24]} />
              <meshStandardMaterial
                color="#030c06"
                emissive="#064e3b"
                emissiveIntensity={0.22}
                roughness={0.75}
                metalness={0.12}
              />
            </mesh>

            {/* Subtle central septum groove separating the nostrils */}
            <mesh position={[0, 0.02, 0.46]} scale={[0.025, 0.22, 0.06]}>
              <cylinderGeometry args={[1, 1, 1, 16]} />
              <meshStandardMaterial
                color="#010603"
                roughness={0.9}
                metalness={0}
              />
            </mesh>

            {/* Right Nostril (Anatomical Recessed Aperture & Curved Alar Rim) */}
            <group position={[0.16, 0.015, 0.44]} rotation={[0.16, 0.26, -0.24]}>
              {/* Recessed dark cavity */}
              <mesh scale={[0.06, 0.12, 0.05]}>
                <sphereGeometry args={[1, 16, 12]} />
                <meshStandardMaterial
                  color="#010402"
                  emissive="#021f14"
                  emissiveIntensity={0.2}
                  roughness={0.95}
                  metalness={0}
                />
              </mesh>
              {/* Smooth curved nostril rim / alar fold */}
              <mesh position={[0.02, 0.02, 0.01]} rotation={[0, 0, 0.2]} scale={[0.038, 0.11, 0.03]}>
                <sphereGeometry args={[1, 16, 12]} />
                <meshStandardMaterial
                  color="#051f12"
                  emissive="#059669"
                  emissiveIntensity={0.3}
                  roughness={0.55}
                  metalness={0.2}
                />
              </mesh>
            </group>

            {/* Left Nostril (Anatomical Recessed Aperture & Curved Alar Rim) */}
            <group position={[-0.16, 0.015, 0.44]} rotation={[0.16, -0.26, 0.24]}>
              {/* Recessed dark cavity */}
              <mesh scale={[0.06, 0.12, 0.05]}>
                <sphereGeometry args={[1, 16, 12]} />
                <meshStandardMaterial
                  color="#010402"
                  emissive="#021f14"
                  emissiveIntensity={0.2}
                  roughness={0.95}
                  metalness={0}
                />
              </mesh>
              {/* Smooth curved nostril rim / alar fold */}
              <mesh position={[-0.02, 0.02, 0.01]} rotation={[0, 0, -0.2]} scale={[0.038, 0.11, 0.03]}>
                <sphereGeometry args={[1, 16, 12]} />
                <meshStandardMaterial
                  color="#051f12"
                  emissive="#059669"
                  emissiveIntensity={0.3}
                  roughness={0.55}
                  metalness={0.2}
                />
              </mesh>
            </group>

            {/* Upper lip & chin cushion — Smooth organic curvature */}
            <mesh position={[0, -0.19, 0.28]} scale={[0.9, 0.32, 0.44]}>
              <sphereGeometry args={[0.34, 32, 20]} />
              <meshStandardMaterial
                color="#030e07"
                emissive="#064e3b"
                emissiveIntensity={0.18}
                roughness={0.7}
                metalness={0.12}
              />
            </mesh>

            {/* Authentic Bull Nose Ring:
                - Positioned in front of the nasal pad surface (z=0.52) so it is visible
                - Tilted slightly forward (~18°) the way a real septum ring hangs
                - Upper arc appears to pierce through the septum, lower arc hangs freely
            */}
            <group position={[0, -0.06, 0.52]} rotation={[0.30, 0, 0]}>
              {/* Main Ring — tighter radius so it sits snugly against the septum */}
              <mesh>
                <torusGeometry args={[0.105, 0.020, 20, 48]} />
                <meshStandardMaterial
                  color="#f59e0b"
                  emissive="#78350f"
                  emissiveIntensity={0.28}
                  metalness={0.96}
                  roughness={0.16}
                />
              </mesh>
              {/* Piercing clasp bead — sits right at the top of the ring inside the septum */}
              <mesh position={[0, 0.105, 0]}>
                <sphereGeometry args={[0.024, 16, 16]} />
                <meshStandardMaterial
                  color="#fbbf24"
                  emissive="#92400e"
                  emissiveIntensity={0.35}
                  metalness={0.98}
                  roughness={0.12}
                />
              </mesh>
            </group>
          </group>

          {/* Supraorbital Bovine Brow Ridges (Anatomical frame, seamlessly integrated into skull) */}
          <mesh position={[0.36, 0.31, 0.68]} rotation={[-0.16, 0.18, -0.2]} scale={[0.13, 0.042, 0.07]}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#020a05" emissive="#064e3b" emissiveIntensity={0.18} roughness={0.7} metalness={0.15} />
          </mesh>
          <mesh position={[-0.36, 0.31, 0.68]} rotation={[-0.16, -0.18, 0.2]} scale={[0.13, 0.042, 0.07]}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#020a05" emissive="#064e3b" emissiveIntensity={0.18} roughness={0.7} metalness={0.15} />
          </mesh>

          {/* Eyes with Dynamic Cursor Tracking — Luminous White Eye & Piercing Black Pupil */}
          {/* Right Eye */}
          <group ref={eyeRGroupRef} position={[0.36, 0.24, 0.72]}>
            {/* Eye socket backing — dark anatomical frame */}
            <mesh position={[0, 0, -0.01]} scale={[0.98, 0.88, 0.7]}>
              <sphereGeometry args={[0.088, 18, 14]} />
              <meshStandardMaterial color="#020a05" emissive="#064e3b" emissiveIntensity={0.18} roughness={0.7} metalness={0.15} />
            </mesh>
            {/* Sclera / clean luminous white eyeball base */}
            <mesh position={[0, 0, 0.015]} scale={[1.05, 0.85, 0.6]}>
              <sphereGeometry args={[0.088, 16, 12]} />
              <meshStandardMaterial
                ref={scleraRMatRef}
                color="#ffffff"
                emissive="#f1f5f9"
                emissiveIntensity={0.25}
                roughness={0.2}
                toneMapped={false}
              />
            </mesh>
            {/* Moving Pupil & Iris */}
            <group ref={pupilRRef} position={[0, 0, 0.05]}>
              {/* Luminous White Iris Area Surrounding the Center Pupil */}
              <mesh scale={[1, 1, 0.5]}>
                <sphereGeometry args={[0.048, 14, 10]} />
                <meshStandardMaterial
                  ref={irisRMatRef}
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={1.8}
                  roughness={0.15}
                  toneMapped={false}
                />
              </mesh>
              {/* Intense Dark Center Pupil */}
              <mesh position={[0, 0, 0.018]} scale={[0.7, 1.25, 0.4]}>
                <sphereGeometry args={[0.028, 10, 8]} />
                <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.1} />
              </mesh>
              {/* Specular Catchlight */}
              <mesh position={[0.014, 0.016, 0.032]}>
                <sphereGeometry args={[0.009, 8, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          </group>

          {/* Left Eye */}
          <group ref={eyeLGroupRef} position={[-0.36, 0.24, 0.72]}>
            {/* Eye socket backing — dark anatomical frame */}
            <mesh position={[0, 0, -0.01]} scale={[0.98, 0.88, 0.7]}>
              <sphereGeometry args={[0.088, 18, 14]} />
              <meshStandardMaterial color="#020a05" emissive="#064e3b" emissiveIntensity={0.18} roughness={0.7} metalness={0.15} />
            </mesh>
            {/* Sclera / clean luminous white eyeball base */}
            <mesh position={[0, 0, 0.015]} scale={[1.05, 0.85, 0.6]}>
              <sphereGeometry args={[0.088, 16, 12]} />
              <meshStandardMaterial
                ref={scleraLMatRef}
                color="#ffffff"
                emissive="#f1f5f9"
                emissiveIntensity={0.25}
                roughness={0.2}
                toneMapped={false}
              />
            </mesh>
            {/* Moving Pupil & Iris */}
            <group ref={pupilLRef} position={[0, 0, 0.05]}>
              {/* Luminous White Iris Area Surrounding the Center Pupil */}
              <mesh scale={[1, 1, 0.5]}>
                <sphereGeometry args={[0.048, 14, 10]} />
                <meshStandardMaterial
                  ref={irisLMatRef}
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={1.8}
                  roughness={0.15}
                  toneMapped={false}
                />
              </mesh>
              {/* Intense Dark Center Pupil */}
              <mesh position={[0, 0, 0.018]} scale={[0.7, 1.25, 0.4]}>
                <sphereGeometry args={[0.028, 10, 8]} />
                <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.1} />
              </mesh>
              {/* Specular Catchlight */}
              <mesh position={[0.014, 0.016, 0.032]}>
                <sphereGeometry args={[0.009, 8, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          </group>

          {/* Ears */}
          <mesh position={[0.72, 0.3, 0.02]} rotation={[0.25, 0.15, -0.95]} scale={[0.6, 0.34, 0.85]}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={OBSIDIAN} emissive="#064e3b" emissiveIntensity={0.2} flatShading roughness={0.65} metalness={0.18} />
          </mesh>
          <mesh position={[-0.72, 0.3, 0.02]} rotation={[0.25, -0.15, 0.95]} scale={[0.6, 0.34, 0.85]}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={OBSIDIAN} emissive="#064e3b" emissiveIntensity={0.2} flatShading roughness={0.65} metalness={0.18} />
          </mesh>

          {/* Horns — Full Solid Black, No Gradient */}
          <group ref={rightHornRef}>
            <mesh geometry={rightHornGeometry}>
              <meshStandardMaterial
                color="#050706"
                emissive="#000000"
                emissiveIntensity={0}
                flatShading
                roughness={0.28}
                metalness={0.65}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
          <group ref={leftHornRef}>
            <mesh geometry={leftHornGeometry}>
              <meshStandardMaterial
                color="#050706"
                emissive="#000000"
                emissiveIntensity={0}
                flatShading
                roughness={0.28}
                metalness={0.65}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Pedestal */}
          <mesh position={[0, -1.24, -0.05]}>
            <cylinderGeometry args={[0.64, 0.74, 0.3, 20]} />
            <meshStandardMaterial color="#030b06" flatShading roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[0, -1.07, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.014, 8, 60]} />
            <meshStandardMaterial color="#041f12" emissive={CANDLE_GREEN_ELECTRIC} emissiveIntensity={1.3} roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Orbiting coins (Stock Market Green Alpha Theme)                     */
/* ------------------------------------------------------------------ */

function Coins({ animated }: CoinsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const coins = useMemo(
    () => [
      { r: 1.62, y: 0.95, phase: 0.4, speed: 0.34, tiltX: 1.35, spin: 2.1, radius: 0.15, upright: true, color: CANDLE_GREEN_ELECTRIC, emissive: "#059669" },
      { r: 1.84, y: 0.4, phase: 2.2, speed: 0.26, tiltX: 0.22, spin: 0.55, radius: 0.19, upright: false, color: "#041a10", emissive: "#047857" },
      { r: 1.55, y: 1.25, phase: 4.4, speed: 0.3, tiltX: 0.18, spin: 0.7, radius: 0.13, upright: false, color: BULL_GREEN_BRIGHT, emissive: "#10b981" },
      { r: 1.95, y: 1.1, phase: 5.6, speed: 0.24, tiltX: 0.3, spin: 0.48, radius: 0.16, upright: false, color: "#020f07", emissive: "#064e3b" },
    ],
    [],
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || !animated) return;
    const t = state.clock.elapsedTime;
    group.children.forEach((child, i) => {
      const spec = coins[i];
      const angle = spec.phase + t * spec.speed;
      child.position.set(
        Math.cos(angle) * spec.r,
        spec.y + Math.sin(t * 0.65 + spec.phase * 1.7) * 0.08,
        Math.sin(angle) * spec.r * 0.6,
      );
      const spinMesh = child.children[0] as THREE.Mesh;
      if (spec.upright) {
        spinMesh.rotation.y = t * spec.spin;
      } else {
        spinMesh.rotation.y = t * spec.spin;
        child.rotation.z = Math.sin(t * 0.5 + spec.phase) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {coins.map((spec, i) => (
        <group key={i} rotation={[spec.tiltX, 0, 0]}>
          <mesh rotation={spec.upright ? [0, 0, 0] : [0.12, 0.35, 0.05]}>
            <cylinderGeometry args={[spec.radius, spec.radius, 0.045, 14]} />
            <meshStandardMaterial
              color={spec.color}
              emissive={spec.emissive}
              emissiveIntensity={0.3}
              flatShading
              roughness={0.28}
              metalness={0.45}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */

function Lights() {
  const rimA = useRef<THREE.DirectionalLight>(null);
  const underGlow = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (rimA.current) {
      rimA.current.intensity = 2.9 + Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
    }
    if (underGlow.current) {
      underGlow.current.intensity = 1.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });
  return (
    <>
      <ambientLight intensity={0.45} color="#04150c" />
      <directionalLight position={[-3.2, 4.2, 3.4]} intensity={1.35} color="#f0fdf4" />
      {/* Intense stock market candlestick green rim light */}
      <directionalLight ref={rimA} position={[3.2, 2.0, -2.4]} intensity={2.9} color="#10b981" />
      <directionalLight position={[-2.8, 1.4, -2.2]} intensity={1.2} color="#059669" />
      {/* Bullish electric green underglow */}
      <pointLight ref={underGlow} position={[0, -1.2, 2.2]} intensity={1.4} color="#00dc82" distance={8} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas wrapper — pause offscreen, reduced motion, WebGL fallback     */
/* ------------------------------------------------------------------ */

export default function BullCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const windowGaze = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Full-viewport global cursor tracking so the eyes track anywhere the user moves
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const el = wrapperRef.current;
      if (!el) {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -((e.clientY / window.innerHeight) * 2 - 1);
        windowGaze.current = { x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) };
        return;
      }
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42;

      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const deltaY = -(e.clientY - centerY) / (window.innerHeight * 0.5);

      windowGaze.current = {
        x: Math.max(-1.15, Math.min(1.15, deltaX)),
        y: Math.max(-1.15, Math.min(1.15, deltaY)),
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // IntersectionObserver: stop rendering when scrolled out of view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="hero-bull-canvas"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("bull:charge"));
        }
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.1, 5.15], fov: 34, near: 0.1, far: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        frameloop={visible ? "always" : "never"}
      >
        <Lights />
        <Bull animated={!reduced} gazeRef={windowGaze} />
        <Coins animated={!reduced} />
      </Canvas>
    </div>
  );
}
