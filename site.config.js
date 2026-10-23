/* ============================================================================
   site.config.js  ·  WHO YOU ARE
   ========================================================================== */

window.SITE = {

  identity: {
    name:     'Harry Nguyen',
    tagline:  'Data Science · Machine Learning · Analytics',
    location: 'Sydney, Australia',
    email:    'harrynguyen1907@gmail.com',
    linkedin: 'https://www.linkedin.com/in/huy-nguyen-79711a220/',
    github:   'https://github.com/harryng1907',
  },

  hero: {
    eyebrow: 'Data Science & Decisions · UNSW · {year}',
    greeting: 'Hello',
    introLead: 'I’m {first}. I turn data into',
    rotatingWords: [
      'clear decisions.',
      'working models.',
      'sharper campaigns.',
      'real-world insight.',
    ],
    blurb:
      'Final-year Data Science & Decisions student at UNSW Sydney, working where data, media and marketing meet — from YOLO-based computer vision and people analytics to POOL, an AI matching app that placed 3rd nationally.',
    primaryCta:   { label: 'See selected work →', href: '#projects' },
    secondaryCta: { label: 'Get in touch',        href: '#contact'  },
    statusLine: 'Open to graduate roles · from Dec 2026',
    stats: [
      { label: 'mAP@0.5 on CV model',  value: 94,   suffix: '%' },
      { label: 'Images labelled',      value: 1800, suffix: '+' },
      { label: 'Social reach growth',  value: 300,  suffix: '%' },
      { label: 'Competition podiums',  value: 2,    suffix: ''   },
    ],
    chartHeadlineLead:  'building a career in',
    chartHeadlineFocus: 'data science',
    chartStartYear:     2024,
  },

  about: {
    lead:
      'I’m a **data science** student at UNSW Sydney who likes problems where the numbers have to change a real decision.',
    body:
      'My work spans machine learning (object detection, gradient-boosted models, SHAP interpretation), econometrics and statistical testing, and the less glamorous part that makes it all work — cleaning and merging messy real-world data. Outside the notebook I run social content and campaigns for a student society, so I care about communicating results as much as producing them.',
    facts: [
      ['role',       'Data Science student'],
      ['based',      'Sydney, Australia'],
      ['degree',     'B. Data Science & Decisions'],
      ['major',      'Computational Data Science'],
      ['focus',      'ML · analytics · marketing'],
      ['status',     '**graduating Dec 2026**'],
      ['---',        ''],
      ['languages',  'Vietnamese (native), English (fluent)'],
      ['awards',     '**3rd in Australia** · Futura Remix'],
      ['',           '1st place · DataSoc × Accenture'],
    ],
  },

  skills: [
    { group: 'languages',  items: ['Python','SQL (PostgreSQL)','SQLite','SparkSQL','Bash / Shell','C'] },
    { group: 'data & ml',  items: ['Pandas','NumPy','Scikit-Learn','Statsmodels','SciPy','XGBoost','YOLO','SHAP','Matplotlib','Seaborn'] },
    { group: 'big data',   items: ['Apache Spark (PySpark)','Hadoop','MapReduce (mrjob)'] },
    { group: 'tooling',    items: ['PostgreSQL (psycopg2)','Git / GitHub','Jupyter','Maple','Excel','PowerPoint','Canva','Adobe Suite'] },
    { group: 'soft',       items: ['Communication','Teamwork','Time management','Presenting insights'] },
  ],

  education: {
    period:      'Feb 2024 — Dec 2026 (expected)',
    degree:      'Bachelor of Data Science & Decisions',
    institution: 'UNSW Sydney',
    detail:
      'Major in Computational Data Science. Recipient of the International Student Award scholarship.',
    courses: [
      'Data Science and Decisions in Practice',
      'Machine Learning',
      'Database Systems',
      'Big Data Management',
      'Algorithm Design and Analysis',
      'Customer Analytics',
    ],
  },

  contact: {
    headline: 'Hiring for a graduate data role, or just want to **say hello**? Let’s talk.',
  },

  footer: {
    note: '© {year} {name}',
    version: 'v1.0',
    credit: {
      show:  true,
      text:  'Template by',
      brand: 'KazuHarry',
      href:  '',
    },
  },
};
