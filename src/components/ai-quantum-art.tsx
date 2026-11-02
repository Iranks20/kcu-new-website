// Generated artwork for the AI & Quantum hero slide: a neural network flowing into a quantum
// (Bloch sphere / orbital) core, drawn in SVG so it stays crisp on any screen and weighs a few KB.
// Palette: brand green (#0b6232 family), brand gold (#ffc66b), white — no secondary greens.

const layers = [
  { x: 880, ys: [250, 370, 490, 610, 730] },
  { x: 1010, ys: [200, 320, 440, 560, 680, 800] },
  { x: 1140, ys: [290, 410, 530, 650] },
];

const traces = [
  "M760 150 H860 V210 H940",
  "M760 860 H900 V800 H980",
  "M1300 120 V180 H1400 V240",
  "M1520 520 H1450 V600 H1380",
  "M1260 820 V760 H1360",
];

export function AiQuantumArt({ className }: { className?: string }) {
  const coreX = 1290;
  const coreY = 470;

  return (
    <svg viewBox="0 0 1600 960" preserveAspectRatio="xMaxYMid slice" className={className} role="img" aria-label="Illustration of an artificial intelligence neural network connected to a quantum computing core">
      <defs>
        <linearGradient id="aq-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#03200f" />
          <stop offset="0.55" stopColor="#06371c" />
          <stop offset="1" stopColor="#0a1d3a" />
        </linearGradient>
        <radialGradient id="aq-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffc66b" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#0b6232" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0b6232" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="aq-gold" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffc66b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffc66b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="aq-core" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#ffc66b" />
          <stop offset="1" stopColor="#0b6232" />
        </radialGradient>
        <pattern id="aq-dots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#ffffff" opacity="0.14" />
        </pattern>
        <filter id="aq-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="1600" height="960" fill="url(#aq-bg)" />
      <rect width="1600" height="960" fill="url(#aq-dots)" />
      <circle cx="1480" cy="140" r="320" fill="url(#aq-gold)" />
      <circle cx={coreX} cy={coreY} r="430" fill="url(#aq-glow)" />

      {/* Circuit traces */}
      <g stroke="#ffffff" strokeOpacity="0.28" strokeWidth="2" fill="none">
        {traces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#ffc66b" opacity="0.85">
        {[[940, 210], [980, 800], [1400, 240], [1380, 600], [1360, 760]].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" rx="2" />
        ))}
      </g>

      {/* Neural network */}
      <g stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.22">
        {layers.slice(0, -1).flatMap((layer, li) =>
          layer.ys.flatMap((y1) => layers[li + 1].ys.map((y2) => <line key={`${li}-${y1}-${y2}`} x1={layer.x} y1={y1} x2={layers[li + 1].x} y2={y2} />)),
        )}
        {layers[2].ys.map((y) => (
          <line key={`c-${y}`} x1={layers[2].x} y1={y} x2={coreX} y2={coreY} strokeOpacity="0.35" />
        ))}
      </g>
      {/* Signals travelling through the network */}
      <g fill="#ffc66b">
        {[
          { path: `M880 370 L1010 440 L1140 410 L${coreX} ${coreY}`, dur: "3.2s", begin: "0s" },
          { path: `M880 610 L1010 560 L1140 530 L${coreX} ${coreY}`, dur: "3.6s", begin: "1.1s" },
          { path: `M880 250 L1010 320 L1140 290 L${coreX} ${coreY}`, dur: "4s", begin: "2s" },
          { path: `M880 730 L1010 680 L1140 650 L${coreX} ${coreY}`, dur: "3.4s", begin: "0.6s" },
        ].map((s) => (
          <circle key={s.path} r="4.5">
            <animateMotion path={s.path} dur={s.dur} begin={s.begin} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur={s.dur} begin={s.begin} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      <g>
        {layers.flatMap((layer) =>
          layer.ys.map((y) => (
            <g key={`${layer.x}-${y}`}>
              <circle cx={layer.x} cy={y} r="13" fill="#03200f" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" />
              <circle cx={layer.x} cy={y} r="5" fill="#ffc66b" />
            </g>
          )),
        )}
      </g>

      {/* Quantum core: Bloch sphere with orbiting qubits */}
      <g transform={`translate(${coreX} ${coreY})`}>
        <circle r="190" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
        <ellipse rx="190" ry="58" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="6 8" />
        <line x1="0" y1="-215" x2="0" y2="215" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
        <text x="12" y="-222" fill="#ffffff" fillOpacity="0.7" fontSize="26" fontFamily="ui-monospace, monospace">|0⟩</text>
        <text x="12" y="248" fill="#ffffff" fillOpacity="0.7" fontSize="26" fontFamily="ui-monospace, monospace">|1⟩</text>

        {[0, 60, 120].map((angle, i) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <ellipse rx="250" ry="78" fill="none" stroke={i === 1 ? "#ffc66b" : "#ffffff"} strokeOpacity="0.5" strokeWidth="2" />
            <circle r="9" fill={i === 1 ? "#ffc66b" : "#ffffff"}>
              <animateMotion dur={`${6 + i * 1.5}s`} repeatCount="indefinite" path="M250 0 A250 78 0 1 1 -250 0 A250 78 0 1 1 250 0" />
            </circle>
          </g>
        ))}

        {/* State vector */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-25;35;-25" dur="9s" repeatCount="indefinite" />
          <line x1="0" y1="0" x2="0" y2="-170" stroke="#ffc66b" strokeWidth="3" />
          <circle cy="-170" r="8" fill="#ffc66b" />
          <text x="16" y="-176" fill="#ffd48a" fontSize="24" fontFamily="ui-monospace, monospace">|ψ⟩</text>
        </g>

        <circle r="64" fill="#ffc66b" opacity="0.28" filter="url(#aq-blur)">
          <animate attributeName="r" values="58;74;58" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="46" fill="url(#aq-core)" />
      </g>

      {/* Floating notation */}
      <g fill="#ffffff" fillOpacity="0.35" fontFamily="ui-monospace, monospace" fontSize="20">
        <text x="1420" y="380">H|0⟩</text>
        <text x="1450" y="820">01101</text>
        <text x="830" y="130">∑ wᵢxᵢ + b</text>
        <text x="1500" y="680">qubit</text>
      </g>
    </svg>
  );
}
