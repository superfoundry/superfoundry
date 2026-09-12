// Aleph mark — single source of truth for logo geometry + parametric config.
// Consumers: config.html editor, installation page, exported SVGs, (later) main site.
(function () {
  const P = {
    top: "M1616.221,706.656c.007-58.237-20.053-116.722-61.429-163.98l-247.996-283.246c-47.417-54.159-113.123-82.564-179.812-84.607l.012-.385h-141.302c-21.222,0-40.319,17.375-39.506,38.581.336,8.762,3.808,16.663,9.188,22.86l-.072.157h0l526.089,600.869-.093.189c26.823,30.635,44.636,69.342,49.067,112.069,1.105,10.658,12.317,17.266,21.937,12.547,8.557-4.197,16.723-9.511,24.258-16.108,26.421-23.134,39.925-55.534,39.902-88.095v-150.776l-.244-.075Z",
    low: "M383.779,1395.226c-.007,58.237,20.053,116.722,61.429,163.98l247.996,283.246c47.417,54.159,113.123,82.564,179.812,84.607l-.012.385h141.302c21.222,0,40.319-17.375,39.506-38.581-.336-8.762-3.808-16.663-9.188-22.86l.072-.157h0l-526.089-600.869.093-.189c-26.823-30.635-44.636-69.342-49.067-112.069-1.105-10.658-12.317-17.266-21.937-12.547-8.557,4.197-16.723,9.511-24.258,16.108-26.421,23.134-39.925,55.534-39.902,88.095v150.776l.244.075Z",
    mid: "M1616.221,1659.618c.025-58.256-20.034-116.764-61.419-164.041l-554.802-633.665h0s-481.394-549.824-481.394-549.824v-.288c-26.752-30.594-44.514-69.233-48.954-111.874-1.105-10.61-12.237-17.203-21.848-12.575-8.6,4.141-16.805,9.419-24.369,16.042-26.388,23.105-39.405,55.451-39.418,87.969h-.483v150.903h.244c-.025,58.256,20.034,116.764,61.419,164.041l554.802,633.665h0s481.394,549.824,481.394,549.824v.288c26.752,30.594,44.514,69.233,48.954,111.874,1.105,10.61,12.237,17.203,21.848,12.575,8.6-4.141,16.805-9.419,24.369-16.042,26.388-23.105,39.405-55.451,39.418-87.969h.483v-150.903h-.244Z"
  };
  const VB = { x: 440, y: 170, w: 1240, h: 1910 };
  const CX = VB.x + VB.w / 2, CY = VB.y + VB.h / 2;
  // unit perpendicular to the mark's main diagonal (for outer-stroke spread)
  const U = { x: 0.812, y: -0.583 };
  // wordmark "SUPER FOUNDRY" (from bwlogo_textstack_black.svg; bbox x 62..1938, y 2195..2825)
  const WM = ["M308.926,2429.106l16.768-37.638c20.87,16.768,54.032,28.699,86.085,28.699,40.618,0,57.76-14.536,57.76-33.91,0-56.276-155.016-19.385-155.016-116.268,0-42.113,33.537-77.882,105.085-77.882,31.293,0,64.093,8.192,86.821,23.102l-15.273,37.638c-23.476-13.789-49.194-20.496-71.922-20.496-40.244,0-56.65,15.647-56.65,35.395,0,55.528,154.653,19.385,154.653,115.157,0,41.728-33.91,77.508-105.459,77.508-40.618,0-81.235-12.667-102.853-31.305Z","M590.922,2343.021v-147.187h48.447v145.329c0,53.658,24.223,76.76,66.337,76.76s65.951-23.102,65.951-76.76v-145.329h47.699v147.187c0,76.024-42.85,117.389-114.024,117.389-71.548,0-114.409-41.366-114.409-117.389Z","M1101.544,2288.615c0,57.386-42.487,92.792-111.056,92.792h-58.87v75.276h-48.447v-260.849h107.317c68.569,0,111.056,35.021,111.056,92.781ZM1052.724,2288.615c0-32.789-21.991-51.789-64.467-51.789h-56.638v103.589h56.638c42.476,0,64.467-19,64.467-51.8Z","M1366.778,2416.065v40.618h-195.634v-260.849h190.422v40.618h-141.986v67.821h125.966v39.87h-125.966v71.922h147.198Z","M1634.067,2456.683l-53.296-76.398c-3.354.374-6.707.374-10.061.374h-58.87v76.024h-48.447v-260.849h107.317c68.569,0,111.056,35.021,111.056,92.781,0,39.507-20.122,68.569-55.528,82.357l59.992,85.711h-52.163ZM1568.478,2236.826h-56.638v103.963h56.638c42.476,0,64.467-19.374,64.467-52.174s-21.991-51.789-64.467-51.789Z","M99.346,2594.148v90.923h130.793v32.052H99.346v105.459h-37.264v-260.849h184.077v32.415H99.346Z","M274.461,2692.152c0-76.386,58.87-133.41,138.995-133.41,79.377,0,138.248,56.65,138.248,133.41s-58.87,133.41-138.248,133.41c-80.125,0-138.995-57.012-138.995-133.41ZM514.44,2692.152c0-57.76-43.224-100.236-100.984-100.236-58.508,0-101.731,42.476-101.731,100.236s43.224,100.247,101.731,100.247c57.76,0,100.984-42.487,100.984-100.247Z","M594.837,2710.042v-148.309h37.264v146.813c0,57.771,26.455,83.853,73.418,83.853s73.78-26.081,73.78-83.853v-146.813h36.142v148.309c0,75.65-41.354,115.52-110.297,115.52-68.569,0-110.308-39.87-110.308-115.52Z","M1104.524,2561.734v260.849h-30.557l-156.511-194.523v194.523h-37.264v-260.849h30.557l156.511,194.512v-194.512h37.264Z","M1171.144,2561.734h109.923c83.853,0,140.865,52.911,140.865,130.419s-57.012,130.43-140.865,130.43h-109.923v-260.849ZM1278.835,2790.167c64.467,0,105.833-39.507,105.833-98.015s-41.366-98.004-105.833-98.004h-70.427v196.019h70.427Z","M1641.698,2822.582l-56.264-80.114c-5.223.363-10.809.736-16.394.736h-64.467v79.377h-37.264v-260.849h101.731c67.821,0,108.812,34.273,108.812,90.923,0,40.244-20.87,69.316-57.386,82.357l61.85,87.569h-40.618ZM1640.588,2652.656c0-37.264-24.971-58.508-72.67-58.508h-63.346v117.389h63.346c47.699,0,72.67-21.617,72.67-58.882Z","M1834.318,2732.396v90.186h-36.89v-90.923l-103.601-169.926h39.881l83.467,137.5,83.853-137.5h36.89l-103.601,170.662Z"];
  // wordmark from bwlogo_texthorizontal_black.svg (own frame; map with translate(300.98 88.02) scale(2.5029))
  const WMH = ["M684.919,310.172l16.241-34.232c22.822,20.625,61.887,35.549,101.392,35.549,53.107,0,75.928-20.631,75.928-47.405,0-75.054-186.098-27.649-186.098-141.771,0-47.397,36.869-87.776,117.627-87.776,35.992,0,73.301,9.654,98.758,27.206l-14.487,35.115c-26.772-17.121-57.057-25.021-84.271-25.021-52.23,0-74.614,21.95-74.614,48.722,0,75.054,186.1,28.091,186.1,140.894,0,46.963-37.748,87.342-118.947,87.342-46.966,0-93.052-15.801-117.63-38.628v.006h.001Z","M982.903,212.733V38.041h43.892v172.939c0,68.028,31.162,98.756,86.465,98.756s86.905-30.728,86.905-98.756V38.041h42.573v174.692c0,89.101-48.719,136.064-129.92,136.064-80.758,0-129.918-46.963-129.918-136.064h.003Z","M1580.655,145.14c0,66.717-48.28,107.099-128.164,107.099h-75.934v93.049h-43.892V38.044h119.826c79.884,0,128.164,40.388,128.164,107.099v-.003ZM1536.763,145.14c0-43.892-29.408-68.913-85.591-68.913h-74.614v137.824h74.614c56.18,0,85.591-25.021,85.591-68.913v.003h0Z","M1868.1,307.102v38.186h-222.969V38.044h216.825v38.186h-172.933v94.366h154.062v37.309h-154.062v99.198h179.077Z","M2144.579,345.287l-66.277-94.366c-6.144.443-12.727.877-19.311.877h-75.934v93.492h-43.892V38.046h119.826c79.879,0,128.164,40.388,128.164,107.099,0,47.405-24.581,81.635-67.594,97.002l72.858,103.143h-47.843l.003-.003h0ZM2143.265,145.14c0-43.892-29.408-68.913-85.591-68.913h-74.614v138.258h74.614c56.18,0,85.591-25.455,85.591-69.347v.003h0Z","M749.439,453.127v120.706h158.886v28.091h-158.886v130.357h-32.479v-307.243h210.679v28.091h-178.2v-.003h0Z","M963.594,578.663c0-89.544,68.473-156.255,161.522-156.255,92.172,0,161.082,66.277,161.082,156.255s-68.908,156.255-161.082,156.255c-93.049,0-161.522-66.717-161.522-156.255h0ZM1253.72,578.663c0-73.301-54.863-127.287-128.601-127.287-74.177,0-129.483,53.986-129.483,127.287s55.306,127.281,129.483,127.281c73.737,0,128.601-53.986,128.601-127.281h0Z","M1356.378,601.048v-176.009h32.479v174.692c0,72.858,34.235,106.213,93.928,106.213,60.13,0,94.366-33.356,94.366-106.213v-174.692h31.599v176.009c0,88.219-47.4,133.871-125.967,133.871s-126.407-45.652-126.407-133.871h.003,0Z","M1963.351,425.036v307.243h-26.772l-197.514-249.304v249.304h-32.479v-307.243h26.772l197.951,249.31v-249.31h32.042Z","M2063.375,425.036h125.09c98.319,0,164.593,63.206,164.593,153.627s-66.277,153.619-164.593,153.619h-125.09v-307.246h0ZM2186.706,704.191c81.641,0,134.308-51.793,134.308-125.528s-52.67-125.536-134.308-125.536h-90.855v251.063h90.855Z","M2635.667,732.282l-70.222-98.756c-7.9.877-15.801,1.317-24.578,1.317h-82.52v97.436h-32.479v-307.243h114.999c78.125,0,125.528,39.502,125.528,105.345,0,48.28-25.455,82.078-70.23,96.562l75.06,105.339h-35.558ZM2633.913,530.381c0-49.165-32.479-77.256-93.931-77.256h-81.635v154.062h81.635c61.453,0,93.931-28.526,93.931-76.805h0Z","M2844.118,626.066v106.213h-32.044v-106.213l-122.891-201.03h34.672l105.339,172.499,105.339-172.499h32.479l-122.891,201.03h-.003Z"];
  const DEFAULTS = { weight: 0, spread: 0, hook: 0, curve: 0, text: 'none' };
  const KEY_ACTIVE = 'sf-logo-config', KEY_PRESETS = 'sf-logo-presets';

  function norm(cfg) { return Object.assign({}, DEFAULTS, cfg || {}); }
  function load() { try { return norm(JSON.parse(localStorage.getItem(KEY_ACTIVE))); } catch (e) { return norm(); } }
  function save(cfg) { localStorage.setItem(KEY_ACTIVE, JSON.stringify(norm(cfg))); }
  function presets() { try { return JSON.parse(localStorage.getItem(KEY_PRESETS)) || {}; } catch (e) { return {}; } }
  function savePreset(name, cfg) { const p = presets(); p[name] = norm(cfg); localStorage.setItem(KEY_PRESETS, JSON.stringify(p)); }
  function deletePreset(name) { const p = presets(); delete p[name]; localStorage.setItem(KEY_PRESETS, JSON.stringify(p)); }

  // transforms per stroke for a config (spread moves outer strokes apart along U; aspect scales about centre)
  function strokeTransform(which, cfg) {
    const c = norm(cfg);
    const s = which === 'top' ? c.spread : which === 'low' ? -c.spread : 0;
    return `translate(${(s * U.x).toFixed(2)} ${(s * U.y).toFixed(2)})`;
  }
  function rootTransform() { return ''; }
  function filterAttrs(cfg) {
    const c = norm(cfg);
    return c.weight === 0 ? null : { operator: c.weight > 0 ? 'dilate' : 'erode', radius: Math.abs(c.weight) * 5.7 };
  }
  // --- parametric outline: HOOK rounds/sharpens the 4 stroke-tip hooks, CURVE the 2 outer shoulders ---
  const RFL = (p) => [2000 - p[0], 2101.883 - p[1]];
  function shapePts(T, E, pts, m) {
    const cx = E[0] - T[0], cy = E[1] - T[1], L2 = cx * cx + cy * cy;
    let prev = 0;
    return pts.map((p) => {
      let t = ((p[0] - T[0]) * cx + (p[1] - T[1]) * cy) / L2;
      t = Math.max(prev + 0.02, Math.min(1, Math.max(0, t)));
      prev = t;
      const qx = T[0] + t * cx, qy = T[1] + t * cy;
      return [qx + (p[0] - qx) * m, qy + (p[1] - qy) * m];
    });
  }
  function splitCubic(P0, P1, P2, P3, u) {
    const lp = (a, b2) => [a[0] + (b2[0] - a[0]) * u, a[1] + (b2[1] - a[1]) * u];
    const A = lp(P0, P1), B = lp(P1, P2), C = lp(P2, P3), D = lp(A, B), E2 = lp(B, C), Fm = lp(D, E2);
    return { l: [A, D, Fm], r: [E2, C] };
  }
  // inn=[i1,i2,T]; caps=[[..],[..],[c1,c2,E]] — returns cubic segs from S0's end to E.
  // h>0 regresses the curl into a plain round end cap (no bump at +4);
  // h<0 sharpens the cap so the hook ends in a point at -4.
  const DIAG = [0.6588, 0.7524]; // stroke diagonal direction (unreflected frame)
  function sub4(P0, c1, c2, P3) {
    const h1 = splitCubic(P0, c1, c2, P3, 0.5);
    const a = splitCubic(P0, h1.l[0], h1.l[1], h1.l[2], 0.5);
    const b = splitCubic(h1.l[2], h1.r[0], h1.r[1], P3, 0.5);
    return [a.l.slice(), [a.r[0], a.r[1], h1.l[2]], b.l.slice(), [b.r[0], b.r[1], P3]];
  }
  function hookSegs(S0, inn, caps, h) {
    const T = inn[2], E = caps[2][2];
    const lerpP = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    if (h === 0) return [inn, caps[0], caps[1], caps[2]];
    if (h > 0) {
      // target: single round cap S0→E, tangent to the diagonal edge at S0 and the outer edge at E
      const m = h / 4;
      const k = Math.hypot(E[0] - S0[0], E[1] - S0[1]) * 0.55;
      const c1 = [S0[0] + DIAG[0] * k, S0[1] + DIAG[1] * k];
      const c2 = [E[0], E[1] + k];
      const tgt = sub4(S0, c1, c2, E);
      const org = [inn, caps[0], caps[1], caps[2]];
      return org.map((s, i) => s.map((p, j) => lerpP(p, tgt[i][j], m)));
    }
    // target: two outward-bowed curves meeting at a single sharp apex (no straight runs)
    const m = -h / 4;
    const mid = lerpP(T, E, 0.5);
    const apex = lerpP(mid, caps[0][2], 1.45);
    const nrm = (v) => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };
    const dT = nrm([T[0] - inn[1][0], T[1] - inn[1][1]]);
    const dE = nrm([caps[2][1][0] - E[0], caps[2][1][1] - E[1]]);
    const rT = Math.hypot(apex[0] - T[0], apex[1] - T[1]);
    const rE = Math.hypot(apex[0] - E[0], apex[1] - E[1]);
    // side 1: cubic T→apex; c1 continues the inner tangent, c2 bows outward off the chord
    const chT = [apex[0] - T[0], apex[1] - T[1]];
    let n1 = nrm([-chT[1], chT[0]]);
    const midTA = lerpP(T, apex, 0.5);
    if (n1[0] * (E[0] - midTA[0]) + n1[1] * (E[1] - midTA[1]) > 0) n1 = [-n1[0], -n1[1]];
    const c1b = [T[0] + chT[0] * 0.62 + n1[0] * rT * 0.34, T[1] + chT[1] * 0.62 + n1[1] * rT * 0.34];
    const s1 = splitCubic(T, [T[0] + dT[0] * rT * 0.5, T[1] + dT[1] * rT * 0.5], c1b, apex, 0.5);
    // side 2: cubic apex→E; c1 bows outward off the chord, c2 tangent-matches the outer edge
    const ch = [E[0] - apex[0], E[1] - apex[1]];
    let n2 = nrm([-ch[1], ch[0]]);
    const midAE = lerpP(apex, E, 0.5);
    if (n2[0] * (T[0] - midAE[0]) + n2[1] * (T[1] - midAE[1]) > 0) n2 = [-n2[0], -n2[1]];
    const c2a = [apex[0] + ch[0] * 0.25 + n2[0] * rE * 0.22, apex[1] + ch[1] * 0.25 + n2[1] * rE * 0.22];
    const c2b = [E[0] + dE[0] * rE * 0.5, E[1] + dE[1] * rE * 0.5];
    const tgt = [s1.l.slice(), [s1.r[0], s1.r[1], apex], [c2a, c2b, E]];
    return [inn].concat(caps.map((s, i) => s.map((p, j) => lerpP(p, tgt[i][j], m))));
  }
  // top-stroke geometry (low = point reflection)
  const TG = {
    A: [1616.221, 706.656], sc1: [1616.228, 648.419], sc2: [1596.168, 589.934], B: [1554.792, 542.676],
    S0: [1481.3, 837.094],
    inn: [[1508.123, 867.729], [1525.936, 906.436], [1530.367, 949.163]],
    caps: [[[1531.472, 959.821], [1542.684, 966.429], [1552.304, 961.71]],
           [[1560.861, 957.513], [1569.027, 952.199], [1576.562, 945.602]],
           [[1602.983, 922.468], [1616.487, 890.068], [1616.464, 857.507]]]
  };
  // mid-stroke lower-right hook (upper-left = reflection)
  const MG = {
    S0: [1481.394, 1790.083],
    inn: [[1508.146, 1820.677], [1525.908, 1859.316], [1530.348, 1901.957]],
    caps: [[[1531.453, 1912.567], [1542.585, 1919.16], [1552.196, 1914.532]],
           [[1560.796, 1910.391], [1569.001, 1905.113], [1576.565, 1898.49]],
           [[1602.953, 1875.385], [1615.97, 1843.039], [1615.983, 1810.521]]]
  };
  function markPaths(cfg) {
    const c = norm(cfg);
    const h = c.hook || 0;
    if (h === 0 && !(c.curve || 0)) return { top: P.top, low: P.low, mid: P.mid };
    const pf = (t) => (pt) => { const q = t(pt); return q[0].toFixed(3) + ',' + q[1].toFixed(3); };
    const segf = (t) => (s) => 'C' + s.map(pf(t)).join(' ');
    const id = (q) => q;
    // CURVE reshapes the stroke TIP (top stroke's left cap; point-reflected on the low
    // stroke): cu<0 sharpens it until both edges meet at a point; cu>0 rounds the whole
    // tip out into a large lobe. The outer shoulder stays stock.
    const cu = c.curve || 0;
    const shA = TG.A, shB = TG.B, sh1 = TG.sc1, sh2 = TG.sc2;
    const S = [985.694, 174.438], D0 = [955.304, 236.036];
    const lp2 = (a, b2, t) => [a[0] + (b2[0] - a[0]) * t, a[1] + (b2[1] - a[1]) * t];
    let tipS = S;
    let tipSegs = [[[964.472, 174.438], [945.375, 191.813], [946.188, 213.019]],
                   [[946.524, 221.781], [949.996, 229.682], D0]];
    if (cu > 0) {
      // true tangent circle: touches the top edge at (cx, Sy) and the diagonal edge,
      // approximated by two cubic arc segments — a fully round tip at max
      const m = Math.min(1, cu / 4);
      const cx = S[0] + 120 * m;
      const r = (0.7524 * cx - 678.19) / 1.6588;
      const C0 = [cx, S[1] + r];
      const a0 = -Math.PI / 2;
      const aE = Math.atan2(0.6588, -0.7524);
      let sweep = aE - a0; if (sweep > 0) sweep -= 2 * Math.PI;
      tipS = [cx, S[1]];
      tipSegs = [];
      const nSeg = 2, ds = sweep / nSeg;
      for (let i2 = 0; i2 < nSeg; i2++) {
        const a = a0 + ds * i2;
        const kk = (4 / 3) * Math.tan(ds / 4) * r;
        const p0 = [C0[0] + r * Math.cos(a), C0[1] + r * Math.sin(a)];
        const p3 = [C0[0] + r * Math.cos(a + ds), C0[1] + r * Math.sin(a + ds)];
        tipSegs.push([
          [p0[0] - kk * Math.sin(a), p0[1] + kk * Math.cos(a)],
          [p3[0] + kk * Math.sin(a + ds), p3[1] - kk * Math.cos(a + ds)],
          p3
        ]);
      }
    } else if (cu < 0) {
      const m = -cu / 4;
      const Ppt = [901.37, 174.438]; // intersection of the top edge and the diagonal edge
      const t1 = [lp2(S, Ppt, 1 / 3), lp2(S, Ppt, 2 / 3), Ppt];
      const t2 = [lp2(Ppt, D0, 1 / 3), lp2(Ppt, D0, 2 / 3), D0];
      tipSegs = [tipSegs[0].map((p2, i) => lp2(p2, t1[i], m)), tipSegs[1].map((p2, i) => lp2(p2, t2[i], m))];
    }
    const tSegs = hookSegs(TG.S0, TG.inn, TG.caps, h);
    const topPath = (t) => {
      const p = pf(t);
      return 'M' + p(shA) + 'C' + p(sh1) + ' ' + p(sh2) + ' ' + p(shB) +
        'L' + p([1306.796, 259.43]) +
        'C' + p([1259.379, 205.271]) + ' ' + p([1193.673, 176.866]) + ' ' + p([1126.984, 174.823]) +
        'L' + p([1126.996, 174.438]) + 'L' + p(tipS) +
        tipSegs.map(segf(t)).join('') +
        'L' + p([1481.393, 836.905]) + 'L' + p(TG.S0) +
        tSegs.map(segf(t)).join('') +
        'L' + p([1616.464, 706.731]) + 'Z';
    };
    const mSegs = hookSegs(MG.S0, MG.inn, MG.caps, h);
    const F = pf(id);
    const mid = 'M' + F([1616.221, 1659.618]) +
      'C' + F([1616.246, 1601.362]) + ' ' + F([1596.187, 1542.854]) + ' ' + F([1554.802, 1495.577]) +
      'L' + F([1000, 861.912]) + 'L' + F([518.606, 312.088]) + 'L' + F([518.606, 311.8]) +
      mSegs.map(segf(RFL)).join('') +
      'L' + F([383.534, 291.362]) + 'L' + F([383.534, 442.265]) + 'L' + F([383.778, 442.265]) +
      'C' + F([383.753, 500.521]) + ' ' + F([403.812, 559.029]) + ' ' + F([445.197, 606.306]) +
      'L' + F([1000, 1239.971]) + 'L' + F([1481.394, 1789.795]) + 'L' + F(MG.S0) +
      mSegs.map(segf(id)).join('') +
      'L' + F([1616.466, 1810.521]) + 'L' + F([1616.466, 1659.618]) + 'Z';
    return { top: topPath(id), low: topPath(RFL), mid };
  }
  // margin covers max spread + dilate
  function svgMarkup(cfg, opts) {
    const c = norm(cfg), o = opts || {};
    const ink = o.ink || '#1A1A1A';
    const fills = o.tricolor ? { mid: '#9FB06D', top: '#668DC9', low: '#E68E57' } : { mid: ink, top: ink, low: ink };
    const m = 160;
    const f = filterAttrs(c);
    const fdef = f ? `<filter id="alw" x="-30%" y="-30%" width="160%" height="160%"><feMorphology operator="${f.operator}" radius="${f.radius}"/></filter>` : '';
    const MP = markPaths(c);
    const g = (w) => `<path d="${MP[w]}" fill="${fills[w]}" transform="${strokeTransform(w, c)}"/>`;
    const mark = `<g${f ? ' filter="url(#alw)"' : ''}>${g('mid')}${g('top')}${g('low')}</g>`;
    const word = (t, arr) => `<g${t ? ` transform="${t}"` : ''} fill="${ink}">` + (arr || WM).map((d) => `<path d="${d}"/>`).join('') + '</g>';
    let vb, body;
    if (c.text === 'stacked') {
      vb = `${62 - m} ${VB.y - m} ${1876 + 2 * m} ${2825 - VB.y + 2 * m}`;
      body = mark + word('');
    } else if (c.text === 'horizontal') {
      // exact geometry of the official horizontal lockup, mapped into the mark's frame
      vb = `${VB.x - m} ${VB.y - m} ${7727.2 - VB.x + 2 * m} ${VB.h + 2 * m}`;
      body = mark + word('translate(300.959 88.015) scale(2.50291)', WMH);
    } else {
      vb = `${VB.x - m} ${VB.y - m} ${VB.w + 2 * m} ${VB.h + 2 * m}`;
      body = mark;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><defs>${fdef}</defs>${body}</svg>`;
  }

  // Full logo WITH shadow as one self-contained SVG, computed from a published config
  // (cfg.shadow = {light:{nx,ny}, mode, dim, feather, dark, hideShadow}) — same math and
  // markup as the installation's export, so the main site renders the identical look live.
  function svgWithShadow(cfg, opts) {
    const c = norm(cfg), o = opts || {};
    const sh = (cfg && cfg.shadow) || { light: { nx: 0.18, ny: -0.22 }, mode: 1, dim: '3d', feather: false, dark: false, hideShadow: false };
    const vw = o.vw || 1280, vh = o.vh || 800, vmin = Math.min(vw, vh);
    const dark = o.dark !== undefined ? !!o.dark : !!sh.dark;
    const ink = o.ink || (c.inkColor != null ? c.inkColor : (dark ? '#F2EFE9' : '#1A1A1A'));
    const fills = o.mono ? { mid: ink, top: ink, low: ink } : {
      mid: c.shMid != null ? c.shMid : '#9BB365',
      top: c.shTop != null ? c.shTop : '#5B8FDB',
      low: c.shBot != null ? c.shBot : '#F2894F'
    };
    // steady-state projection (installation tick at rest): z=900, h=12, mode dir=1
    const dx = -(sh.light && sh.light.nx || 0) * vw, dy = -(sh.light && sh.light.ny || 0) * vh;
    const persp = 12 / (900 - 12);
    const orthoK = 0.0375 * (0.6 + 900 / 1500);
    const ox = dx * orthoK, oy = dy * orthoK, scale = 1;
    const feather = !!sh.feather;
    const blur = Math.min(60, Math.max(0.5, (0.6 + 300 * persp * 0.02) * 0.35 * (feather ? 11 : 1)));
    const coreBlur = feather ? blur * 0.75 : Math.min(blur * 0.18, 3);
    const twin = sh.mode === 2 ? 1 : 0;
    const is3d = sh.dim === '3d';
    let wx = -dx * 0.1, wy = -dy * 0.1;
    const capW = vmin * 0.07, mL = Math.hypot(wx, wy);
    if (mL > capW) { wx *= capW / mL; wy *= capW / mL; }
    // shadow geometry is MARK-relative: same u for every lockup, so the logo+shadow
    // looks identical whether the wordmark is present or not
    const u = 1240 / (0.23 * vmin);
    let svg = svgMarkup(c, { ink: ink });
    const MP = markPaths(c);
    const tri = ['mid', 'top', 'low'].map(function (w) { return '<path d="' + MP[w] + '" fill="' + fills[w] + '" transform="' + strokeTransform(w, c) + '"/>'; }).join('');
    const off = function (dx2, dy2, s) { return 'translate(' + dx2.toFixed(1) + ' ' + dy2.toFixed(1) + ') translate(1060 1125) scale(' + s.toFixed(4) + ') translate(-1060 -1125)'; };
    let defs = '', shm = '', pad = 0;
    if (sh.hideShadow) {
      pad = 30;
    } else if (is3d) {
      // many thin slices via <use> — no morphology filter (feMorphology rasterizes in device px
      // and stops eroding at small render sizes, fattening the walls and closing the whitespace)
      const N = feather ? 60 : 160;
      defs += ['mid', 'top', 'low'].map(function (w) { return '<path id="w-' + w + '" d="' + MP[w] + '" transform="' + strokeTransform(w, c) + '"/>'; }).join('');
      for (let i = N; i >= 1; i--) {
        const f = i / N;
        let flt = '';
        if (feather) {
          defs += '<filter id="shw' + i + '" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="' + (f * f * 2.7 * u).toFixed(1) + '"/></filter>';
          flt = ' filter="url(#shw' + i + ')"';
        }
        shm += '<g transform="translate(' + (wx * f * u).toFixed(1) + ' ' + (wy * f * u).toFixed(1) + ')"' + flt + '>' +
          ['mid', 'top', 'low'].map(function (w) { return '<use href="#w-' + w + '" fill="' + fills[w] + '" stroke="' + fills[w] + '" stroke-width="3"/>'; }).join('') + '</g>';
      }
      pad = Math.hypot(wx, wy) * u + 30 + (feather ? 27 * u : 0);
    } else {
      defs = '<filter id="shb" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="' + (blur * u).toFixed(1) + '"/></filter><filter id="shc" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="' + (coreBlur * u).toFixed(1) + '"/></filter>';
      const blend = dark ? 'screen' : 'multiply';
      const pen = function (dx2, dy2) { return '<g style="isolation:isolate;mix-blend-mode:' + blend + '"><g transform="' + off(dx2, dy2, scale) + '" filter="url(#shb)">' + tri + '</g><g transform="' + off(dx2, dy2, scale) + '" filter="url(#shc)">' + tri + '</g></g>'; };
      shm = pen(ox * u, oy * u);
      if (twin > 0.5) shm += '<g style="mix-blend-mode:' + blend + '" transform="' + off(-ox * u, -oy * u, scale) + '" filter="url(#' + (feather ? 'shb' : 'shc') + ')">' + tri + '</g>';
      pad = (Math.hypot(ox, oy) * scale + blur * 3) * u + 30;
    }
    svg = svg.replace('</defs>', defs + '</defs>' + shm);
    svg = svg.replace(/viewBox="([^"]+)"/, function (mm, vb) {
      // pad, then squarify: expand the shorter axis symmetrically so exports are 1:1 and centered
      const p = vb.split(/\s+/).map(Number);
      let x = p[0] - pad, y = p[1] - pad, w = p[2] + 2 * pad, h = p[3] + 2 * pad;
      if (o.square) { const s = Math.max(w, h); x -= (s - w) / 2; y -= (s - h) / 2; w = s; h = s; }
      return 'viewBox="' + x.toFixed(0) + ' ' + y.toFixed(0) + ' ' + w.toFixed(0) + ' ' + h.toFixed(0) + '"';
    });
    return svg.replace('<svg ', '<svg style="isolation:isolate" ');
  }

  window.AlephLogo = { paths: P, markPaths, WM, WMH, viewBox: VB, DEFAULTS, norm, load, save, presets, savePreset, deletePreset, strokeTransform, rootTransform, filterAttrs, svgMarkup, svgWithShadow, KEY_ACTIVE, KEY_PRESETS };
})();
