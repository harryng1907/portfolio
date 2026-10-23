// projects.jsx — public + locked projects, case-study modal, admin panel.
// Data comes from window.PROJECTS (projects.config.js).

const PROJECT_LIST = window.PROJECTS.list;
const DEFAULT_PASSWORDS = window.PROJECTS.passwords;
const ADMIN_DEFAULT = window.PROJECTS.adminPassword;

// ---------- password helpers ----------
function getPasswords() {
  try {
    const stored = JSON.parse(localStorage.getItem('portfolio.passwords') || '{}');
    return { ...DEFAULT_PASSWORDS, ...stored };
  } catch { return { ...DEFAULT_PASSWORDS }; }
}
function setPassword(id, pw) {
  const all = getPasswords();
  all[id] = pw;
  localStorage.setItem('portfolio.passwords', JSON.stringify(all));
}
function getAdminPw() {
  return localStorage.getItem('portfolio.adminPw') || ADMIN_DEFAULT;
}
function setAdminPw(pw) { localStorage.setItem('portfolio.adminPw', pw); }
function getUnlocked() {
  try { return JSON.parse(sessionStorage.getItem('portfolio.unlocked') || '[]'); }
  catch { return []; }
}
function addUnlocked(id) {
  const u = getUnlocked();
  if (!u.includes(id)) { u.push(id); sessionStorage.setItem('portfolio.unlocked', JSON.stringify(u)); }
}

// ---------- Projects ----------
const PROJECT_CATEGORIES = [
  { key:'all', label:'All' },
  { key:'competition', label:'Competitions' },
  { key:'experience', label:'Work & study' },
  { key:'personal', label:'Personal' },
];

function Projects({ t, palette, fonts, density, mode = 'home' }) {
  const isAll = mode === 'all';
  const [filter, setFilter] = React.useState('all');
  const featured = PROJECT_LIST.filter(p => p.featured);
  const visible = isAll
    ? PROJECT_LIST.filter(p => filter === 'all' || p.category === filter)
    : (featured.length ? featured : PROJECT_LIST);
  const [openId, setOpenId] = React.useState(() => {
    const h = (window.location.hash || '').replace('#', '');
    return PROJECT_LIST.some(p => p.id === h) ? h : null;
  });
  const [unlockTarget, setUnlockTarget] = React.useState(null);
  const [unlocked, setUnlocked] = React.useState(getUnlocked());

  const tryOpen = (p) => {
    if (!p.locked || unlocked.includes(p.id)) {
      setOpenId(p.id);
      try { history.replaceState(null, '', '#' + p.id); } catch (e) {}
    } else {
      setUnlockTarget(p);
    }
  };
  const onUnlocked = (id) => {
    addUnlocked(id);
    setUnlocked(getUnlocked());
    setUnlockTarget(null);
    setOpenId(id);
  };

  const openProject = PROJECT_LIST.find(p => p.id === openId);

  return (
    <section id="projects" style={{ paddingTop: density.section, paddingBottom: density.section }}>
      <div className="container reveal">
        <SectionLabel num={isAll ? '—' : '02'} palette={palette} fonts={fonts}>{isAll ? 'All projects' : 'Selected projects'}</SectionLabel>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
          marginBottom: 40, gap: 24, flexWrap:'wrap',
        }}>
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 400, fontStyle:'italic',
            fontSize:'clamp(36px, 5vw, 64px)', lineHeight: 1.05, letterSpacing:'-0.02em',
            margin: 0, maxWidth: 720,
          }}>
            {isAll
              ? <>Everything I’ve built. <span style={{ color: palette.mute }}>Competition wins, internship work, and the side projects I make for fun.</span></>
              : <>A small, opinionated collection. <span style={{ color: palette.mute }}>Every one of these I can walk you through end to end.</span></>}
          </h2>
          {!isAll && (
            <a href="projects.html" style={{
              fontFamily: fonts.mono, fontSize: 12, color: palette.accent, letterSpacing:'0.1em',
              textTransform:'uppercase', borderBottom:`1px solid ${palette.accent}`, paddingBottom: 2,
            }}>All {PROJECT_LIST.length} projects →</a>
          )}
        </div>

        {isAll && (
          <div style={{ display:'flex', flexWrap:'wrap', gap: 8, marginBottom: 32 }}>
            {PROJECT_CATEGORIES.map(c => {
              const n = c.key === 'all' ? PROJECT_LIST.length : PROJECT_LIST.filter(p => p.category === c.key).length;
              const on = filter === c.key;
              return (
                <button key={c.key} onClick={() => setFilter(c.key)} style={{
                  padding:'8px 14px', borderRadius: 999, fontSize: 13.5,
                  border:`1px solid ${on ? palette.ink : palette.line}`,
                  background: on ? palette.ink : 'transparent', color: on ? palette.bg : palette.ink,
                }}>{c.label} <span style={{ opacity: 0.6, marginLeft: 4, fontFamily: fonts.mono, fontSize: 11.5 }}>{n}</span></button>
              );
            })}
          </div>
        )}

        <ProjectLayout
          layout={isAll ? 'grid' : t.cardLayout}
          projects={visible}
          unlocked={unlocked}
          onOpen={tryOpen}
          palette={palette} fonts={fonts}
        />
        {!isAll && (
          <div style={{ marginTop: 40, display:'flex', justifyContent:'center' }}>
            <a href="projects.html" style={{
              padding:'12px 22px', borderRadius: 999, fontSize: 14.5,
              border:`1px solid ${palette.ink}`, color: palette.ink,
            }}>See all {PROJECT_LIST.length} projects →</a>
          </div>
        )}
      </div>

      {openProject && (
        <CaseStudyModal
          project={openProject}
          palette={palette} fonts={fonts}
          onClose={() => { setOpenId(null); try { history.replaceState(null, '', window.location.pathname); } catch (e) {} }}
        />
      )}
      {unlockTarget && (
        <UnlockModal
          project={unlockTarget}
          palette={palette} fonts={fonts}
          onClose={() => setUnlockTarget(null)}
          onUnlocked={() => onUnlocked(unlockTarget.id)}
        />
      )}
    </section>
  );
}

function ProjectLayout({ layout, projects, unlocked, onOpen, palette, fonts }) {
  if (layout === 'list') {
    return (
      <div style={{ borderTop:`1px solid ${palette.line}` }}>
        {projects.map((p) => (
          <ProjectRow key={p.id} p={p} unlocked={unlocked.includes(p.id)}
                      palette={palette} fonts={fonts}
                      onOpen={() => onOpen(p)} />
        ))}
      </div>
    );
  }
  if (layout === 'grid') {
    return (
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20,
        alignItems:'start', rowGap: 44,
      }}>
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} size="normal" unlocked={unlocked.includes(p.id)}
                       palette={palette} fonts={fonts}
                       onOpen={() => onOpen(p)} />
        ))}
      </div>
    );
  }
  // asymmetric: first project wide, rest mixed
  return (
    <div className="proj-asym" style={{
      display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 20,
    }}>
      {projects.map((p, i) => {
        // span pattern: 6, 3, 3, 4, 2 — gives a deliberate rhythm
        const spans = [6, 3, 3, 4, 2];
        const span = spans[i] || 3;
        const size = span >= 6 ? 'feature' : span >= 4 ? 'wide' : 'normal';
        return (
          <div key={p.id} style={{ gridColumn:`span ${span}` }}>
            <ProjectCard p={p} size={size} unlocked={unlocked.includes(p.id)}
              palette={palette} fonts={fonts} onOpen={() => onOpen(p)} />
          </div>
        );
      })}
    </div>
  );
}

// Decorative visual that hints at the project's domain — striped placeholder.
function ProjectVisual({ accent, palette, fonts, locked, size, image, imagePosition, imageFit }) {
  if (image && !locked) {
    const h = size === 'feature' ? 280 : size === 'wide' ? 220 : 180;
    return (
      <div style={{
        position:'relative', width:'100%', height: h, borderRadius: 12, overflow:'hidden',
        border: `1px solid ${palette.line}`, background: imageFit === 'contain' ? '#fff' : palette.surface,
        padding: imageFit === 'contain' ? 10 : 0, boxSizing:'border-box',
      }}>
        <img src={image} alt="" loading="lazy" style={{
          width:'100%', height:'100%', objectFit: imageFit || 'cover', objectPosition: imagePosition || 'center top', display:'block',
        }} />
      </div>
    );
  }
  const stripe = `repeating-linear-gradient(135deg, ${palette.surface} 0 10px, color-mix(in srgb, ${palette.ink} 4%, ${palette.surface}) 10px 11px)`;
  const tall = size === 'feature' ? 280 : size === 'wide' ? 220 : 180;
  return (
    <div style={{
      position:'relative', width:'100%', height: tall, borderRadius: 12,
      background: stripe, overflow:'hidden',
      border: `1px solid ${palette.line}`,
    }}>
      {/* domain glyph */}
      <div style={{
        position:'absolute', inset:'0', display:'grid', placeItems:'center',
        color: locked ? palette.mute : palette.accent, opacity: 0.55,
      }}>
        {accent === 'bio' && (
          <svg width="60%" height="60%" viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="0.8">
            {/* DNA-ish helix */}
            {Array.from({length:9}).map((_,i) => {
              const x = 20 + i*20;
              const y1 = 60 + Math.sin(i*0.9) * 28;
              const y2 = 60 - Math.sin(i*0.9) * 28;
              return <g key={i}>
                <line x1={x} y1={y1} x2={x} y2={y2} />
                <circle cx={x} cy={y1} r="2.5" fill="currentColor" stroke="none"/>
                <circle cx={x} cy={y2} r="2.5" fill="currentColor" stroke="none"/>
              </g>;
            })}
          </svg>
        )}
        {accent === 'data' && (
          <svg width="70%" height="60%" viewBox="0 0 220 120" fill="none" stroke="currentColor" strokeWidth="0.8">
            {[20,50,80,110,140,170,200].map((x,i) => (
              <rect key={i} x={x} y={120 - (20 + Math.abs(Math.sin(i*1.3))*80)} width="14"
                    height={20 + Math.abs(Math.sin(i*1.3))*80} fill="currentColor" opacity="0.85"/>
            ))}
          </svg>
        )}
        {accent === 'energy' && (
          <svg width="80%" height="60%" viewBox="0 0 240 120" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M 10 80 Q 40 20, 70 60 T 130 50 T 190 40 T 230 70"/>
            <path d="M 10 100 Q 40 70, 70 90 T 130 80 T 190 70 T 230 95" opacity="0.4"/>
          </svg>
        )}
        {accent === 'client' && (
          <svg width="55%" height="55%" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8">
            {/* clusters */}
            {[[30,40,12],[80,35,10],[55,75,14],[88,82,8],[22,82,9]].map(([cx,cy,r],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r}/>
                <circle cx={cx} cy={cy} r={r*1.6} opacity="0.3"/>
              </g>
            ))}
          </svg>
        )}
      </div>
      {locked && (
        <div style={{
          position:'absolute', top: 12, left: 12, display:'flex', alignItems:'center', gap: 8,
          padding:'6px 10px', borderRadius: 999, background: palette.bg, border: `1px solid ${palette.line}`,
          fontFamily: fonts.mono, fontSize: 11, color: palette.mute, letterSpacing:'0.08em',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
          </svg>
          PRIVATE
        </div>
      )}
    </div>
  );
}

function ProjectCard({ p, size = 'normal', unlocked, palette, fonts, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onOpen}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display:'block', width:'100%', textAlign:'left',
        background:'transparent', border: 'none', padding: 0, cursor:'pointer',
        color: palette.ink,
      }}>
      <ProjectVisual accent={p.accent} palette={palette} fonts={fonts}
                     locked={p.locked && !unlocked} size={size}
                     image={p.cover} imagePosition={p.coverPosition} imageFit={p.coverFit} />
      <div style={{ paddingTop: 18 }}>
        {(p.award || p.status) && (
          <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
            {p.award && <AwardBadge text={p.award} palette={palette} fonts={fonts} />}
            {p.status && <StatusBadge text={p.status} palette={palette} fonts={fonts} />}
          </div>
        )}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
          fontFamily: fonts.mono, fontSize: 11, color: palette.mute, letterSpacing:'0.14em',
          textTransform:'uppercase', marginBottom: 8,
        }}>
          <span>{p.year}</span>
          <span style={{
            transition:'transform 240ms',
            transform: hover ? 'translateX(4px)' : 'none',
            color: hover ? palette.accent : palette.mute,
          }}>{p.locked && !unlocked ? 'locked →' : 'case study →'}</span>
        </div>
        <h3 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 500,
          fontSize: size === 'feature' ? 36 : size === 'wide' ? 26 : 22,
          letterSpacing:'-0.015em', lineHeight: 1.15,
        }}>{p.title}</h3>
        <p style={{
          margin:'10px 0 14px 0', color: palette.mute,
          fontSize: size === 'feature' ? 17 : 14.5, lineHeight: 1.55,
          maxWidth: 620,
        }}>{p.blurb}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 6 }}>
          {p.tags.map((tg) => (
            <span key={tg} style={{
              padding:'4px 9px', borderRadius: 4, fontFamily: fonts.mono, fontSize: 10.5,
              letterSpacing:'0.08em', color: palette.mute,
              border:`1px solid ${palette.line}`,
            }}>{tg}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ProjectRow({ p, unlocked, palette, fonts, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onOpen}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="proj-list-row"
      style={{
        display:'grid', gridTemplateColumns:'80px minmax(0, 2fr) minmax(0, 2fr) minmax(0, 1fr) 60px',
        gap: 24, alignItems:'center',
        width:'100%', textAlign:'left', padding: '24px 8px',
        borderBottom:`1px solid ${palette.line}`,
        background: hover ? palette.surface : 'transparent',
        transition:'background 200ms, padding 200ms',
        paddingLeft: hover ? 20 : 8,
        color: palette.ink, border:'none', borderBottom:`1px solid ${palette.line}`, cursor:'pointer',
      }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 12, color: palette.mute, letterSpacing:'0.08em' }}>{p.year}</span>
      <span style={{ fontFamily: fonts.display, fontSize: 22, letterSpacing:'-0.01em', display:'flex', alignItems:'center', gap: 10 }}>
        {p.locked && !unlocked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={palette.mute} strokeWidth="2">
            <rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
          </svg>
        )}
        {p.title}
      </span>
      <span style={{ color: palette.mute, fontSize: 14 }}>{p.blurb}</span>
      <span style={{ display:'flex', flexWrap:'wrap', gap: 6 }}>
        {p.tags.slice(0,2).map((tg) => (
          <span key={tg} style={{
            padding:'3px 8px', borderRadius: 4, fontFamily: fonts.mono, fontSize: 10,
            letterSpacing:'0.08em', color: palette.mute, border:`1px solid ${palette.line}`,
          }}>{tg}</span>
        ))}
      </span>
      <span style={{
        textAlign:'right', color: hover ? palette.accent : palette.mute,
        transition:'transform 240ms', transform: hover ? 'translateX(4px)' : 'none',
        fontFamily: fonts.mono, fontSize: 13,
      }}>→</span>
    </button>
  );
}

// ---------- Case study modal ----------
function CaseStudyModal({ project: p, palette, fonts, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const c = p.case || {
    problem:'Case study notes for this project are kept private. Get in touch and I can walk you through it.',
    approach:'—', result:'—', stack: p.tags,
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="modal-card" style={{
        background: palette.bg, color: palette.ink,
        width:'min(900px, 100%)', maxHeight:'88vh', overflow:'auto',
        borderRadius: 16, border: `1px solid ${palette.line}`,
        animation:'slideUp 220ms cubic-bezier(.2,.8,.2,1)',
      }}>
        <ProjectVisual accent={p.accent} palette={palette} fonts={fonts} locked={false} size="feature"
                       image={p.cover} imagePosition={p.coverPosition} imageFit={p.coverFit} />
        <div className="modal-pad" style={{ padding: 36 }}>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.14em',
            textTransform:'uppercase', color: palette.mute,
          }}>
            <span>{p.year} · case study</span>
            <button onClick={onClose} style={{
              background:'transparent', border:`1px solid ${palette.line}`, padding:'6px 12px',
              borderRadius: 6, color: palette.mute, fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.1em',
            }}>esc</button>
          </div>
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 500,
            fontSize:'clamp(28px, 4vw, 44px)', letterSpacing:'-0.02em',
            margin:'12px 0 6px 0', lineHeight: 1.1,
          }}>{p.title}</h2>
          <p style={{ color: palette.mute, marginTop: 0, fontSize: 16, lineHeight: 1.6, maxWidth: 700 }}>{p.blurb}</p>

          {(p.award || p.role || p.status) && (
            <div style={{ display:'flex', flexWrap:'wrap', gap: 10, marginTop: 14 }}>
              {p.award && <AwardBadge text={p.award} palette={palette} fonts={fonts} />}
              {p.status && <StatusBadge text={p.status} palette={palette} fonts={fonts} />}
              {p.role && (
                <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.08em', color: palette.mute, padding:'5px 0' }}>
                  {p.role}
                </span>
              )}
            </div>
          )}

          {p.links && p.links.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap: 10, marginTop: 18 }}>
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                  padding:'9px 16px', borderRadius: 999, fontSize: 13.5,
                  background: l.primary ? palette.ink : 'transparent',
                  color: l.primary ? palette.bg : palette.ink,
                  border: `1px solid ${l.primary ? palette.ink : palette.line}`,
                }}>{l.label} ↗</a>
              ))}
            </div>
          )}

          {p.metrics && (
            <div style={{
              display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 0, margin:'28px 0', borderTop:`1px solid ${palette.line}`,
              borderBottom:`1px solid ${palette.line}`,
            }}>
              {p.metrics.map((m,i) => (
                <div key={i} style={{
                  padding:'18px 16px',
                  borderRight: `1px solid ${palette.line}`, marginRight: -1,
                }}>
                  <div style={{ fontFamily: fonts.display, fontSize: 32, letterSpacing:'-0.02em', fontWeight:500 }}>
                    {m.v}
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10.5, letterSpacing:'0.14em', textTransform:'uppercase', color: palette.mute, marginTop:4 }}>
                    {m.k}
                  </div>
                </div>
              ))}
            </div>
          )}

          <CaseBlock title="Problem" body={c.problem} palette={palette} fonts={fonts} />
          <CaseBlock title="Approach" body={c.approach} palette={palette} fonts={fonts} />
          <CaseBlock title="Result"  body={c.result}  palette={palette} fonts={fonts} />

          {c.gallery && c.gallery.length > 0 && (
            <div className={(c.galleryCols || c.gallery.length) > 1 ? 'case-gallery' : ''} style={{
              display:'grid', gridTemplateColumns:`repeat(${c.galleryCols || c.gallery.length}, 1fr)`, gap: 14, margin:'32px 0 8px',
            }}>
              {c.gallery.map((g) => (
                <figure key={g.src} style={{ margin: 0 }}>
                  <img src={g.src} alt={g.caption || ''} loading="lazy" style={{
                    width:'100%', display:'block', borderRadius: 14, border:`1px solid ${palette.line}`,
                  }} />
                  {g.caption && (
                    <figcaption style={{ fontFamily: fonts.mono, fontSize: 11, color: palette.mute, marginTop: 8, letterSpacing:'0.04em' }}>
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {(c.sections || []).map((sec) => (
            <CaseBlock key={sec.title} title={sec.title} body={sec.body} image={sec.image} palette={palette} fonts={fonts} />
          ))}

          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.14em', textTransform:'uppercase', color: palette.mute, marginBottom: 10 }}>
              Stack
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap: 6 }}>
              {(c.stack || p.tags).map((s) => (
                <span key={s} style={{
                  padding:'5px 10px', borderRadius: 4, fontFamily: fonts.mono, fontSize: 11,
                  border: `1px solid ${palette.line}`, color: palette.ink,
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CaseBlock({ title, body, image, palette, fonts }) {
  return (
    <div className="case-block" style={{ marginTop: 22, display:'grid', gridTemplateColumns:'120px 1fr', gap: 24 }}>
      <div style={{
        fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.14em',
        textTransform:'uppercase', color: palette.mute, paddingTop: 4,
      }}>{title}</div>
      <div style={{ fontSize: 15.5, lineHeight: 1.65, color: palette.ink, maxWidth: 640 }}>
        {Array.isArray(body) ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {body.map((b, i) => <li key={i} style={{ marginBottom: 6 }}>{b}</li>)}
          </ul>
        ) : body}
        {image && (
          <img src={image} alt={title} loading="lazy" style={{
            width:'100%', display:'block', marginTop: body ? 14 : 0, borderRadius: 12, border:`1px solid ${palette.line}`,
          }} />
        )}
      </div>
    </div>
  );
}

function StatusBadge({ text, palette, fonts }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap: 6, marginBottom: 10,
      padding:'5px 10px', borderRadius: 999, border:`1px dashed ${palette.mute}`, color: palette.mute,
      fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.06em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
      {text}
    </span>
  );
}

function AwardBadge({ text, palette, fonts }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap: 6, marginBottom: 10,
      padding:'5px 10px', borderRadius: 999, background: palette.accentSoft, color: palette.accent,
      fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.06em', fontWeight: 600,
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>
      </svg>
      {text}
    </span>
  );
}

// ---------- Unlock modal ----------
function UnlockModal({ project: p, palette, fonts, onClose, onUnlocked }) {
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState('');
  const inputRef = React.useRef();
  React.useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const submit = (e) => {
    e.preventDefault();
    const expected = getPasswords()[p.id];
    if (pw === expected) {
      onUnlocked();
    } else {
      setErr('wrong password.');
      setPw('');
    }
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} style={{
        background: palette.bg, width:'min(440px, 100%)', borderRadius: 16,
        border: `1px solid ${palette.line}`, padding: 32,
        animation:'slideUp 220ms cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 999, background: palette.accentSoft,
          color: palette.accent, display:'grid', placeItems:'center', marginBottom: 16,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
          </svg>
        </div>
        <h3 style={{
          margin:0, fontFamily: fonts.display, fontWeight: 500, fontSize: 26, letterSpacing:'-0.015em',
        }}>This project is private.</h3>
        <p style={{ color: palette.mute, marginTop: 8, fontSize: 14.5, lineHeight: 1.55 }}>
          “{p.title}” is gated. If I’ve shared a password with you, enter it below.
        </p>
        <label style={{ display:'block', marginTop: 18 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.14em', textTransform:'uppercase', color: palette.mute }}>
            password
          </span>
          <input ref={inputRef} type="password" value={pw} onChange={(e) => { setPw(e.target.value); setErr(''); }}
            style={{
              display:'block', width:'100%', marginTop: 8,
              padding:'12px 14px', fontSize: 15,
              fontFamily: fonts.mono,
              background: palette.surface, border:`1px solid ${err ? palette.accent : palette.line}`,
              borderRadius: 10, color: palette.ink, outline:'none',
            }}/>
        </label>
        {err && (
          <div style={{ color: palette.accent, marginTop: 8, fontFamily: fonts.mono, fontSize: 12 }}>{err}</div>
        )}
        <div style={{ display:'flex', gap: 10, marginTop: 22, justifyContent:'flex-end' }}>
          <button type="button" onClick={onClose} style={{
            padding:'10px 16px', border:`1px solid ${palette.line}`, background:'transparent',
            color: palette.ink, borderRadius: 999, fontSize: 14,
          }}>Cancel</button>
          <button type="submit" style={{
            padding:'10px 18px', background: palette.ink, color: palette.bg,
            borderRadius: 999, fontSize: 14, fontWeight: 500, border:'none',
          }}>Unlock</button>
        </div>
      </form>
    </div>
  );
}

// ---------- Admin panel ----------
function AdminPanel({ palette, fonts, onClose }) {
  const [authed, setAuthed] = React.useState(sessionStorage.getItem('portfolio.adminAuthed') === '1');
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = (e) => {
    e.preventDefault();
    if (pw === getAdminPw()) {
      setAuthed(true);
      sessionStorage.setItem('portfolio.adminAuthed','1');
    } else { setErr('wrong admin password.'); setPw(''); }
  };
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: palette.bg, width:'min(560px, 100%)', borderRadius: 16,
        border:`1px solid ${palette.line}`, padding: 32, maxHeight:'88vh', overflow:'auto',
        animation:'slideUp 220ms cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.14em',
            textTransform:'uppercase', color: palette.mute,
          }}>Admin · locked projects</div>
          <button onClick={onClose} style={{
            background:'transparent', border:`1px solid ${palette.line}`, padding:'6px 12px',
            borderRadius: 6, color: palette.mute, fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.1em',
          }}>esc</button>
        </div>
        <h3 style={{
          margin:'12px 0 4px 0', fontFamily: fonts.display, fontWeight: 500, fontSize: 28, letterSpacing:'-0.015em',
        }}>
          {authed ? 'Manage project passwords' : 'Sign in'}
        </h3>
        <p style={{ color: palette.mute, marginTop: 4, fontSize: 14, lineHeight: 1.55 }}>
          {authed
            ? 'Set or rotate the password required to view each locked case study. Stored in this browser only.'
            : 'Enter the admin password to manage locked projects.'}
        </p>
        {!authed && (
          <form onSubmit={submit} style={{ marginTop: 18 }}>
            <input type="password" value={pw} autoFocus
              onChange={(e) => { setPw(e.target.value); setErr(''); }}
              placeholder="admin password"
              style={{
                width:'100%', padding:'12px 14px', fontSize: 15, fontFamily: fonts.mono,
                background: palette.surface,
                border:`1px solid ${err ? palette.accent : palette.line}`,
                borderRadius: 10, color: palette.ink, outline:'none',
              }}/>
            {err && (
              <div style={{ color: palette.accent, marginTop: 8, fontFamily: fonts.mono, fontSize: 12 }}>{err}</div>
            )}
            <div style={{
              marginTop: 12, padding: 12, background: palette.surface,
              border:`1px dashed ${palette.line}`, borderRadius: 8,
              fontFamily: fonts.mono, fontSize: 11.5, color: palette.mute, lineHeight: 1.55,
            }}>
              <strong style={{ color: palette.ink }}>Default admin password:</strong> <code>{ADMIN_DEFAULT}</code><br/>
              Change it inside this panel once you log in.
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end', marginTop: 16 }}>
              <button type="submit" style={{
                padding:'10px 18px', background: palette.ink, color: palette.bg,
                borderRadius: 999, fontSize: 14, fontWeight: 500, border:'none',
              }}>Sign in</button>
            </div>
          </form>
        )}
        {authed && (
          <AdminEditor palette={palette} fonts={fonts}
            onSignOut={() => { sessionStorage.removeItem('portfolio.adminAuthed'); setAuthed(false); }}/>
        )}
      </div>
    </div>
  );
}

function AdminEditor({ palette, fonts, onSignOut }) {
  const [pws, setPws] = React.useState(getPasswords());
  const [adminPw, setAdminPwLocal] = React.useState(getAdminPw());
  const [savedAt, setSavedAt] = React.useState(null);
  const locked = PROJECT_LIST.filter(p => p.locked);

  const save = () => {
    Object.entries(pws).forEach(([id, v]) => setPassword(id, v));
    setAdminPw(adminPw);
    setSavedAt(new Date().toLocaleTimeString());
  };

  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ display:'grid', gap: 14 }}>
        {locked.map((p) => (
          <div key={p.id} style={{
            padding: 14, background: palette.surface, borderRadius: 10,
            border: `1px solid ${palette.line}`,
          }}>
            <div style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 500 }}>{p.title}</div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 10.5, letterSpacing:'0.1em',
              color: palette.mute, marginTop: 2, marginBottom: 10,
            }}>id: {p.id}</div>
            <input type="text" value={pws[p.id] || ''}
              onChange={(e) => setPws({ ...pws, [p.id]: e.target.value })}
              style={{
                width:'100%', padding:'10px 12px', fontSize: 14, fontFamily: fonts.mono,
                background: palette.bg, border:`1px solid ${palette.line}`, borderRadius: 8,
                color: palette.ink, outline:'none',
              }}/>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 22, paddingTop: 18, borderTop:`1px solid ${palette.line}`,
      }}>
        <div style={{
          fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.14em',
          textTransform:'uppercase', color: palette.mute, marginBottom: 10,
        }}>Admin password</div>
        <input type="text" value={adminPw}
          onChange={(e) => setAdminPwLocal(e.target.value)}
          style={{
            width:'100%', padding:'10px 12px', fontSize: 14, fontFamily: fonts.mono,
            background: palette.surface, border:`1px solid ${palette.line}`, borderRadius: 8,
            color: palette.ink, outline:'none',
          }}/>
      </div>

      <div style={{
        marginTop: 22, display:'flex', justifyContent:'space-between', alignItems:'center', gap: 12,
      }}>
        <button onClick={onSignOut} style={{
          padding:'10px 14px', border:`1px solid ${palette.line}`, background:'transparent',
          color: palette.mute, borderRadius: 999, fontSize: 13, fontFamily: fonts.mono, letterSpacing:'0.06em',
        }}>sign out</button>
        <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
          {savedAt && (
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: palette.mute }}>
              saved {savedAt}
            </span>
          )}
          <button onClick={save} style={{
            padding:'10px 18px', background: palette.accent, color: palette.dark ? '#0b0b0b' : '#fff',
            borderRadius: 999, fontSize: 14, fontWeight: 500, border:'none',
          }}>Save changes</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Projects, AdminPanel });
