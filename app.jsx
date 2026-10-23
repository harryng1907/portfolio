// app.jsx — theme orchestration, App shell, Tweaks panel.
// All content + tokens come from the *.config.js files (window.THEME / SITE).

// ---------- Tokens, sourced from theme.config.js ----------
const PALETTES = window.THEME.palettes;
const PALETTE_KEYS = Object.keys(PALETTES);
const FONTS = window.THEME.fonts;
const FONT_KEYS = Object.keys(FONTS);
const DENSITY = window.THEME.density;

// ---------- Tweak defaults ----------
// Identity comes from site.config.js; theme defaults from theme.config.js.
// The Tweaks panel lets a visitor override any of these live for the session.
const TWEAK_DEFAULTS = {
  // Identity
  name:     window.SITE.identity.name,
  tagline:  window.SITE.identity.tagline,
  location: window.SITE.identity.location,
  linkedin: window.SITE.identity.linkedin,
  github:   window.SITE.identity.github,
  email:    window.SITE.identity.email,
  // Look & feel
  palette:     window.THEME.defaults.palette,
  font:        window.THEME.defaults.font,
  bgPattern:   window.THEME.defaults.background,
  // Layout
  heroVariant: window.THEME.defaults.heroVariant,
  cardLayout:  window.THEME.defaults.cardLayout,
  density:     window.THEME.defaults.density,
};

// ---------- Background patterns ----------
function BackgroundPattern({ kind, palette }) {
  if (kind === 'none') return null;
  const stroke = `color-mix(in srgb, ${palette.ink} 14%, transparent)`;
  const strokeStrong = `color-mix(in srgb, ${palette.ink} 26%, transparent)`;
  if (kind === 'dotgrid') {
    return (
      <svg className="bg-pattern" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={stroke} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    );
  }
  if (kind === 'grid') {
    return (
      <svg className="bg-pattern" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke={stroke} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );
  }
  if (kind === 'scatter') {
    // deterministic scatter — Gaussian-ish blob clusters
    const seedRand = (n) => { const x = Math.sin(n) * 10000; return x - Math.floor(x); };
    const pts = [];
    for (let i = 0; i < 220; i++) {
      const cx = 18 + seedRand(i*3.1) * 64;
      const cy = 12 + seedRand(i*7.7) * 76;
      const r = 0.6 + seedRand(i*11.3) * 1.4;
      pts.push(<circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r} fill={i % 9 === 0 ? strokeStrong : stroke} />);
    }
    return <svg className="bg-pattern" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{pts}</svg>;
  }
  if (kind === 'ruled') {
    return (
      <svg className="bg-pattern" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="ruled" width="100%" height="32" patternUnits="userSpaceOnUse">
            <line x1="0" y1="31.5" x2="100%" y2="31.5" stroke={stroke} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ruled)" />
      </svg>
    );
  }
  return null;
}

// ---------- Top nav ----------
const IS_PROJECTS_PAGE = window.PAGE === 'projects';

function Nav({ t, palette, onAdminOpen }) {
  const base = IS_PROJECTS_PAGE ? './' : '';
  const links = [
    { href: base + '#about', label: 'About' },
    { href: 'projects.html', label: 'Projects', active: IS_PROJECTS_PAGE },
    { href: base + '#skills', label: 'Skills' },
    { href: base + '#experience', label: 'Experience' },
    { href: base + '#contact', label: 'Contact' },
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 30,
      backdropFilter: 'blur(14px)',
      background: `color-mix(in srgb, ${palette.bg} 78%, transparent)`,
      borderBottom: `1px solid ${palette.line}`,
    }}>
      <div className="container nav-inner" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height: 64,
      }}>
        <a href={IS_PROJECTS_PAGE ? './' : '#top'} className="nav-brand" style={{
          fontFamily: FONTS[t.font].display, fontSize: 20, fontWeight: 600,
          letterSpacing: '-0.01em', display:'flex', alignItems:'center', gap: 10,
        }}>
          <span style={{
            width: 10, height: 10, borderRadius:'50%',
            background: palette.accent, display:'inline-block',
          }} />
          {t.name.split(' ')[0]}.
        </a>
        <div className="nav-right" style={{ display:'flex', alignItems:'center', gap: 4 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{
              padding: '8px 12px', fontSize: 13.5,
              color: l.active ? palette.ink : palette.mute, transition: 'color 160ms',
              fontWeight: l.active ? 600 : 400,
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = palette.ink}
              onMouseLeave={(e) => e.currentTarget.style.color = l.active ? palette.ink : palette.mute}
            >{l.label}</a>
          ))}
          {window.PROJECTS.list.some(p => p.locked) && <button
            aria-label="Admin"
            onClick={onAdminOpen}
            title="Admin: manage locked projects"
            style={{
              marginLeft: 8, width: 32, height: 32, borderRadius: 8,
              border: `1px solid ${palette.line}`, background: 'transparent',
              color: palette.mute, display:'grid', placeItems:'center',
              transition:'all 160ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = palette.ink; e.currentTarget.style.borderColor = palette.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = palette.mute; e.currentTarget.style.borderColor = palette.line; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>}
        </div>
      </div>
    </nav>
  );
}

// ---------- The app ----------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES.indigo;
  const fonts = FONTS[t.font] || FONTS.editorial;
  const density = DENSITY[t.density] || DENSITY.regular;

  // CSS custom properties live on :root so children can pick them up freely
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--bg', palette.bg);
    r.setProperty('--surface', palette.surface);
    r.setProperty('--ink', palette.ink);
    r.setProperty('--mute', palette.mute);
    r.setProperty('--line', palette.line);
    r.setProperty('--accent', palette.accent);
    r.setProperty('--accent-soft', palette.accentSoft);
    r.setProperty('--font-display', fonts.display);
    r.setProperty('--font-sans', fonts.body);
    r.setProperty('--font-mono', fonts.mono);
    document.body.style.background = palette.bg;
    document.body.style.color = palette.ink;
  }, [palette, fonts]);

  // Reveal-on-scroll
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [t.cardLayout, t.heroVariant, t.density, t.palette, t.font]);

  const [adminOpen, setAdminOpen] = React.useState(false);

  return (
    <div id="top" style={{ fontFamily: fonts.body, color: palette.ink, background: palette.bg, minHeight:'100vh' }}>
      <BackgroundPattern kind={t.bgPattern} palette={palette} />
      <Nav t={t} palette={palette} onAdminOpen={() => setAdminOpen(true)} />

      {IS_PROJECTS_PAGE ? (
        <Projects t={t} palette={palette} fonts={fonts} density={density} mode="all" />
      ) : (<>
        <Hero t={t} palette={palette} fonts={fonts} density={density} />
        <About t={t} palette={palette} fonts={fonts} density={density} />
        <Projects t={t} palette={palette} fonts={fonts} density={density} />
        <Skills t={t} palette={palette} fonts={fonts} density={density} />
        <Experience t={t} palette={palette} fonts={fonts} density={density} />
        <Education t={t} palette={palette} fonts={fonts} density={density} />
        <Contact t={t} palette={palette} fonts={fonts} density={density} />
      </>)}
      <Footer t={t} palette={palette} fonts={fonts} />

      {adminOpen && <AdminPanel palette={palette} fonts={fonts} onClose={() => setAdminOpen(false)} />}

      <TweaksPanel>
        <TweakSection label="Identity" />
        <TweakText  label="Name" value={t.name}     onChange={(v) => setTweak('name', v)} />
        <TweakText  label="Tagline" value={t.tagline} onChange={(v) => setTweak('tagline', v)} />
        <TweakText  label="Location" value={t.location} onChange={(v) => setTweak('location', v)} />
        <TweakText  label="LinkedIn" value={t.linkedin} onChange={(v) => setTweak('linkedin', v)} />
        <TweakText  label="GitHub"   value={t.github}   onChange={(v) => setTweak('github', v)} />
        <TweakText  label="Email"    value={t.email}    onChange={(v) => setTweak('email', v)} />

        <TweakSection label="Theme" />
        <TweakSelect label="Palette" value={t.palette}
          options={PALETTE_KEYS.map(k => ({ value: k, label: PALETTES[k].name }))}
          onChange={(v) => setTweak('palette', v)} />
        <TweakRadio label="Fonts" value={t.font}
          options={FONT_KEYS}
          onChange={(v) => setTweak('font', v)} />
        <TweakRadio label="Background" value={t.bgPattern}
          options={['none','dotgrid','grid','ruled','scatter']}
          onChange={(v) => setTweak('bgPattern', v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.heroVariant}
          options={['editorial','stats','chart']}
          onChange={(v) => setTweak('heroVariant', v)} />
        <TweakRadio label="Cards" value={t.cardLayout}
          options={['grid','list','asymmetric']}
          onChange={(v) => setTweak('cardLayout', v)} />
        <TweakRadio label="Density" value={t.density}
          options={['compact','regular','spacious']}
          onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Admin" />
        <TweakButton label="Manage locked projects" onClick={() => setAdminOpen(true)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
