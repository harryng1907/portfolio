/* ============================================================================
   theme.config.js  ·  LOOK & FEEL
   ----------------------------------------------------------------------------
   Controls colours, fonts, spacing, and which layout variants the site opens
   with. Everything here is also adjustable live in the on-screen Tweaks panel,
   but these values are the defaults a visitor sees on first load.

   • To change the default look, edit THEME.defaults below.
   • To add a new colour palette or font pairing, add an entry to PALETTES /
     FONTS — it will automatically appear as an option in the Tweaks panel.
   ========================================================================== */

window.THEME = {

  /* ---- Colour palettes -------------------------------------------------- */
  /* Add as many as you like. The `key` (e.g. "indigo") is what you reference
     in defaults.palette below. `dark:true` flips accent-on-button text colour. */
  palettes: {
    indigo:  { name: 'Indigo / Mono',   bg:'#ffffff', surface:'#fafafa', ink:'#0a0a0a', mute:'#737373', line:'#e5e5e5', accent:'#4f46e5', accentSoft:'#eef2ff', dark:false },
    crimson: { name: 'Crimson / Cream',  bg:'#f5f3ee', surface:'#ece9e0', ink:'#1a1a1a', mute:'#7a756a', line:'#d6d1c2', accent:'#c0392b', accentSoft:'#efd9d4', dark:false },
    forest:  { name: 'Forest / Sand',    bg:'#fdf6ec', surface:'#f4ecdc', ink:'#22382f', mute:'#7e7665', line:'#dccfb6', accent:'#c97b4a', accentSoft:'#f0dfc7', dark:false },
    ink:     { name: 'Ink / Lime',       bg:'#0b0b0b', surface:'#161616', ink:'#ececec', mute:'#8a8a8a', line:'#232323', accent:'#d4ff00', accentSoft:'#1f2900', dark:true  },
  },

  /* ---- Font pairings ---------------------------------------------------- */
  /* `display` = headlines, `body` = paragraphs, `mono` = labels/code.
     If you add a new font family, also add the matching Google Fonts <link>
     in index.html so the browser can load it. */
  fonts: {
    editorial: { name:'Editorial', display:'"Source Serif 4", Georgia, serif', body:'Inter, system-ui, sans-serif',         mono:'"JetBrains Mono", ui-monospace, monospace' },
    classic:   { name:'Classic',   display:'"EB Garamond", Georgia, serif',    body:'Inter, system-ui, sans-serif',         mono:'"JetBrains Mono", ui-monospace, monospace' },
    technical: { name:'Technical', display:'"Source Serif 4", Georgia, serif', body:'"JetBrains Mono", ui-monospace, monospace', mono:'"JetBrains Mono", ui-monospace, monospace' },
  },

  /* ---- Density presets -------------------------------------------------- */
  /* Vertical rhythm. `section` = padding around each section, `block` = gap
     between items, `hero` = top/bottom padding of the hero. */
  density: {
    compact:  { section: 64,  block: 24, gap: 14, hero: 96  },
    regular:  { section: 112, block: 44, gap: 22, hero: 160 },
    spacious: { section: 160, block: 64, gap: 30, hero: 220 },
  },

  /* ---- Defaults the site opens with ------------------------------------- */
  /* Each value must match a key above (or a built-in option, noted inline). */
  defaults: {
    palette:     'indigo',      // key from palettes
    font:        'editorial',   // key from fonts
    background:  'dotgrid',     // 'none' | 'dotgrid' | 'grid' | 'ruled' | 'scatter'
    heroVariant: 'editorial',   // 'editorial' | 'stats' | 'chart'
    cardLayout:  'asymmetric',  // 'asymmetric' | 'grid' | 'list'
    density:     'regular',     // key from density
  },
};
