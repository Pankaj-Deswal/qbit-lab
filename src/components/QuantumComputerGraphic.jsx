export default function QuantumComputerGraphic() {
  return <svg className="quantum-graphic" viewBox="0 0 600 520" role="img" aria-labelledby="computer-title computer-description">
    <title id="computer-title">Quantum computer illustration</title>
    <desc id="computer-description">A stylized gold dilution refrigerator with stacked cooling plates, suspended wiring, and a glowing quantum processor beneath it.</desc>
    <defs>
      <linearGradient id="gold"><stop stopColor="#8a5731"/><stop offset=".45" stopColor="#ffe1a0"/><stop offset="1" stopColor="#ac773e"/></linearGradient>
      <radialGradient id="halo"><stop stopColor="#8065d2" stopOpacity=".45"/><stop offset="1" stopColor="#8065d2" stopOpacity="0"/></radialGradient>
      <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M 36 0 L 0 0 0 36" fill="none" stroke="#bda9ee" strokeOpacity=".07"/></pattern>
    </defs>
    <rect width="600" height="520" fill="url(#grid)" rx="24"/>
    <ellipse cx="300" cy="290" rx="265" ry="230" fill="url(#halo)"/>
    <g fill="none" stroke="#9d8bc4" strokeOpacity=".35"><ellipse cx="300" cy="443" rx="205" ry="48"/><ellipse cx="300" cy="443" rx="150" ry="30"/><path d="M40 170h70l40 40M490 290h70M75 360h65"/></g>
    <g stroke="url(#gold)" fill="none" strokeWidth="5">{[205, 245, 285, 325, 365, 395].map((x, i) => <path key={x} d={`M${x} 78 V${150 + i * 8} Q${x - 24} 205 ${x} 242 V320 Q${x + 15} 350 300 402`} />)}</g>
    {[85, 175, 265, 340].map((y, i) => <g key={y}>
      <path d={`M${160 + i * 18} ${y}v15a${140 - i * 18} 30 0 0 0 ${280 - i * 36} 0v-15`} fill="url(#gold)"/>
      <ellipse cx="300" cy={y} rx={140 - i * 18} ry="30" fill="url(#gold)" stroke="#ffe5b3" strokeWidth="1.5"/>
      <ellipse cx="300" cy={y} rx={112 - i * 18} ry="19" fill="#422f29" fillOpacity=".55"/>
      {[0, 1, 2, 3, 4].map(n => <circle key={n} cx={225 + n * 37} cy={y} r="4" fill="#ffe7b2"/>)}
    </g>)}
    <path d="M190 83v259M410 83v259" stroke="#c5a478" strokeWidth="7"/>
    <path d="M300 365v40" stroke="#e5bd80" strokeWidth="10"/>
    <path d="m300 393 44 25-44 26-44-26Z" fill="#b29ae8" stroke="#eee1ff" strokeWidth="2"/>
    <path d="m300 403 26 15-26 15-26-15Z" fill="#302846"/>
    <g fill="#d7baff">{[[100,170],[500,290],[140,360],[440,420]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4"/>)}</g>
    <text x="300" y="490" textAnchor="middle" fill="#b5a4ce" fontSize="10" letterSpacing="3">QUANTUM PROCESSOR · CONCEPT ILLUSTRATION</text>
  </svg>;
}
