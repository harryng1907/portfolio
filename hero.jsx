// hero.jsx — three hero variants. Bold editorial direction.

function useTypewriter(words, { typeMs = 70, holdMs = 1400, deleteMs = 38 } = {}) {
  const [idx, setIdx] = React.useState(0);
  const [text, setText] = React.useState('');
  const [phase, setPhase] = React.useState('typing'); // typing | hold | deleting
  React.useEffect(() => {
    let to;
    const word = words[idx % words.length];
    if (phase === 'typing') {
      if (text.length < word.length) {
        to = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        to = setTimeout(() => setPhase('hold'), holdMs);
      }
    } else if (phase === 'hold') {
      to = setTimeout(() => setPhase('deleting'), holdMs);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        to = setTimeout(() => setText(text.slice(0, -1)), deleteMs);
      } else {
        setIdx(i => i + 1);
        setPhase('typing');
      }
    }
    return () => clearTimeout(to);
  }, [text, phase, idx, words, typeMs, holdMs, deleteMs]);
  return text;
}

function useCounter(target, { duration = 1400, startOn = true } = {}) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!startOn) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, startOn]);
  return v;
}

// ---------- Variant A: Editorial ----------
function HeroEditorial({ t, palette, fonts, density }) {
  const H = window.SITE.hero;
  const year = new Date().getFullYear();
  const first = t.name.split(' ')[0];
  const typed = useTypewriter(H.rotatingWords);
  return (
    <header className="hero" style={{
      paddingTop: density.hero, paddingBottom: density.hero,
    }}>
      <div className="container hero-grid" style={{
        display:'grid', gridTemplateColumns:'minmax(0, 1fr) auto', gap: 48, alignItems:'center',
      }}>
        <div className="reveal in">
          <div style={{
            fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: palette.mute, marginBottom: 28,
            display:'flex', alignItems:'center', gap: 10,
          }}>
            <span style={{ width: 22, height: 1, background: palette.mute }} />
            {H.eyebrow.replace('{year}', year)}
          </div>
          <h1 className="hero-headline" style={{
            fontFamily: fonts.display, fontWeight: 400, fontStyle:'italic',
            fontSize: 'clamp(64px, 11vw, 168px)', lineHeight: 0.92,
            margin: 0, letterSpacing: '-0.04em',
          }}>
            {H.greeting}<span style={{ color: palette.accent }}>.</span>
          </h1>
          <h2 className="hero-sub" style={{
            fontFamily: fonts.display, fontWeight: 500,
            fontSize: 'clamp(28px, 4.2vw, 56px)', lineHeight: 1.05,
            margin: '24px 0 0 0', letterSpacing: '-0.02em',
            textWrap:'balance',
          }}>
            {H.introLead.replace('{first}', first)}&nbsp;
            <span style={{ color: palette.accent, whiteSpace:'nowrap' }}>
              {typed}<span className="caret" />
            </span>
          </h2>
          <p style={{
            marginTop: 28, maxWidth: 560, fontSize: 17, lineHeight: 1.6,
            color: palette.mute,
          }}>
            {H.blurb}
          </p>
          <div className="hero-ctas" style={{ display:'flex', gap: 10, marginTop: 36, flexWrap:'wrap' }}>
            <a href={H.primaryCta.href} style={{
              padding:'12px 20px', background: palette.ink, color: palette.bg,
              fontSize: 14, fontWeight: 500, letterSpacing:'0.01em',
              borderRadius: 999, transition:'transform 160ms',
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform='none'}
            >{H.primaryCta.label}</a>
            <a href={H.secondaryCta.href} style={{
              padding:'12px 20px', border:`1px solid ${palette.line}`, color: palette.ink,
              fontSize: 14, fontWeight: 500, borderRadius: 999,
            }}>{H.secondaryCta.label}</a>
          </div>
        </div>

        {/* Circle accent (per hero concept #1) */}
        <div className="reveal in hero-circle" style={{ position:'relative', width: 220, height: 220, display:'grid', placeItems:'center' }}>
          <svg viewBox="0 0 220 220" width="220" height="220" style={{ position:'absolute', inset: 0 }}>
            <circle cx="110" cy="110" r="108" fill="none" stroke={palette.ink} strokeWidth="0.6" />
            <circle cx="110" cy="110" r="92"  fill="none" stroke={palette.line} strokeWidth="0.6" />
            <circle cx="110" cy="110" r="74"  fill="none" stroke={palette.line} strokeWidth="0.6" />
            <g style={{ transformOrigin:'110px 110px', animation:'spin 80s linear infinite' }}>
              {Array.from({length:24}).map((_,i) => {
                const a = (i/24) * Math.PI*2;
                const x1 = 110 + Math.cos(a) * 104;
                const y1 = 110 + Math.sin(a) * 104;
                const x2 = 110 + Math.cos(a) * (i % 6 === 0 ? 96 : 100);
                const y2 = 110 + Math.sin(a) * (i % 6 === 0 ? 96 : 100);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.ink} strokeWidth="0.6"/>;
              })}
            </g>
            {/* a single accent dot orbiting */}
            <g style={{ transformOrigin:'110px 110px', animation:'spin 18s linear infinite' }}>
              <circle cx="110" cy="2" r="3.5" fill={palette.accent} />
            </g>
          </svg>
          <div style={{
            fontFamily: fonts.mono, fontSize: 10, letterSpacing:'0.16em', textTransform:'uppercase',
            color: palette.mute, textAlign:'center',
          }}>
            n = 1<br/>
            <span style={{ color: palette.ink }}>this is me</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Variant B: Stats ----------
function HeroStats({ t, palette, fonts, density }) {
  const H = window.SITE.hero;
  const stats = H.stats;
  return (
    <header className="hero" style={{ paddingTop: density.hero, paddingBottom: density.hero }}>
      <div className="container">
        <div className="reveal in" style={{
          fontFamily: fonts.mono, fontSize: 12, letterSpacing:'0.16em',
          textTransform:'uppercase', color: palette.mute, marginBottom: 28,
        }}>
          {t.location} · {H.statusLine}
        </div>
        <h1 className="reveal in hero-headline" style={{
          fontFamily: fonts.display, fontWeight: 400, fontStyle:'italic',
          fontSize:'clamp(56px, 9vw, 140px)', lineHeight: 0.95, letterSpacing:'-0.04em',
          margin: 0,
        }}>
          {t.name}<span style={{ color: palette.accent }}>.</span>
        </h1>
        <p className="reveal in" style={{
          marginTop: 18, fontSize: 22, color: palette.mute, maxWidth: 720,
        }}>
          {t.tagline}
        </p>
        <div className="reveal in" style={{
          marginTop: 64, display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',
          borderTop: `1px solid ${palette.line}`,
        }}>
          {stats.map((s, i) => <StatCell key={i} {...s} palette={palette} fonts={fonts} />)}
        </div>
      </div>
    </header>
  );
}
function StatCell({ label, value, suffix, palette, fonts }) {
  const v = useCounter(value);
  return (
    <div style={{
      padding: '32px 24px 28px',
      borderRight: `1px solid ${palette.line}`,
      borderBottom: `1px solid ${palette.line}`,
    }}>
      <div style={{
        fontFamily: fonts.display, fontSize: 72, lineHeight: 1, letterSpacing:'-0.04em',
        fontWeight: 500,
      }}>
        {v}<span style={{ color: palette.accent, fontStyle:'italic' }}>{suffix}</span>
      </div>
      <div style={{
        marginTop: 12, fontFamily: fonts.mono, fontSize: 11,
        letterSpacing:'0.14em', textTransform:'uppercase', color: palette.mute,
      }}>{label}</div>
    </div>
  );
}

// ---------- Variant C: Chart ----------
function HeroChart({ t, palette, fonts, density }) {
  const data = React.useMemo(() => {
    // deterministic noisy upward line — feels like a real time series
    const n = 28, pts = [];
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1);
      const trend = Math.pow(x, 1.1);
      const wobble = (Math.sin(i * 1.7) * 0.06) + (Math.sin(i * 4.3) * 0.03);
      pts.push({ x, y: Math.max(0.05, Math.min(0.95, trend + wobble + 0.04)) });
    }
    return pts;
  }, []);
  const W = 720, H = 280;
  const path = data.map((p,i) => `${i?'L':'M'} ${p.x*W} ${(1-p.y)*H}`).join(' ');
  const cfg = window.SITE.hero;
  const [drawn, setDrawn] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const id = setTimeout(() => setDrawn(true), 120);
    return () => clearTimeout(id);
  }, []);
  const len = ref.current ? ref.current.getTotalLength() : 2000;

  return (
    <header className="hero" style={{ paddingTop: density.hero, paddingBottom: density.hero }}>
      <div className="container">
        <div className="reveal in" style={{
          fontFamily: fonts.mono, fontSize: 12, letterSpacing:'0.16em',
          textTransform:'uppercase', color: palette.mute, marginBottom: 22,
        }}>
          fig 1 · trajectory
        </div>
        <h1 className="reveal in hero-headline" style={{
          fontFamily: fonts.display, fontWeight: 500,
          fontSize:'clamp(48px, 7.4vw, 112px)', lineHeight: 1, letterSpacing:'-0.035em',
          margin: 0, maxWidth: 900,
        }}>
          {t.name}, <span style={{ fontStyle:'italic', color: palette.mute }}>{cfg.chartHeadlineLead}</span>{' '}
          <span style={{ color: palette.accent }}>{cfg.chartHeadlineFocus}</span>.
        </h1>
        <div className="reveal in" style={{ marginTop: 56 }}>
          <svg viewBox={`-12 -12 ${W+24} ${H+36}`} width="100%" style={{ maxHeight: 360 }}>
            {/* axes */}
            <line x1="0" y1={H} x2={W} y2={H} stroke={palette.line} strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="0" y2={H} stroke={palette.line} strokeWidth="0.5"/>
            {/* y gridlines */}
            {[0.25, 0.5, 0.75].map((g,i) => (
              <line key={i} x1="0" y1={H*g} x2={W} y2={H*g} stroke={palette.line} strokeDasharray="2 3" strokeWidth="0.5"/>
            ))}
            {/* the line */}
            <path
              ref={ref}
              d={path}
              fill="none"
              stroke={palette.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: len,
                strokeDashoffset: drawn ? 0 : len,
                transition: 'stroke-dashoffset 2200ms cubic-bezier(.25,.8,.3,1)',
              }}
            />
            {/* points */}
            {data.map((p,i) => (
              <circle key={i} cx={p.x*W} cy={(1-p.y)*H} r={i === data.length-1 ? 5 : 1.6}
                fill={i === data.length-1 ? palette.accent : palette.ink}
                style={{ opacity: drawn ? 1 : 0, transition: `opacity 400ms ${600 + i*40}ms` }}
              />
            ))}
            {/* terminal label */}
            <g transform={`translate(${data[data.length-1].x*W + 12}, ${(1-data[data.length-1].y)*H + 4})`}
               style={{ opacity: drawn ? 1 : 0, transition: 'opacity 600ms 1800ms' }}>
              <text fontFamily={fonts.mono} fontSize="11" fill={palette.ink}>you are here</text>
            </g>
            {/* x labels */}
            <text x="0" y={H+22} fontFamily={fonts.mono} fontSize="10" fill={palette.mute}>{cfg.chartStartYear}</text>
            <text x={W} y={H+22} textAnchor="end" fontFamily={fonts.mono} fontSize="10" fill={palette.mute}>{new Date().getFullYear()}</text>
          </svg>
        </div>
        <p className="reveal in" style={{
          marginTop: 36, fontSize: 18, color: palette.mute, maxWidth: 640,
        }}>{t.tagline}</p>
      </div>
    </header>
  );
}

function Hero(props) {
  if (props.t.heroVariant === 'stats') return <HeroStats {...props} />;
  if (props.t.heroVariant === 'chart') return <HeroChart {...props} />;
  return <HeroEditorial {...props} />;
}

Object.assign(window, { Hero, HeroEditorial, HeroStats, HeroChart, useTypewriter, useCounter });
