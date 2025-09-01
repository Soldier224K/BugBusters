import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * =============================
 * AI Satellite Governance System (Frontend)
 * =============================
 * Features:
 * - Animated satellite orbiting a globe
 * - Tech grid background & cloud parallax
 * - Real-time metrics, policy toggles, and event log
 * - Modular & structured code for clarity
 */

// =============================
// Main Component
// =============================
export default function AISatelliteGovernanceUI() {
  // Motion values for orbit
  const angle = useMotionValue(0);
  const cloudAngle = useMotionValue(0);

  // Animate satellite orbit
  useEffect(() => {
    const controls = animate(angle, 360, {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [angle]);

  // Animate cloud rotation
  useEffect(() => {
    const controls = animate(cloudAngle, 360, {
      duration: 120,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [cloudAngle]);

  // Orbit calculations
  const radius = 140;
  const x = useTransform(angle, (a) => radius * Math.cos((a * Math.PI) / 180));
  const y = useTransform(angle, (a) => radius * Math.sin((a * Math.PI) / 180));

  // Mock Metrics
  const metrics = useMemo(
    () => [
      { label: "Satellites Online", value: 42 },
      { label: "Policy Checks/min", value: 1287 },
      { label: "Anomalies (24h)", value: 3 },
      { label: "Uplink Health", value: "99.97%" },
    ],
    []
  );

  // Mock Event Logs
  const logs = useMemo(
    () => [
      {
        time: "17:05:12 IST",
        text: "Policy #AIG-412 auto-applied to high-res stream over Mumbai corridor.",
      },
      { time: "16:58:44 IST", text: "Edge redaction model updated to v2.9 (on-orbit)." },
      { time: "16:22:13 IST", text: "Geo-fence sync complete for NDZ sectors (India)." },
      { time: "15:47:01 IST", text: "Telemetry drift compensated via Kalman fusion (L2 relay)." },
      { time: "14:33:55 IST", text: "Human-in-the-loop review cleared 2 flagged events." },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      <TopNav />
      <section className="relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <TechGrid />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <OrbitGlobe x={x} y={y} cloudAngle={cloudAngle} />
            <ControlPanel metrics={metrics} logs={logs} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// =============================
// Subcomponents
// =============================

function TopNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-cyan-400/80 to-fuchsia-500/80 grid place-items-center shadow-[0_0_60px_-10px] shadow-cyan-400/40">
            <SatelliteIcon />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              AI Satellite Governance System
            </h1>
            <p className="text-xs md:text-sm text-slate-400 -mt-0.5">
              Real‑time policy, privacy, and safety orchestration for orbital sensors
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs">Pause Orbit</button>
          <button className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs shadow-[0_0_50px_-15px] shadow-cyan-400/70">Emergency Halt</button>
        </div>
      </div>
    </header>
  );
}

function OrbitGlobe({ x, y, cloudAngle }) {
  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-6 overflow-hidden shadow-xl shadow-cyan-500/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Orbital Telemetry</h2>
        <div className="text-xs text-slate-400">Live • 60 fps</div>
      </div>
      <div className="relative aspect-square w-full grid place-items-center">
        <motion.div
          className="relative h-80 w-80 md:h-[26rem] md:w-[26rem] rounded-full"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 30%, rgba(8,145,178,0.25), rgba(59,130,246,0.08) 35%, rgba(15,23,42,1) 70%)",
            boxShadow:
              "inset 0 0 80px rgba(59,130,246,0.15), 0 0 120px rgba(34,211,238,0.12)",
          }}
        >
          <SVGGraticule />
          <motion.div className="absolute inset-0 rounded-full opacity-30" style={{ rotate: cloudAngle }}>
            <CloudBands />
          </motion.div>
          <OrbitPath />
          <motion.div
            aria-label="Satellite"
            className="absolute size-6 md:size-7 rounded-full bg-cyan-400 ring-2 ring-slate-900 shadow-[0_0_30px_-8px] shadow-cyan-400 grid place-items-center"
            style={{ left: "50%", top: "50%", x, y, translateX: "-50%", translateY: "-50%" }}
          >
            <SatelliteIcon />
          </motion.div>
        </motion.div>
      </div>
      <Legend />
    </div>
  );
}

function ControlPanel({ metrics, logs }) {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] gap-6">
      <MetricsGrid metrics={metrics} />
      <PolicyControls />
      <EventLog logs={logs} />
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} OrbitOps • AI Governance Mesh for Earth Observation
      </div>
    </footer>
  );
}

// =============================
// Smaller Elements
// =============================

function Toggle({ label, defaultChecked = false }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`group flex items-center justify-between rounded-2xl border p-3 transition-all text-sm shadow-inner ${
        on
          ? "bg-slate-800/60 border-emerald-600/50 hover:bg-slate-800"
          : "bg-slate-900/40 border-slate-700 hover:bg-slate-800/60"
      }`}
      aria-pressed={on}
    >
      <span className="text-slate-200">{label}</span>
      <span className={`h-5 w-10 rounded-full relative transition-colors ${on ? "bg-emerald-500/80" : "bg-slate-600/80"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "right-0.5" : "left-0.5"}`} />
      </span>
    </button>
  );
}

function SVGGraticule() {
  const lines = [];
  for (let i = -60; i <= 60; i += 20) {
    lines.push(<circle key={`lat-${i}`} className="fill-none stroke-sky-400/20" strokeWidth="1" cx="50%" cy="50%" r={`calc(40% + ${i / 2}%)`} />);
  }
  for (let i = 0; i < 12; i++) {
    const rot = (i * 360) / 12;
    lines.push(<line key={`lon-${i}`} className="stroke-sky-300/15" strokeWidth="1" x1="50%" y1="10%" x2="50%" y2="90%" transform={`rotate(${rot} 50% 50%)`} />);
  }
  return <svg className="absolute inset-0 w-full h-full">{lines}</svg>;
}

function CloudBands() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      {[...Array(6)].map((_, i) => (
        <ellipse key={i} cx="50" cy="50" rx={45 - i * 6} ry={12 - i} fill="none" stroke="url(#cloudGrad)" strokeWidth="0.6" className="opacity-70" />
      ))}
      <defs>
        <linearGradient id="cloudGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(148,163,184,0)" />
          <stop offset="50%" stopColor="rgba(203,213,225,0.6)" />
          <stop offset="100%" stopColor="rgba(148,163,184,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function OrbitPath() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
      <g transform="translate(300,300)">
        <ellipse rx="160" ry="160" className="fill-none stroke-cyan-400/30" strokeWidth="1.5" strokeDasharray="4 6" />
      </g>
    </svg>
  );
}

function SatelliteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" className="text-slate-900">
      <path d="M12 8l2 2-2 2-2-2 2-2Z" fill="currentColor" />
      <path d="M4 6l4 4M20 6l-4 4M6 20l4-4M18 20l-4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TechGrid() {
  return (
    <svg className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" stroke="rgba(51,65,85,0.45)" strokeWidth="1" />
        </pattern>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.06)" />
          <stop offset="100%" stopColor="rgba(15,23,42,0.3)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#p)" />
      <rect width="100%" height="100%" fill="url(#g)" />
      <g opacity="0.08">
        {[...Array(30)].map((_, i) => (
          <rect key={i} x="0" y={i * 24} width="100%" height="1" fill="white" />
        ))}
      </g>
    </svg>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
      <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400"></span>Active Satellite</span>
      <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-400"></span>NDZ Boundary</span>
      <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"></span>Compliant Stream</span>
    </div>
  );
}

function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-inner shadow-slate-950/40">
          <div className="text-[0.7rem] uppercase tracking-wider text-slate-400">{m.label}</div>
          <div className="mt-1 text-2xl font-semibold">{m.value}</div>
        </div>
      ))}
    </div>
  );
}

function PolicyControls() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Policy Orchestration</h3>
        <span className="text-xs text-slate-400">Zero‑trust • Verifiable</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Toggle label="On‑orbit Redaction" defaultChecked />
        <Toggle label="Geo‑Fence Enforcement" defaultChecked />
        <Toggle label="PII Leak Guard" defaultChecked />
        <Toggle label="Human‑in‑Loop" />
        <Toggle label="Audit Trail Hashing" defaultChecked />
        <Toggle label="Emergency Shutdown Ready" defaultChecked />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm">Apply Changes</button>
        <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm">Simulate</button>
      </div>
    </div>
  );
}

function EventLog({ logs }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Event Log</h3>
        <span className="text-xs text-slate-400">Recent • {logs.length}</span>
      </div>
      <ul className="space-y-2 text-sm">
        {logs.map((l, i) => (
