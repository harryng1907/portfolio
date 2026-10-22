/* ============================================================================
   projects.config.js  ·  YOUR WORK
   ========================================================================== */

window.PROJECTS = {

  adminPassword: 'change-me',
  passwords: {},

  list: [
    {
      id:'accenture-people-analytics',
      year:'2026',
      title:'People Analytics — 1st Place, DataSoc × Accenture',
      blurb:'End-to-end attrition analysis for a simulated 12,000-employee enterprise; pitched a “Progression & Equity” pilot that won 1st place.',
      tags:['Python','Logistic regression','Hypothesis testing','Consulting'],
      accent:'client',
      locked:false,
      metrics:[{k:'placing',v:'1st'},{k:'employees',v:'13k+'},{k:'pay gap',v:'7.3%'}],
      case:{
        problem:'A 12,000-employee enterprise (simulated across 4 relational HR datasets: 13k+ employees, 1.4k exits, 5 survey waves) was losing regrettable talent and didn’t know where or why.',
        approach:'Ran the Double Diamond consulting framework. Cleaned and merged multi-system legacy HR data in Python, and tested for survey non-response bias (18% non-response; p = 0.824, no significant bias). Built a multivariate logistic regression to isolate regrettable-attrition hotspots.',
        result:'Found that 1st-year high-potentials and Level 3 employees suffered structural pay compression (7.3% compa-ratio deficit). Pitched a data-backed “Progression & Equity” pilot to an Accenture judging panel and won 1st place for analytical rigour and commercial viability.',
        stack:['Python','Pandas','Statsmodels','Logistic regression','Hypothesis testing'],
      },
    },
    {
      id:'yolo-object-detection',
      year:'2026',
      title:'Multi-class Object Detection with YOLO',
      blurb:'Built a dataset from ~1,800 hand-labelled images and trained a YOLO model to ~94% mAP@0.5 during my FPT Telecom internship.',
      tags:['Computer vision','YOLO','Python','Model evaluation'],
      accent:'data',
      locked:false,
      metrics:[{k:'mAP@0.5',v:'~94%'},{k:'images',v:'1.8k'},{k:'threshold',v:'0.32'}],
      case:{
        problem:'FPT Telecom needed reliable multi-class object detection on real-world imagery, starting from no labelled dataset.',
        approach:'Labelled and processed ~1,800 images, trained a YOLO-based detector in Python, then dug into precision-recall and F1-confidence curves to understand where it failed — surfacing class imbalance that dragged down underrepresented classes.',
        result:'Reached ~94% mAP@0.5 on validation. Tuned the confidence threshold to ~0.32 to balance precision and recall, and fed data-quality fixes back into the dataset for more accurate real-world detection.',
        stack:['Python','YOLO','PR / F1 curves','Data labelling'],
      },
    },
    {
      id:'f1-performance-modelling',
      year:'2025',
      title:'F1 Performance Analytics & Modelling',
      blurb:'DATA3001 capstone: predicted lap performance from telemetry and simulated optimal driver actions to minimise lap time.',
      tags:['XGBoost','SHAP','Optimisation','Telemetry'],
      accent:'energy',
      locked:false,
      metrics:[{k:'models',v:'OLS · RF · XGB'},{k:'explain',v:'SHAP'},{k:'optimiser',v:'COBYLA'}],
      case:{
        problem:'Which driver actions — speed, braking, positioning — actually drive lap time, and what would the optimal combination look like?',
        approach:'Cleansed the telemetry dataset (missing values, IQR outlier removal), then built OLS, Random Forest and XGBoost models, evaluated with cross-validation, MAE and R². Applied SHAP to interpret the key drivers.',
        result:'Translated the drivers into actionable lap-time insights and built a COBYLA optimisation framework to simulate optimal driver actions, communicated back to the project team.',
        stack:['Python','Scikit-Learn','XGBoost','SHAP','SciPy (COBYLA)'],
      },
    },
    {
      id:'svis-social-growth',
      year:'2025',
      title:'Student Society Social Growth',
      blurb:'Content strategy and campaigns for the Society of Vietnamese International Students at UNSW: +300% reach, +160% followers.',
      tags:['Marketing','Content strategy','Campaigns','Canva'],
      accent:'bio',
      locked:false,
      metrics:[{k:'reach',v:'+300%'},{k:'followers',v:'+160%'},{k:'team',v:'5'}],
      case:{
        problem:'The society’s Facebook and Instagram presence wasn’t reaching the students it served, limiting event turnout and merch sales.',
        approach:'Took over content strategy across both platforms, and coordinated merchandise design and promotional campaigns with a 5-member team.',
        result:'+300% reach and +160% follower growth, with campaigns supporting engagement and product sales at student events.',
        stack:['Meta Business Suite','Canva','Adobe Suite'],
      },
    },
  ],
};
