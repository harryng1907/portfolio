# Editorial Portfolio — Configurable Template

_A **KazuHarry** template._

A bold, editorial single-page portfolio template that suits **any profession** —
developer, designer, marketer, researcher, student, and more. **Everything you
see renders from four plain-text config files** — you never have to touch the
React code to make it yours.

It ships with neutral placeholder content ("Your Name", "Professional Title",
example projects, generic roles) so you can drop in your own details and go.

It ships with:

- 3 hero layouts (editorial / stats / animated chart)
- 3 project-card layouts (asymmetric / grid / list)
- 4 colour palettes, 3 font pairings, 5 background patterns, 3 density presets
- Click-through **case-study** modals
- **Password-locked private projects** + a built-in **Admin panel** to manage
  the passwords (great for NDA / confidential work)
- A live **Tweaks panel** so you (or a visitor) can preview any theme combo
  without editing code

---

## Quick Start

### Option 1 — Recommended (Local Server)

Run a local web server from the project folder.

Using Python:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

No build step, npm install, or compilation required.

---

### Option 2 — Static Hosting

Upload the folder to any static host, including:

* GitHub Pages
* Netlify
* Vercel
* Cloudflare Pages
* Amazon S3

The template is fully static and requires no backend.

---

## The four config files

Everything is controlled from these. Edit the **values**, keep the **keys**.

| File | Controls |
|------|----------|
| `site.config.js` | Your name, tagline, contact links, hero copy, about text, skills, education, contact + footer text |
| `projects.config.js` | Every project card, case-study content, which projects are locked, and their passwords |
| `experience.config.js` | Your work history |
| `theme.config.js` | Colour palettes, font pairings, density presets, and the default look the site opens with |

---

### 1. `site.config.js` — who you are

```js
window.SITE = {
  identity: {
    name:     'Your Name',
    tagline:  'short subtitle',
    location: 'City, Country',
    email:    'you@email.com',
    linkedin: 'https://linkedin.com/in/your-handle',
    github:   'https://github.com/your-handle',
  },
  hero:    { ... },   // headline, rotating words, buttons, stats
  about:   { ... },   // lead paragraph, body, "fact sheet" rows
  skills:  [ ... ],   // grouped skill pills
  education: { ... },
  contact: { ... },
  footer:  { ... },
};
```

**Handy tricks**

- **Accent emphasis** — wrap any phrase in `**double asterisks**` (in the about
  lead, fact values, or contact headline) and it renders in your accent colour:
  `'focused on **clear, useful** work'`.
- **Placeholders** — `{year}` becomes the current year, `{first}` becomes your
  first name, `{name}` becomes your full name. Use them in hero eyebrow / footer.
- **Rotating words** — `hero.rotatingWords` is the list that types and erases in
  the editorial hero. Add or remove as many as you like.

---

### 2. `projects.config.js` — your work

Each project is one object in the `list` array:

```js
{
  id:'my-project',                 // unique slug — keep it unique
  year:'2025',
  title:'Project title',
  blurb:'One-line description.',
  tags:['Python','SQL'],           // small chips
  accent:'data',                   // illustration: bio | data | energy | client
  locked:false,                    // true → asks for a password
  metrics:[{k:'AUROC',v:'0.81'}],  // optional headline figures
  case:{                           // optional case-study body
    problem:'...', approach:'...', result:'...',
    stack:['Python','XGBoost'],
  },
}
```

- `accent` picks which built-in placeholder illustration is drawn — no images
  needed. Options: `bio` (DNA), `data` (bars), `energy` (waves), `client`
  (clusters).
- Omit `case` and the modal shows a friendly "ask me about it" message.

#### Locked / private projects

Set `locked: true` on any project, then give it a starting password in the
`passwords` map (keyed by the project's `id`):

```js
window.PROJECTS = {
  adminPassword: 'change-me',      // CHANGE THIS before shipping
  passwords: {
    'project-four': 'demo123',
    'project-five': 'preview',
  },
  list: [ ... ],
};
```

A visitor clicking a locked project must enter its password to view the case
study. Unlocks last for that browser session.

#### Admin panel (rotate passwords without editing code)

Click the **gear icon** in the top-right nav. Sign in with `adminPassword`
(default `change-me`). From there you can:

- change the password for each locked project, and
- change the admin password itself.

Admin changes are saved in the visitor's browser (localStorage) and **override**
the defaults in the config. To reset to the config defaults, clear the site's
storage in your browser, or have the buyer edit `projects.config.js` directly.

> ⚠️ **Security note for buyers:** this is client-side gating, suitable for
> casually hiding work-in-progress, NDA teasers, or "ask me first" projects. The
> passwords live in the static files and browser storage, so it is **not**
> bank-grade security. Don't put genuinely secret data behind it.

---

### 3. `experience.config.js` — work history

```js
window.EXPERIENCE = [
  {
    role:   'Job Title',
    org:    'Company / Lab',
    period: '2025 — present',
    bullets: [
      'Achievement one.',
      'Achievement two.',
    ],
  },
  // ...add more, newest first
];
```

---

### 4. `theme.config.js` — look & feel

```js
window.THEME = {
  palettes: { indigo: { ...colours }, crimson: { ... } },
  fonts:    { editorial: { display, body, mono }, ... },
  density:  { compact: {...}, regular: {...}, spacious: {...} },
  defaults: {
    palette:     'indigo',
    font:        'editorial',
    background:  'dotgrid',   // none | dotgrid | grid | ruled | scatter
    heroVariant: 'editorial', // editorial | stats | chart
    cardLayout:  'asymmetric',// asymmetric | grid | list
    density:     'regular',
  },
};
```

- **Add a palette** — add a new entry under `palettes`. It instantly becomes a
  choice in the Tweaks panel. Required keys: `name, bg, surface, ink, mute,
  line, accent, accentSoft, dark`.
- **Add a font pairing** — add an entry under `fonts`, then add the matching
  Google Fonts `<link>` in `index.html` so the browser loads it.
- **`defaults`** decides what the site looks like on first load. The Tweaks
  panel lets visitors preview other combinations on top of these.

---

## Password-Protected Projects

This template includes optional password-protected project pages for portfolios containing confidential, NDA, or work-in-progress projects.

### How it works

* Mark a project as `locked: true` in `projects.config.js`.
* Set a password for that project.
* Visitors must enter the correct password before the case study is displayed.
* Passwords can also be changed from the built-in Admin panel.

### Important

This feature is **client-side only** and is intended to discourage casual access. It is **not** a secure authentication system.

Anyone with sufficient technical knowledge can inspect the page source or JavaScript and access the protected content.

Do **not** use this feature to protect sensitive information, trade secrets, credentials, or confidential documents.

Instead, use it for:

* NDA project summaries
* Work-in-progress previews
* Portfolio case studies shared with selected clients
* "Ask me for access" style project showcases

---

## The Tweaks panel

A floating panel (toggled by the host toolbar) lets you preview every theme
combination live — palette, fonts, background, hero, card layout, density — plus
quick edits to your identity fields. It's a **preview tool**: to make a look
permanent for everyone, set it in `theme.config.js`.

---

## File map

```
index.html              ← shell, fonts, loads everything (rarely edited)
theme.config.js         ← EDIT: colours, fonts, defaults
site.config.js          ← EDIT: identity, hero, about, skills, education, credit
projects.config.js      ← EDIT: projects + locked passwords
experience.config.js    ← EDIT: work history
README.md               ← this guide
LICENSE.txt              ← KazuHarry license terms
─────────────────────────────────────────────
app.jsx                 ← render logic (no content)
hero.jsx                ← the three hero variants
sections.jsx            ← about / skills / experience / education / contact
projects.jsx            ← project cards, case-study + admin modals
tweaks-panel.jsx        ← the live preview panel
```

You only ever need to touch the four `*.config.js` files. The `.jsx` files are
the engine — leave them alone unless you want to change behaviour.

---

## FAQ

**Do I need Node or npm?**

No. This is a fully static website with no build step.

For local development, run a simple local web server (such as
`python -m http.server`) or upload the folder to any static hosting provider.

**How do I add a 7th project?** Add another object to `list` in
`projects.config.js`. That's it.

**How do I change the default colour?** Set `defaults.palette` in
`theme.config.js` to any palette key.

**The admin panel won't take my new config password.** Admin edits are stored in
the browser and override the config. Clear site storage (or use a private
window) to fall back to the config defaults.

**Can I remove a whole section (e.g. Education)?** Yes — open `app.jsx` and
delete that one `<Education ... />` line from the render. (This is the one time
you touch a `.jsx` file.)

**Can I remove the "Template by KazuHarry" footer credit?** Only under the
Extended License. To hide it, set `footer.credit.show` to `false` in
`site.config.js`. See `LICENSE.txt` for full terms.

---

## License & credit

This is a commercial template by **KazuHarry**. It is licensed, not sold — see
[`LICENSE.txt`](LICENSE.txt) for the Standard vs. Extended terms.

- The Standard License covers one end product and asks you to keep the small
  footer credit (`site.config.js → footer.credit`).
- The Extended License allows multiple end products and lets you remove the
  credit.

The footer credit is configurable in `site.config.js`:

```js
footer: {
  credit: { show: true, text: 'Template by', brand: 'KazuHarry', href: '' },
}
```

Leave `href` empty to show the name as plain text (no link). Add your store /
profile URL there later to make the credit clickable.

_Before selling: update the contact details in `LICENSE.txt` to your real
email / store when you have one._
