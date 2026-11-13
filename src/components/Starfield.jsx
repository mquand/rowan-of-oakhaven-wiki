const STAR_COLORS = ['#ffe680', '#6ee2ff', '#f5f2e9', '#b874ff'];
const STAR_COUNT = 48;

// PRNG cố định để SSR và client render ra cùng một bầu trời sao
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20261113);
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: rand() * 100,
  top: rand() * 100,
  color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
  size: rand() < 0.85 ? 2 : 3,
  duration: 2.4 + rand() * 3.2,
  delay: -rand() * 6,
}));

export default function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {STARS.map((s, i) => (
        <i
          key={i}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
