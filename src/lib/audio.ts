/**
 * Tactile Web Audio Engine for Investrow.
 * Zero external audio files — uses Web Audio API synthesis for micro-haptics.
 * Muted by default; respects user preference and saves state in localStorage.
 */

let audioCtx: AudioContext | null = null;
let isMuted = true;

// Initialize mute state from localStorage (default: muted)
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("investrow_audio");
  isMuted = saved !== "enabled";
}

const listeners = new Set<(muted: boolean) => void>();

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioEnabled(): boolean {
  return !isMuted;
}

export function toggleAudio(): boolean {
  isMuted = !isMuted;
  if (typeof window !== "undefined") {
    localStorage.setItem("investrow_audio", isMuted ? "muted" : "enabled");
    if (!isMuted) {
      getContext();
      playSwitch();
    }
  }
  listeners.forEach((fn) => fn(isMuted));
  return !isMuted;
}

export function subscribeAudio(listener: (muted: boolean) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Subtle hover tick */
export function playHover() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.008);

    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.012);
  } catch {
    // Graceful fallback
  }
}

/** Soft mechanical click for button presses */
export function playClick() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    // Pitch envelope: quick drop from 950Hz to 320Hz in 12ms
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.012);

    // Gain envelope: soft attack, fast decay
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  } catch {
    // Graceful fallback if audio context fails
  }
}

/** Subtle high-frequency tick for slider scrubbers */
let lastTickTime = 0;
export function playTick() {
  if (isMuted) return;
  const now = performance.now();
  // Throttle tick rate so fast dragging doesn't overwhelm
  if (now - lastTickTime < 45) return;
  lastTickTime = now;

  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const ctxNow = ctx.currentTime;

    osc.frequency.setValueAtTime(1400, ctxNow);
    osc.frequency.exponentialRampToValueAtTime(700, ctxNow + 0.008);

    gain.gain.setValueAtTime(0.025, ctxNow);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctxNow + 0.01);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctxNow);
    osc.stop(ctxNow + 0.012);
  } catch {
    // Graceful fallback
  }
}

/** Double-tone acoustic pop for mode switches or audio toggle */
export function playSwitch() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [
      { freq: 520, delay: 0 },
      { freq: 880, delay: 0.04 },
    ].forEach(({ freq, delay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.03, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.04);
    });
  } catch {
    // Graceful fallback
  }
}

/** Scramble glyph blip (subtle click for text decrypting) */
let lastScrambleTick = 0;
export function playScramble() {
  if (isMuted) return;
  const now = performance.now();
  if (now - lastScrambleTick < 60) return;
  lastScrambleTick = now;

  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const ctxNow = ctx.currentTime;

    osc.frequency.setValueAtTime(1100 + Math.random() * 400, ctxNow);

    gain.gain.setValueAtTime(0.012, ctxNow);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctxNow + 0.01);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctxNow);
    osc.stop(ctxNow + 0.012);
  } catch {
    // Graceful fallback
  }
}
