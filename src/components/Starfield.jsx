const STAR_COLORS = ['#ffe680', '#6ee2ff', '#f5f2e9', '#b874ff'];
const COLS = 8;
const ROWS = 4;
const TOTAL_STARS = COLS * ROWS; // 32 ngôi sao phân bố tự nhiên, không bị dày đặc

// PRNG cố định để SSR và client render ra cùng một bầu trời sao không lệch hydration
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

const STARS = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const r = rand();
    const type = r < 0.55 ? 'sm' : r < 0.85 ? 'md' : 'lg';
    STARS.push({
      left: Number(((col + 0.12 + rand() * 0.76) * (100 / COLS)).toFixed(2)),
      top: Number(((row + 0.12 + rand() * 0.76) * (100 / ROWS)).toFixed(2)),
      color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
      type,
      animationType: rand() > 0.45 ? 'sparkle' : 'twinkle',
      duration: Number((2.4 + rand() * 2.8).toFixed(2)),
      delay: Number((-rand() * 5.5).toFixed(2)),
    });
  }
}

function StarIcon({ type }) {
  if (type === 'sm') {
    // Chữ thập pixel đơn giản 3x3 (+)
    return (
      <svg viewBox="0 0 6 6" aria-hidden="true">
        <rect x="2" y="0" width="2" height="6" fill="currentColor" />
        <rect x="0" y="2" width="6" height="2" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'md') {
    // Sao pixel chữ thập 4 cánh có tâm sáng trắng
    return (
      <svg viewBox="0 0 8 8" aria-hidden="true">
        <rect x="3" y="0" width="2" height="8" fill="currentColor" />
        <rect x="0" y="3" width="8" height="2" fill="currentColor" />
        <rect x="2" y="2" width="4" height="4" fill="currentColor" />
        <rect x="3" y="3" width="2" height="2" fill="#ffffff" />
      </svg>
    );
  }

  // Sao tinh tú rạng rỡ (diamond cross star ✦)
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <rect x="4" y="0" width="2" height="10" fill="currentColor" />
      <rect x="0" y="4" width="10" height="2" fill="currentColor" />
      <rect x="3" y="2" width="4" height="6" fill="currentColor" />
      <rect x="2" y="3" width="6" height="4" fill="currentColor" />
      <rect x="4" y="4" width="2" height="2" fill="#ffffff" />
    </svg>
  );
}

export default function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`pixel-star pixel-star--${s.type} pixel-star--${s.animationType}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            color: s.color,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <StarIcon type={s.type} />
        </span>
      ))}
    </div>
  );
}
