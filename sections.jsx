// sections.jsx — About, Skills, Experience, Education, Contact, Footer.
// Content comes from window.SITE and window.EXPERIENCE (the *.config.js files).

// Render a string, colouring any **wrapped** spans with the accent colour.
function mdAccent(text, accent) {
  if (!text) return null;
  return String(text).split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} style={{ color: accent }}>{part.slice(2, -2)}</span>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function SectionLabel({ num, children, palette, fonts }) {
  return (
    <div style={{
      display:'flex', alignItems:'baseline', gap: 14, marginBottom: 28,
      fontFamily: fonts.mono, fontSize: 12, letterSpacing:'0.16em',
      textTransform:'uppercase', color: palette.mute,
    }}>
      <span style={{ color: palette.accent }}>{num}</span>
      <span style={{ flex: '0 0 auto' }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: palette.line, transform:'translateY(-3px)' }} />
    </div>
  );
}

// ---------- About ----------
function About({ t, palette, fonts, density }) {
  const A = window.SITE.about;
  return (
    <section id="about" style={{ paddingTop: density.section, paddingBottom: density.section }}>
      <div className="container reveal">
        <SectionLabel num="01" palette={palette} fonts={fonts}>About</SectionLabel>
        <div className="about-grid" style={{
          display:'grid',
          gridTemplateColumns:'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 64, alignItems:'start',
        }}>
          <div>
            <p style={{
              fontFamily: fonts.display, fontSize: 'clamp(22px, 2.6vw, 32px)',
              lineHeight: 1.35, letterSpacing:'-0.01em', margin: 0,
              textWrap:'pretty',
            }}>
              {mdAccent(A.lead, palette.accent)}
            </p>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.7, color: palette.mute, maxWidth: 640 }}>
              {mdAccent(A.body, palette.accent)}
            </p>
          </div>
          <aside style={{
            background: palette.surface,
            border: `1px solid ${palette.line}`,
            borderRadius: 14,
            padding: 24,
            fontFamily: fonts.mono, fontSize: 13, lineHeight: 1.7,
          }}>
            {A.facts.map((row, i) => {
              if (row[0] === '---') return <hr key={i} className="hair" style={{ margin:'14px 0' }} />;
              return <Row key={i} k={row[0]} v={mdAccent(row[1], palette.accent)} palette={palette} />;
            })}
          </aside>
        </div>
      </div>
    </section>
  );
}
function Row({ k, v, palette }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'90px 1fr', gap: 12 }}>
      <span style={{ color: palette.mute }}>{k}</span>
      <span>{v}</span>
    </div>
  );
}

// ---------- Skills ----------
function Skills({ t, palette, fonts, density }) {
  const SKILLS = window.SITE.skills;
  return (
    <section id="skills" style={{ paddingTop: density.section, paddingBottom: density.section }}>
      <div className="container reveal">
        <SectionLabel num="03" palette={palette} fonts={fonts}>Skills &amp; stack</SectionLabel>
        <div style={{ display:'grid', gap: density.block }}>
          {SKILLS.map((row) => (
            <div key={row.group} className="skills-row" style={{
              display:'grid', gridTemplateColumns:'minmax(140px, 200px) 1fr', gap: 24,
              paddingBottom: density.block, borderBottom: `1px solid ${palette.line}`,
              alignItems:'baseline',
            }}>
              <div style={{
                fontFamily: fonts.display, fontStyle:'italic', fontSize: 26,
                letterSpacing:'-0.01em', color: palette.ink,
              }}>{row.group}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap: 8 }}>
                {row.items.map((s) => (
                  <span key={s} style={{
                    padding:'7px 12px',
                    border: `1px solid ${palette.line}`,
                    borderRadius: 999,
                    fontSize: 13, fontFamily: fonts.body,
                    color: palette.ink, background: palette.surface,
                    transition:'all 160ms',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = palette.accent; e.currentTarget.style.color = palette.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = palette.line; e.currentTarget.style.color = palette.ink; }}
                  >{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Experience ----------
function Experience({ t, palette, fonts, density }) {
  const EXPERIENCE = window.EXPERIENCE;
  return (
    <section id="experience" style={{ paddingTop: density.section, paddingBottom: density.section }}>
      <div className="container reveal">
        <SectionLabel num="04" palette={palette} fonts={fonts}>Experience</SectionLabel>
        <div style={{ display:'grid', gap: density.block }}>
          {EXPERIENCE.map((e, i) => (
            <article key={i} className="exp-row" style={{
              display:'grid', gridTemplateColumns:'minmax(160px, 200px) 1fr', gap: 32,
              paddingBottom: density.block, borderBottom: i === EXPERIENCE.length-1 ? 'none' : `1px solid ${palette.line}`,
            }}>
              <div style={{
                fontFamily: fonts.mono, fontSize: 12, color: palette.mute,
                letterSpacing:'0.08em',
              }}>{e.period}</div>
              <div>
                <h3 style={{
                  margin: 0, fontFamily: fonts.display, fontWeight: 500,
                  fontSize: 28, letterSpacing:'-0.015em', lineHeight: 1.2,
                }}>{e.role}</h3>
                <div style={{
                  marginTop: 6, color: palette.accent, fontSize: 15, fontFamily: fonts.body,
                }}>{e.org}</div>
                <ul style={{
                  margin: '18px 0 0 0', padding: 0, listStyle:'none',
                  display:'grid', gap: 8,
                }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{
                      paddingLeft: 22, position:'relative', fontSize: 15.5,
                      color: palette.ink, lineHeight: 1.55, maxWidth: 760,
                    }}>
                      <span style={{
                        position:'absolute', left: 0, top: 10, width: 12, height: 1,
                        background: palette.mute,
                      }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Education ----------
function Education({ t, palette, fonts, density }) {
  const E = window.SITE.education;
  return (
    <section id="education" style={{ paddingTop: density.section, paddingBottom: density.section }}>
      <div className="container reveal">
        <SectionLabel num="05" palette={palette} fonts={fonts}>Education</SectionLabel>
        <div className="edu-grid" style={{
          display:'grid', gridTemplateColumns:'minmax(160px, 200px) 1fr', gap: 32,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 12, color: palette.mute, letterSpacing:'0.08em' }}>
            {E.period}
          </div>
          <div>
            <h3 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 500,
              fontSize: 'clamp(28px, 3.2vw, 40px)', letterSpacing:'-0.02em', lineHeight: 1.15,
            }}>
              {E.degree}
            </h3>
            <div style={{ marginTop: 6, color: palette.accent, fontSize: 16 }}>
              {E.institution}
            </div>
            <p style={{ marginTop: 18, color: palette.mute, fontSize: 16, maxWidth: 640, lineHeight: 1.7 }}>
              {E.detail}
            </p>
            <div style={{
              marginTop: 20, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 10,
            }}>
              {E.courses.map((c) => (
                <div key={c} style={{
                  padding:'10px 14px',
                  border:`1px solid ${palette.line}`,
                  background: palette.surface,
                  borderRadius: 10,
                  fontFamily: fonts.mono, fontSize: 12.5, color: palette.ink,
                }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact({ t, palette, fonts, density }) {
  const links = [
    { label:'LinkedIn', href: t.linkedin, hint: t.linkedin.replace(/^https?:\/\//,'') },
    { label:'GitHub',   href: t.github,   hint: t.github.replace(/^https?:\/\//,'') },
    { label:'Email',    href: `mailto:${t.email}`, hint: t.email },
  ];
  return (
    <section id="contact" style={{ paddingTop: density.section, paddingBottom: density.section * 0.6 }}>
      <div className="container reveal">
        <SectionLabel num="06" palette={palette} fonts={fonts}>Contact</SectionLabel>
        <h2 style={{
          fontFamily: fonts.display, fontWeight: 400, fontStyle:'italic',
          fontSize:'clamp(40px, 6vw, 88px)', lineHeight: 1.02, letterSpacing:'-0.03em',
          margin: 0, maxWidth: 900, textWrap:'balance',
        }}>
          {mdAccent(window.SITE.contact.headline, palette.accent)}
        </h2>
        <div style={{
          marginTop: 56,
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap: 0,
          borderTop: `1px solid ${palette.line}`,
        }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{
                padding:'24px 4px',
                borderBottom: `1px solid ${palette.line}`,
                borderRight: `1px solid ${palette.line}`,
                display:'flex', flexDirection:'column', gap: 8,
                transition:'background 200ms, padding 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = palette.surface; e.currentTarget.style.paddingLeft = '12px'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '4px'; }}
            >
              <span style={{
                fontFamily: fonts.mono, fontSize: 11, letterSpacing:'0.16em',
                textTransform:'uppercase', color: palette.mute,
              }}>{l.label}</span>
              <span style={{
                fontFamily: fonts.display, fontSize: 24, letterSpacing:'-0.01em',
                color: palette.ink, display:'flex', alignItems:'center', gap: 10,
              }}>
                {l.hint}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.accent} strokeWidth="2">
                  <path d="M7 17L17 7M9 7h8v8"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ t, palette, fonts }) {
  const F = window.SITE.footer;
  const year = new Date().getFullYear();
  const note = F.note.replace('{year}', year).replace('{name}', t.name.toUpperCase());
  const credit = F.credit;
  return (
    <footer style={{
      borderTop: `1px solid ${palette.line}`,
      padding: '28px 0', marginTop: 40,
    }}>
      <div className="container" style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        gap: 16, flexWrap:'wrap',
        fontFamily: fonts.mono, fontSize: 11.5, color: palette.mute, letterSpacing:'0.08em',
      }}>
        <span>{note}</span>
        <span style={{ display:'flex', alignItems:'center', gap: 16, flexWrap:'wrap' }}>
          {credit && credit.show && (
            credit.href ? (
              <a href={credit.href} target="_blank" rel="noreferrer"
                 title="Template credit"
                 style={{ color: palette.mute, transition:'color 160ms' }}
                 onMouseEnter={(e) => e.currentTarget.style.color = palette.accent}
                 onMouseLeave={(e) => e.currentTarget.style.color = palette.mute}>
                {credit.text} <span style={{ color: palette.accent, fontWeight: 500 }}>{credit.brand}</span>
              </a>
            ) : (
              <span>{credit.text} <span style={{ color: palette.accent, fontWeight: 500 }}>{credit.brand}</span></span>
            )
          )}
          <span>{F.version} · last updated {new Date().toLocaleDateString('en-AU',{month:'short',year:'numeric'})}</span>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { About, Skills, Experience, Education, Contact, Footer, SectionLabel });
