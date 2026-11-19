/* =========================================================
   ODN Suivi — Algérie Télécom
   DGD · Fiches de tirage (FDT) · Attachement · BPE unique
   ========================================================= */
(() => {
  'use strict';

  const STORE_KEY = 'odn_suivi_v1';
  const SNAP_KEY = 'odn_suivi_v1_snapshots';
  const SNAP_LIMIT = 12;
  const APP_BACKUP = { app: 'ODN Suivi', schema: 1 };

  /* ---------------- Icônes ---------------- */
  const ICONS = {
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    route: '<circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/>',
    fileCheck: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    print: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    sheet: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h2M14 13h2M8 17h2M14 17h2"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z"/>',
    money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    up: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    down: '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    columns: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/>',
    ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    history: '<path d="M3 12a9 9 0 1 0 2.64-6.36L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>'
  };
  const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ''}</svg>`;

  /* ---------------- Colonnes de tirage par défaut ---------------- */
  const DEFAULT_COLS = [
    { key: 'fo12_c', group: 'FO 12', label: 'Conduite', code: 'RA502A' },
    { key: 'fo12_f', group: 'FO 12', label: 'Façade', code: 'RA504A' },
    { key: 'fo12_a', group: 'FO 12', label: 'Aérien', code: 'RA503A' },
    { key: 'fo24_c', group: 'FO 24', label: 'Conduite', code: 'RA502A' },
    { key: 'fo24_f', group: 'FO 24', label: 'Façade', code: 'RA504A' },
    { key: 'fo24_a', group: 'FO 24', label: 'Aérien', code: 'RA503A' },
    { key: 'fo36_c', group: 'FO 36', label: 'Conduite', code: 'RA502A' },
    { key: 'fo36_f', group: 'FO 36', label: 'Façade', code: 'RA504A' },
    { key: 'fo36_a', group: 'FO 36', label: 'Aérien', code: 'RA503A' },
    { key: 'fo72_c', group: 'FO 72', label: 'Conduite', code: 'RA502A' },
    { key: 'fo72_f', group: 'FO 72', label: 'Façade', code: 'RA504A' },
    { key: 'fo72_a', group: 'FO 72', label: 'Aérien', code: 'RA503A' },
    { key: 'pot625', group: 'Poteaux', label: '6,25 m', code: '506' },
    { key: 'pot7', group: 'Poteaux', label: '7 m', code: '507' },
    { key: 'pot8', group: 'Poteaux', label: '8 m', code: '508' },
    { key: 'gm_fp', group: 'Gaines métalliques', label: 'Façade et poteau', code: '805' },
    { key: 'pbo', group: 'PBO', label: 'Façade / Immeuble', code: '' },
    { key: 'racc', group: 'Raccordement', label: 'Brin closer', code: 'RA804' }
  ];
  const DEFAULT_ACTIVE = ['fo12_c', 'fo12_f', 'fo12_a', 'fo24_c', 'fo24_f', 'fo24_a', 'fo36_c', 'fo72_c', 'pot625', 'pot7', 'pot8', 'gm_fp', 'pbo', 'racc'];

  /* ---------------- Utilitaires ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const up = (s) => String(s || '').trim().toUpperCase();
  const arr = (x) => (Array.isArray(x) ? x : x ? [x] : []);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (v) => { const n = parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.')); return isFinite(n) ? n : 0; };
  const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const fmt = (n, d = 2) => (Number(n) || 0).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const fq = (n) => (Number(n) || 0).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const money = (n) => fmt(n, 2) + ' DA';
  const pad2 = (n) => String(n).padStart(2, '0');
  const today = () => new Date().toISOString().slice(0, 10);
  const frDate = (iso) => { if (!iso) return ''; const s = String(iso); if (s.includes('T')) return fmtDT(s); const [y, m, d] = s.split('-'); return d ? `${d}/${m}/${y}` : s; };
  const fmtDT = (iso) => { if (!iso) return ''; const d = new Date(iso); if (isNaN(d)) return String(iso); return `${pad2(d.getDate())}/${pad2(d.getMonth()+1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
  const inVal = (n) => (n ? String(r2(n)).replace('.', ',') : '');

  /* ---------------- État ---------------- */
  let S = load() || fromSeed();
  let ui = { fdtSel: null, dgdFilter: '', bpeFilter: '', bpeCat: '', collapsed: {}, hideZero: true, projFilter: 'all', projSearch: '' };

  function fromSeed() {
    const seed = window.ODN_SEED || { bpe: [], projects: [] };
    const autoCodes = new Set(DEFAULT_COLS.map((c) => up(c.code)));
    const st = {
      version: 1, theme: 'dark', tva: 19,
      bpe: arr(seed.bpe).map((b) => ({ code: b.code, des: b.des, unit: b.unit, pu: Number(b.pu) || 0, cat: b.cat || '' })),
      cols: clone(DEFAULT_COLS),
      projects: [], current: null, view: 'dgd'
    };
    arr(seed.projects).forEach((p) => {
      st.projects.push({
        id: p.id || uid(), createdAt: Date.now(), status: 'active', info: Object.assign({}, p.info),
        activeCols: DEFAULT_ACTIVE.slice(),
        dgd: arr(p.dgd).map((d) => ({ id: uid(), code: d.code, qc: Number(d.qc) || 0, qm: autoCodes.has(up(d.code)) ? 0 : Number(d.qr) || 0 })),
        dgdIgnored: [],
        fdts: normFdts(p.fdts),
        attach: { num: '01', date: today() },
        journal: []
      });
    });
    st.current = st.projects[0] ? st.projects[0].id : null;
    if (!st.current) st.view = 'projects';
    return st;
  }
  function normFdts(fdts) {
    return arr(fdts).map((f) => ({
      id: f.id || uid(), name: f.name || 'FDT', uplink: f.uplink || '',
      lines: arr(f.lines).map((l) => ({
        id: l.id || uid(), name: l.name || 'LIGNE',
        closers: arr(l.closers).map((c) => {
          // Migration: ancien modèle (choix unique par tronçon) -> 2 valeurs par closer
          let pboFa = num(c.pboFa), pboIm = num(c.pboIm);
          const segs = arr(c.segs).map((s) => {
            if (s && s.pbo === 'RA801') pboFa += 1;
            else if (s && s.pbo === 'RA803') pboIm += 1;
            return { id: (s && s.id) || uid(), v: Object.assign({}, (s && s.v) || {}), obs: (s && s.obs) || '' };
          });
          return { id: c.id || uid(), racc: num(c.racc), pboFa, pboIm, segs };
        })
      }))
    }));
  }
  function normalizeState(st) {
    if (!st || typeof st !== 'object') return null;
    // Accept wrapped backup payload { meta, data } or { _backup, ...state }
    let data = st;
    if (st.data && typeof st.data === 'object' && (Array.isArray(st.data.bpe) || Array.isArray(st.data.projects))) data = st.data;
    if (data._backup && Array.isArray(data.bpe)) { const c = clone(data); delete c._backup; data = c; }
    if (!Array.isArray(data.bpe) && !Array.isArray(data.projects) && !Array.isArray(data.cols)) return null;
    const out = Object.assign({
      version: 1, theme: 'dark', tva: 19, bpe: [], cols: clone(DEFAULT_COLS), projects: [], current: null, view: 'dashboard',
      lastSavedAt: null, lastBackupAt: null
    }, data);
    out.bpe = arr(out.bpe).map((b) => ({ code: String(b && b.code || '').trim(), des: String(b && b.des || ''), unit: String(b && b.unit || ''), pu: num(b && b.pu), cat: String(b && b.cat || 'Divers') })).filter((b) => b.code);
    out.cols = Array.isArray(out.cols) && out.cols.length ? out.cols.map((c) => ({ key: String(c && c.key || uid()), group: String(c && c.group || ''), label: String(c && c.label || ''), code: String(c && c.code || '') })) : clone(DEFAULT_COLS);
    // Migration : garantir la présence des colonnes PBO et Raccordement brin closer, juste après Gaines métalliques
    (() => {
      const defs = [
        { key: 'pbo', group: 'PBO', label: 'Façade / Immeuble', code: '' },
        { key: 'racc', group: 'Raccordement', label: 'Brin closer', code: 'RA804' }
      ];
      const extras = defs.map((d) => {
        const found = out.cols.find((c) => c.key === d.key);
        return found || Object.assign({}, d);
      });
      out.cols = out.cols.filter((c) => c.key !== 'pbo' && c.key !== 'racc');
      const gi = out.cols.findIndex((c) => c.key === 'gm_fp');
      const at = gi >= 0 ? gi + 1 : out.cols.length;
      out.cols.splice(at, 0, ...extras);
    })();
    out.projects = arr(out.projects).map((p) => {
      p = p && typeof p === 'object' ? p : {};
      p.id = p.id || uid();
      p.info = Object.assign({ nom: '', do: '', cmp: '', entreprise: '', surveillant: '', objet: '', ods: '', bc: '', contrat: '', dateDebut: '' }, p.info || {});
      // Migration : les projets existants (sans état) restent actifs par défaut.
      p.status = ['done', 'acheve', 'achevé', 'completed'].includes(String(p.status || '').toLowerCase()) ? 'done' : 'active';
      p.fdts = normFdts(p.fdts);
      p.activeCols = Array.isArray(p.activeCols) ? p.activeCols.slice() : DEFAULT_ACTIVE.slice();
      ['pot625', 'pot7', 'pot8', 'gm_fp', 'pbo', 'racc'].forEach((k) => { if (!p.activeCols.includes(k)) p.activeCols.push(k); });
      p.attach = Object.assign({ num: '01', date: today() }, p.attach || {});
      p.dgd = arr(p.dgd).map((r) => ({ id: (r && r.id) || uid(), code: String(r && r.code || ''), qc: num(r && r.qc), qm: num(r && r.qm) }));
      p.dgdIgnored = arr(p.dgdIgnored).map((x) => String(x || ''));
      p.dotation = arr(p.dotation).map((r, idx) => {
        if (r && Array.isArray(r.items)) {
          return {
            id: r.id || uid(), num: String(r.num || ''), date: String(r.date || ''),
            items: arr(r.items).map((it) => ({ id: (it && it.id) || uid(), des: String(it && it.des || ''), unit: String(it && it.unit || ''), qdotee: num(it && it.qdotee), quse: num(it && it.quse), obs: String(it && it.obs || '') }))
          };
        }
        // migration ancien format (ligne plate)
        return {
          id: (r && r.id) || uid(), num: `Bon ${pad2(idx + 1)}`, date: '',
          items: [{ id: uid(), des: String(r && r.des || ''), unit: String(r && r.unit || ''), qdotee: num(r && r.qdotee), quse: num(r && r.quse), obs: String(r && r.obs || '') }]
        };
      });
      p.reversement = arr(p.reversement).map((r, idx) => ({
        id: (r && r.id) || uid(), num: String(r && r.num || `Bon ${pad2(idx + 1)}`), date: String(r && r.date || ''),
        items: arr(r && r.items).map((it) => ({ id: (it && it.id) || uid(), des: String(it && it.des || ''), unit: String(it && it.unit || ''), qdotee: num(it && it.qdotee), qte: num(it && it.qte), obs: String(it && it.obs || '') }))
      }));
      p.journal = arr(p.journal).filter((e) => e && e.at && e.msg).map((e) => ({
        id: e.id || uid(), at: String(e.at), type: String(e.type || 'autre'), action: String(e.action || ''),
        msg: String(e.msg), fdt: String(e.fdt || ''), line: String(e.line || ''), closer: String(e.closer || ''), seg: String(e.seg || '')
      }));
      return p;
    });
    if (!out.current || !out.projects.find((p) => p.id === out.current)) out.current = out.projects[0] ? out.projects[0].id : null;
    const validViews = ['dashboard','dgd','fdt','attach','devis','dotation','reversement','projects','bpe','settings'];
    if (!validViews.includes(out.view)) out.view = out.current ? 'dashboard' : 'projects';
    out.tva = num(out.tva); if (out.tva < 0 || out.tva > 100) out.tva = 19;
    return out;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      const st = JSON.parse(raw);
      return normalizeState(st);
    } catch (e) { console.error(e); return null; }
  }

  function storageInfo() {
    let bytes = 0;
    try { const a = localStorage.getItem(STORE_KEY) || ''; const b = localStorage.getItem(SNAP_KEY) || ''; bytes = (a.length + b.length) * 2; } catch (e) {}
    return { bytes, kb: Math.round(bytes / 102.4) / 10 };
  }

  function snapshotMeta() {
    const p = S || {}; const projects = arr(p.projects);
    return { at: new Date().toISOString(), app: APP_BACKUP.app, schema: APP_BACKUP.schema, projects: projects.length, bpe: arr(p.bpe).length, fdts: projects.reduce((a, x) => a + arr(x.fdts).length, 0) };
  }

  function readSnapshots() {
    try { const v = JSON.parse(localStorage.getItem(SNAP_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function writeSnapshots(list) {
    try { localStorage.setItem(SNAP_KEY, JSON.stringify(arr(list).slice(0, SNAP_LIMIT))); } catch (e) { console.error(e); toast('Impossible d\'enregistrer le point de restauration : ' + e.message, true); }
  }
  function createSnapshot(label, silent) {
    try {
      const snap = { id: uid(), label: label || 'Point de restauration', meta: snapshotMeta(), data: clone(S) };
      const list = readSnapshots().filter((s) => s && s.id !== snap.id);
      list.unshift(snap);
      writeSnapshots(list);
      if (!silent) toast('Point de restauration créé');
      return snap;
    } catch (e) { if (!silent) toast('Erreur point de restauration : ' + e.message, true); return null; }
  }

  // Téléchargement classique (secours si la boîte native n'est pas disponible)
  function legacyDownload(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 600);
  }

  // Ouvre la boîte de dialogue native « Enregistrer sous » (Chrome / Edge)
  function saveBlob(blob, filename) {
    if (typeof window.showSaveFilePicker === 'function') {
      return window.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: 'Fichier JSON', accept: { 'application/json': ['.json'] } }]
      }).then((handle) => handle.createWritable()
        .then((w) => w.write(blob).then(() => w.close())))
        .then(() => true)
        .catch((err) => {
          if (err && err.name === 'AbortError') return false; // enregistrement annulé par l'utilisateur
          legacyDownload(blob, filename);
          return true;
        });
    }
    legacyDownload(blob, filename);
    return Promise.resolve(true);
  }

  function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    return saveBlob(blob, filename);
  }

  function exportBackup(label, fileBase) {
    const payload = { meta: Object.assign(snapshotMeta(), { exportedAt: new Date().toISOString(), label: label || 'Export manuel' }), data: clone(S) };
    const raw = String(fileBase || 'ODN').trim() || 'ODN';
    const base = raw.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').replace(/[. ]+$/g, '').slice(0, 90) || 'ODN';
    const filename = `${base}-sauvegarde-${today()}.json`;
    return downloadJSON(payload, filename).then((ok) => {
      if (ok === false) return false; // boîte de dialogue annulée
      S.lastBackupAt = new Date().toISOString();
      save(true);
      toast('Sauvegarde exportée');
      return true;
    });
  }

  function importBackupObject(obj, opts) {
    opts = opts || {};
    const ns = normalizeState(obj);
    if (!ns) throw new Error('Format invalide : données BPE/projets introuvables');
    if (arr(ns.bpe).length === 0 && arr(ns.projects).length === 0 && !opts.allowEmpty) throw new Error('Sauvegarde vide ou invalide');
    if (!opts.skipSnapshot) createSnapshot('Avant import (' + today() + ')', true);
    localStorage.setItem(STORE_KEY, JSON.stringify(ns));
    S = load() || ns;
    render();
    toast('Sauvegarde importée avec succès');
  }

  let saveTimer = null;
  function save(immediate) {
    clearTimeout(saveTimer);
    const doIt = () => {
      try {
        S.lastSavedAt = new Date().toISOString();
        localStorage.setItem(STORE_KEY, JSON.stringify(S));
        const t = new Date();
        const el = $('#saveState');
        if (el) el.innerHTML = `<span class="dot"></span>Enregistré à ${pad2(t.getHours())}:${pad2(t.getMinutes())}`;
      } catch (e) {
        try { toast('Erreur d\'enregistrement : ' + e.message, true); } catch (e2) {}
      }
    };
    const el0 = $('#saveState');
    if (el0) el0.innerHTML = `<span class="dot" style="background:var(--warn);box-shadow:0 0 0 4px rgba(245,158,11,.18)"></span>Enregistrement…`;
    if (immediate) doIt(); else saveTimer = setTimeout(doIt, 700);
  }

  const proj = () => S.projects.find((p) => p.id === S.current) || null;
  const projStatus = (p) => (p && p.status === 'done' ? 'done' : 'active');
  const statusLabel = (p) => (projStatus(p) === 'done' ? 'Achevé' : 'En cours');
  const isProjLocked = (p) => projStatus(p) === 'done';
  function projectStateBadge(p) {
    const done = projStatus(p) === 'done';
    return `<span class="proj-state ${done ? 'done' : 'active'}" title="État du projet : ${statusLabel(p)}">${done ? ic('check') : '<span class="state-dot"></span>'}${statusLabel(p)}</span>`;
  }
  const bpeIndex = () => { const m = {}; S.bpe.forEach((b, i) => { m[up(b.code)] = Object.assign({ _i: i }, b); }); return m; };
  const colMap = () => { const m = {}; S.cols.forEach((c) => { m[c.key] = c; }); return m; };
  const activeCols = (p) => { const act = new Set((p && p.activeCols) || []); return S.cols.filter((c) => act.has(c.key)); };

  /* Journal désactivé : conservation d'une fonction no-op pour compatibilité */
  function logEvent() {}

  /* ---------------- Calculs ---------------- */
  function sumSegs(segs, into) {
    const t = into || {};
    segs.forEach((s) => { for (const k in s.v) { const n = num(s.v[k]); if (n) t[k] = (t[k] || 0) + n; } });
    return t;
  }
  function mergeTotals(into, t) { for (const k in t) into[k] = (into[k] || 0) + t[k]; return into; }
  const closerTotals = (c) => { const t = sumSegs(c.segs); const r = num(c.racc); if (r) t.racc = (t.racc || 0) + r; return t; };
  const lineTotals = (l) => { const t = {}; l.closers.forEach((c) => mergeTotals(t, closerTotals(c))); return t; };
  const fdtTotals = (f) => { const t = {}; f.lines.forEach((l) => mergeTotals(t, lineTotals(l))); return t; };
  const projTotals = (p) => { const t = {}; p.fdts.forEach((f) => mergeTotals(t, fdtTotals(f))); return t; };
  const sumObj = (t, keys) => (keys || Object.keys(t)).reduce((a, k) => a + (t[k] || 0), 0);
  const isCable = (k) => /^fo/i.test(k) || (colMap()[k] && up(colMap()[k].code).startsWith('RA50'));

  /** Un article est-il alimenté automatiquement par une colonne de fiche de tirage ? */
  const AUTO_PBO_CODES = new Set(['RA801', 'RA803']);
  const isLinkedCode = (code) => { const c = up(code); return !!c && (AUTO_PBO_CODES.has(c) || S.cols.some((col) => up(col.code) === c)); };

  /** Nombre de PBO par type (valeurs saisies par closer) */
  function pboCounts(p) {
    let ra801 = 0, ra803 = 0;
    arr(p && p.fdts).forEach((f) => arr(f.lines).forEach((l) => arr(l.closers).forEach((c) => {
      ra801 += num(c.pboFa);
      ra803 += num(c.pboIm);
    })));
    return { ra801, ra803 };
  }

  /** Quantités automatiques par code BPE (issues des fiches de tirage) */
  function uplinkTotal(p) {
    return arr(p && p.fdts).reduce((a, f) => a + num(f.uplink), 0);
  }
  function autoByCode(p) {
    const tot = projTotals(p), cm = colMap(), out = {};
    for (const k in tot) { const c = cm[k]; if (c && c.code) { const code = up(c.code); out[code] = (out[code] || 0) + tot[k]; } }
    const pb = pboCounts(p);
    if (pb.ra801) out['RA801'] = (out['RA801'] || 0) + pb.ra801;
    if (pb.ra803) out['RA803'] = (out['RA803'] || 0) + pb.ra803;
    const upk = uplinkTotal(p);
    if (upk) out['RA502A'] = (out['RA502A'] || 0) + upk;
    return out;
  }
  function autoDetail(p, code) {
    const tot = projTotals(p), cm = colMap();
    const lines = Object.keys(tot).filter((k) => cm[k] && up(cm[k].code) === up(code)).map((k) => `${cm[k].group} ${cm[k].label} : ${fq(tot[k])}`);
    if (up(code) === 'RA502A') { const upk = uplinkTotal(p); if (upk) lines.push(`UPLINK : ${fq(upk)} ml`); }
    return lines;
  }

  function codeBreakdownByFdt(p, code) {
    const C = up(code), cm = colMap();
    const keys = Object.keys(cm).filter((k) => cm[k] && up(cm[k].code) === C);
    const out = [];
    let total = 0;
    arr(p && p.fdts).forEach((f) => {
      const ft = fdtTotals(f);
      const items = [];
      keys.forEach((k) => { const v = num(ft[k]); if (v) items.push({ label: `${cm[k].group} ${cm[k].label}`, value: v, kind: 'cable' }); });
      if (C === 'RA801' || C === 'RA803') {
        let cnt = 0;
        arr(f.lines).forEach((l) => arr(l.closers).forEach((c) => { cnt += C === 'RA801' ? num(c.pboFa) : num(c.pboIm); }));
        if (cnt) items.push({ label: `PBO ${C === 'RA801' ? 'Façade' : 'Immeuble'}`, value: cnt, kind: 'pbo' });
      }
      if (C === 'RA502A') { const uv = num(f.uplink); if (uv) items.push({ label: 'UPLINK', value: uv, kind: 'uplink' }); }
      const sum = items.reduce((a, it) => a + it.value, 0);
      if (sum) { out.push({ fdt: f.name || 'FDT', uplink: num(f.uplink), items, sum }); total += sum; }
    });
    return { items: out, total: r2(total), keys };
  }

  /** Ajoute au DGD les articles qui ont des quantités dans les fiches de tirage (sauf ceux retirés volontairement). */
  function syncDgdFromFdt(p) {
    if (!p) return false;
    const auto = autoByCode(p);
    const inDgd = new Set(p.dgd.map((r) => up(r.code)));
    const ignored = new Set(arr(p.dgdIgnored).map(up));
    const bm = bpeIndex();
    let changed = false;
    Object.keys(auto).forEach((code) => {
      if (!(auto[code] > 0) || inDgd.has(code) || ignored.has(code)) return;
      const b = bm[code];
      p.dgd.push({ id: uid(), code: b ? b.code : code, qc: 0, qm: 0 });
      inDgd.add(code);
      changed = true;
    });
    if (changed) sortDgd(p);
    return changed;
  }

  function dgdRows(p) {
    const auto = autoByCode(p), bm = bpeIndex();
    return p.dgd.map((r) => {
      const b = bm[up(r.code)] || { code: r.code, des: '⚠ Article absent du BPE', unit: '', pu: 0 };
      const linked = isLinkedCode(r.code);
      const qa = r2(auto[up(r.code)] || 0);
      const qc = num(r.qc);
      const qm = linked ? 0 : num(r.qm);
      const qr = linked ? qa : qm;
      const moins = r2(Math.max(qc - qr, 0)), plus = r2(Math.max(qr - qc, 0));
      const pu = Number(b.pu) || 0;
      return { r, b, qa, qc, qm, qr, moins, plus, pu, mc: qc * pu, mm: moins * pu, mp: plus * pu, mg: qr * pu, linked };
    });
  }
  function dgdTotals(rows) {
    const t = { mc: 0, mm: 0, mp: 0, mg: 0 };
    rows.forEach((x) => { t.mc += x.mc; t.mm += x.mm; t.mp += x.mp; t.mg += x.mg; });
    const tva = (S.tva || 0) / 100;
    t.tva = { mc: t.mc * tva, mm: t.mm * tva, mp: t.mp * tva, mg: t.mg * tva };
    t.ttc = { mc: t.mc + t.tva.mc, mm: t.mm + t.tva.mm, mp: t.mp + t.tva.mp, mg: t.mg + t.tva.mg };
    t.taux = t.mc ? t.mg / t.mc : 0;
    return t;
  }
  function projSummary(p) {
    const rows = dgdRows(p), t = dgdTotals(rows), tot = projTotals(p);
    const cable = Object.keys(tot).filter(isCable).reduce((a, k) => a + tot[k], 0);
    const closers = p.fdts.reduce((a, f) => a + f.lines.reduce((b, l) => b + l.closers.length, 0), 0);
    return { rows, t, cable, closers };
  }

  /* ---------------- Toasts & modales ---------------- */
  function toast(msg, err) {
    const el = document.createElement('div');
    el.className = 'toast' + (err ? ' err' : '');
    el.innerHTML = `<div class="t-ico">${ic(err ? 'alert' : 'check')}</div><div>${esc(msg)}</div>`;
    $('#toasts').appendChild(el);
    setTimeout(() => { el.style.transition = 'all .3s'; el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; }, 2600);
    setTimeout(() => el.remove(), 3000);
  }
  function openModal({ title, icon = 'edit', body, foot, wide, onMount }) {
    const root = $('#modalRoot');
    root.innerHTML = `<div class="modal-back" data-act="modal-back"><div class="modal ${wide ? 'wide' : ''}" role="dialog">
      <div class="modal-head"><div class="mh-ico">${ic(icon)}</div><h3>${esc(title)}</h3>
      <button class="btn btn-icon btn-ghost close" data-act="modal-close" title="Fermer">${ic('x')}</button></div>
      <div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ''}</div></div>`;
    if (onMount) { try { onMount($('.modal', root)); } catch (e) { console.error(e); closeModal(); toast("Une erreur est survenue.", true); } }
    const f = $('.modal input, .modal select', root); if (f) setTimeout(() => f.focus(), 50);
  }
  const closeModal = () => { $('#modalRoot').innerHTML = ''; };
  function confirmBox(msg, onYes, yesLabel = 'Supprimer') {
    openModal({
      title: 'Confirmation', icon: 'alert',
      body: `<p style="margin:0;line-height:1.6">${msg}</p>`,
      foot: `<button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-danger" id="cfYes">${ic('trash')}${esc(yesLabel)}</button>`,
      onMount: (m) => { $('#cfYes', m).onclick = () => { closeModal(); onYes(); }; }
    });
  }

  /* ---------------- Navigation ---------------- */
  const VIEWS = {
    dashboard: { title: 'Suivi Projet ODN', icon: 'gauge', nav: 'Suivi Projet ODN' },
    dgd: { title: 'DGD — Décompte Général des Travaux', icon: 'table', needP: true, nav: 'DGD' },
    fdt: { title: 'Fiches de tirage', icon: 'route', needP: true, nav: 'Fiches de tirage' },
    attach: { title: 'Attachement des travaux', icon: 'fileCheck', needP: true, nav: 'Attachement' },

    devis: { title: 'Devis Estimatif et Quantitatif — Travaux Supplémentaires', icon: 'sheet', needP: true, nav: 'Devis Travaux Supplémentaires' },
    dotation: { title: 'État de dotation matériels', icon: 'box', needP: true, nav: 'Dotation matériels' },
    reversement: { title: 'État de reversement matériels', icon: 'refresh', needP: true, nav: 'Reversement' },
    projects: { title: 'Projets & tableau de bord', icon: 'grid', nav: 'Projets' },
    bpe: { title: 'BPE — Bordereau des Prix', icon: 'book', nav: 'BPE (unique)' },
    settings: { title: 'Paramètres', icon: 'settings', nav: 'Paramètres' }
  };
  /* Historique navigateur : le bouton « Retour » revient à la vue précédente au lieu de quitter l'application */
  let _navReady = false;
  function histSync(replace) {
    try {
      const st = { odnView: S.view, odnCur: S.current };
      const url = '#/' + S.view;
      if (replace || !_navReady) history.replaceState(st, '', url); else if ((history.state || {}).odnView !== S.view) history.pushState(st, '', url);
      _navReady = true;
    } catch (e) {}
  }
  window.addEventListener('popstate', (e) => {
    const st = e.state;
    if (!st || !st.odnView || !VIEWS[st.odnView]) { history.pushState({ odnView: S.view, odnCur: S.current }, '', '#/' + S.view); return; }
    S.view = st.odnView;
    if (st.odnCur && S.projects.some((p) => p.id === st.odnCur)) S.current = st.odnCur;
    save(); render(); window.scrollTo({ top: 0 }); $('#app').classList.remove('nav-open');
  });
  function go(view) { S.view = view; save(); render(); histSync(); window.scrollTo({ top: 0 }); $('#app').classList.remove('nav-open'); }

  function syncProjDropdown() {
    const sel = $('#projSelect'), wrap = $('#projDropdown'), val = $('#projDropdownValue'), panel = $('#projDropdownPanel'), trig = $('#projDropdownTrigger');
    if (!sel || !wrap || !panel) return;
    const opts = $$('#projSelect option');
    const cur = sel.value;
    const curOpt = opts.find((o) => o.value === cur) || opts[0];
    if (val) val.textContent = curOpt ? curOpt.textContent : '—';
    if (trig) trig.setAttribute('aria-expanded', wrap.classList.contains('open') ? 'true' : 'false');
    panel.innerHTML = opts.length ? opts.map((o) => {
      const active = o.value === cur;
      return `<button type="button" class="proj-option ${active ? 'active' : ''}" role="option" aria-selected="${active ? 'true' : 'false'}" data-proj-val="${esc(o.value)}">
        <span class="po-check"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>
        <span class="po-name">${esc(o.textContent || '')}</span>
      </button>`;
    }).join('') : '<div class="proj-dropdown-empty">Aucun projet</div>';
  }

  function renderChrome() {
    document.documentElement.dataset.theme = S.theme || 'dark';
    $('#themeBtn').innerHTML = ic(S.theme === 'light' ? 'moon' : 'sun');
    $('#menuBtn').innerHTML = ic('menu');
    const p = proj();
    $('#projSelect').innerHTML = S.projects.length
      ? S.projects.map((x) => `<option value="${x.id}" ${x.id === S.current ? 'selected' : ''}>${esc(x.info.nom || 'Projet sans nom')}</option>`).join('')
      : '<option>Aucun projet</option>';
    syncProjDropdown();
    const fdtCount = p ? p.fdts.length : 0;
    const item = (v, badge) => `<button class="nav-item ${S.view === v ? 'active' : ''}" data-act="go" data-view="${v}" ${VIEWS[v].needP && !p ? 'disabled' : ''}>${ic(VIEWS[v].icon)}<span>${VIEWS[v].nav}</span>${badge || ''}</button>`;
    $('#nav').innerHTML = `
      <div class="nav-section">Suivi Projet ODN</div>
      ${item('dashboard', `<span class="badge blue">${S.projects.length}</span>`)}
      <div class="nav-section">Projet</div>
      ${item('dgd')}${item('fdt', fdtCount ? `<span class="badge blue">${fdtCount}</span>` : '')}${item('attach')}${item('devis')}${item('dotation')}${item('reversement')}
      <div class="nav-section">Général</div>
      ${item('projects', `<span class="badge">${S.projects.length}</span>`)}${item('bpe', `<span class="badge">${S.bpe.length}</span>`)}${item('settings')}`;
    const v = VIEWS[S.view];
    $('#pageTitle').textContent = v.title;
    $('#crumbs').innerHTML = p && v.needP ? `${esc(p.info.nom)} · ${esc(p.info.cmp || '')} · ${esc(p.info.entreprise || '')}` : (S.view === 'dashboard' ? '' : 'Algérie Télécom · Direction Opérationnelle');
  }

  /* ---------------- Focus : preservation lors des re-rendus ---------------- */
  const FOCUS_KEYS = ['in', 'ch', 'f', 'l', 'c', 's', 'k', 'id', 'bid', 'iid', 'i'];
  function captureFocus() {
    const el = document.activeElement;
    if (!el || !el.tagName) return null;
    const tag = el.tagName.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') return null;
    if (!el.closest('#view')) return null;
    if ($('#modalRoot') && $('#modalRoot').innerHTML) return null;
    const d = el.dataset || {};
    if (!FOCUS_KEYS.some((k) => d[k] !== undefined)) return null;
    const sig = FOCUS_KEYS.map((k) => String(d[k] === undefined ? '' : d[k])).join('|');
    let ss = null, se = null;
    try { ss = el.selectionStart; se = el.selectionEnd; } catch (e) {}
    return { sig, ss, se, scrollTop: el.scrollTop };
  }
  function restoreFocus(info) {
    if (!info) return;
    // Ne pas voler le focus si l'utilisateur a déjà focalisé autre chose
    const act = document.activeElement;
    if (act && act !== document.body && act !== document.documentElement) return;
    const els = $$('#view input, #view textarea, #view select');
    const el = els.find((x) => {
      const d = x.dataset || {};
      return FOCUS_KEYS.map((k) => String(d[k] === undefined ? '' : d[k])).join('|') === info.sig;
    });
    if (!el) return;
    try { el.focus({ preventScroll: true }); } catch (e) { try { el.focus(); } catch (e2) {} }
    if (info.ss !== null && el.setSelectionRange) { try { el.setSelectionRange(info.ss, info.se); } catch (e) {} }
    if (info.scrollTop) { try { el.scrollTop = info.scrollTop; } catch (e) {} }
  }
  let _renderTimer = null;
  function scheduleRender(delay) {
    clearTimeout(_renderTimer);
    _renderTimer = setTimeout(() => { _renderTimer = null; render(); }, delay || 180);
  }

  function render() {
    const f = captureFocus();
    if (VIEWS[S.view] && VIEWS[S.view].needP && !proj()) S.view = 'dashboard';
    if (!VIEWS[S.view]) S.view = 'dashboard';
    if (proj() && syncDgdFromFdt(proj())) save();
    renderChrome();
    const v = $('#view');
    const fn = { dgd: viewDGD, fdt: viewFDT, attach: viewAttach, devis: viewDevisTR, dotation: viewDotation, reversement: viewReversement, projects: viewProjects, bpe: viewBPE, settings: viewSettings, dashboard: viewDashboard }[S.view];
    v.innerHTML = fn ? fn() : '';
    if (S.view === 'dgd') patchDGD();
    // Projets achevés : lecture seule (impression / Excel / réactivation uniquement)
    if (['dgd','fdt','attach','devis','dotation','reversement'].includes(S.view) && isProjLocked(proj())) {
      const allowIn = new Set(['dgd-filter']);
      $$('input, select, textarea', v).forEach((el) => {
        if (allowIn.has(el.dataset.in) || allowIn.has(el.dataset.ch)) return;
        el.disabled = true;
      });
      const mut = '[data-act="dgd-add"],[data-act="dgd-del"],[data-act="dgd-add-missing"],[data-act="fdt-add"],[data-act="fdt-del"],[data-act="line-add"],[data-act="line-del"],[data-act="line-dup"],[data-act="closer-add"],[data-act="closer-del"],[data-act="seg-add"],[data-act="cols-edit"],[data-act="edit-project"],[data-act="dotation-bon-add"],[data-act="dotation-bon-del"],[data-act="dotation-item-add"],[data-act="dotation-item-del"],[data-act="rev-bon-add"],[data-act="rev-bon-del"],[data-act="rev-item-add"],[data-act="rev-item-del"]';
      $$(mut, v).forEach((el) => el.remove());
    }
    restoreFocus(f);
  }

  /* =========================================================
     VUE : TABLEAU DE BORD (PROJET)
     ========================================================= */
  function cableBreakdownHTML(p) {
    const totals = projTotals(p), cm = colMap();
    const acc = {};
    const labelOf = (g, l) => {
      const gl = String(g || '').replace(/^FO\s*/i, '').trim();
      const lab = up(l) === 'CONDUITE' ? 'conduit' : (up(l) === 'FAÇADE' || up(l) === 'FACADE') ? 'façade' : String(l || '').toLowerCase();
      return `FO ${gl} ${lab}`;
    };
    Object.keys(totals).forEach((k) => {
      const v = num(totals[k]); if (!v) return;
      const col = cm[k]; if (!col || !up(col.code).startsWith('RA50')) return;
      const key = labelOf(col.group, col.label);
      acc[key] = r2((acc[key] || 0) + v);
    });
    const order = { '12': 1, '24': 2, '36': 3, '48': 4, '72': 5, '96': 6, '144': 7 };
    const items = Object.keys(acc).sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ''), 10) || 999, nb = parseInt(b.replace(/\D/g, ''), 10) || 999;
      if ((order[na] || na) !== (order[nb] || nb)) return (order[na] || na) - (order[nb] || nb);
      return a.localeCompare(b, 'fr');
    });
    if (!items.length) return '<span class="faint">Aucun câble posé</span>';
    return items.map((k) => `<span class="badge blue">${esc(k)} : ${fq(acc[k])} ml</span>`).join(' ');
  }

  function viewDashboard() {
    const total = S.projects.length;
    const activeCount = S.projects.filter((p) => projStatus(p) === 'active').length;
    const doneCount = total - activeCount;
    const filter = ['all', 'active', 'done'].includes(ui.projFilter) ? ui.projFilter : 'all';
    let visibleProjects = filter === 'all' ? S.projects : S.projects.filter((p) => projStatus(p) === filter);
    const q = (ui.projSearch || '').trim().toLowerCase();
    if (q) {
      visibleProjects = visibleProjects.filter((p) => {
        const i = p.info || {};
        return [i.nom, i.cmp, i.entreprise, i.surveillant, i.objet, i.do].some((v) => String(v || '').toLowerCase().includes(q));
      });
    }
    const filterTitle = filter === 'active' ? 'Projets en cours' : filter === 'done' ? 'Projets achevés' : 'Tous les projets';

    const projectRows = visibleProjects.map((p) => {
      const s = projSummary(p);
      const pct = Math.round(s.t.taux * 100);
      const pctRaw = s.t.taux * 100;
      const barColor = pctRaw >= 100 ? 'var(--at-green)' : (pctRaw >= 75 ? 'var(--at-blue-2)' : 'var(--gold)');
      const cableHTML = cableBreakdownHTML(p);
      const done = projStatus(p) === 'done';
      return `<div class="proj-row ${p.id === S.current ? 'current' : ''} ${done ? 'is-done' : ''}" data-act="proj-open" data-id="${p.id}">
        <div class="proj-row-main">
          <div class="proj-row-title">
            <span class="proj-row-name">${esc(p.info.nom || 'Projet')}</span>
            ${projectStateBadge(p)}
            ${p.id === S.current ? '<span class="proj-active-badge"><span class="dot"></span>Sélectionné</span>' : ''}
          </div>
          <div class="proj-row-meta">${esc([p.info.cmp, p.info.entreprise].filter(Boolean).join(' · ') || '—')}</div>
          <div class="proj-row-cables"><span class="proj-row-cable-label">Câble posé :</span> ${cableHTML}</div>
        </div>
        <div class="proj-row-stats">
          <div class="prs"><span class="l">Montant Commande</span><span class="v">${fmt(s.t.mc, 0)} DA</span></div>
          <div class="prs"><span class="l">Montant Réalisé</span><span class="v">${fmt(s.t.mg, 0)} DA</span></div>
          <div class="prs"><span class="l">Closers</span><span class="v">${s.closers}</span></div>
          <div class="prs taux"><span class="l">Taux avancement</span><span class="v" style="color:${barColor}">${fmt(pctRaw, 1)} %</span>
            <div class="progress sm" style="margin-top:4px"><span style="width:${Math.min(pct, 100)}%;background:${barColor}"></span></div>
            <button type="button" class="btn btn-sm ${done ? 'btn-success' : 'btn-danger'}" data-act="proj-status" data-id="${p.id}" title="${done ? 'Réactiver ce projet (le repasser en cours)' : 'Marquer ce projet comme achevé'}" aria-label="${done ? 'Réactiver le projet' : 'Marquer le projet achevé'}" style="margin-top:8px;align-self:flex-start">${ic(done ? 'refresh' : 'check')}${done ? 'Réactiver' : 'Marquer achevé'}</button>
          </div>
        </div>
      </div>`;
    }).join('');

    const emptyList = total === 0
      ? `<div class="card empty"><div class="e-ico">${ic('folder')}</div><h3>Aucun projet</h3><p>Créez votre premier projet pour suivre l'avancement.</p><button class="btn btn-primary" data-act="proj-new">${ic('plus')}Nouveau projet</button></div>`
      : q
        ? `<div class="card empty"><div class="e-ico">${ic('search')}</div><h3>Aucun résultat</h3><p>Aucun projet ne correspond à « ${esc(ui.projSearch)} ».</p></div>`
        : `<div class="card empty"><div class="e-ico">${ic(filter === 'done' ? 'fileCheck' : 'check')}</div><h3>${filter === 'done' ? 'Aucun projet achevé' : 'Aucun projet en cours'}</h3><p>${filter === 'done' ? 'Les projets marqués « Achevé » apparaîtront ici.' : 'Tous vos projets sont actuellement achevés.'}</p><button class="btn" data-act="proj-filter" data-filter="all">${ic('grid')}Voir tous les projets</button></div>`;

    const filterBtn = (key, label, count) => `<button type="button" class="${filter === key ? 'on' : ''}" data-act="proj-filter" data-filter="${key}" aria-pressed="${filter === key}">${label}<span class="tab-count">${count}</span></button>`;

    return `<div class="dashboard">
      <div class="dash-header">
        <div class="dash-brand">
          <img src="logo-algerie-telecom.svg" alt="Algérie Télécom" class="dash-logo">
          <div class="dash-brand-text">
            <div class="db-t">Algérie Télécom</div>
            <div class="db-s">DIRECTION OPÉRATIONNELLE</div>
          </div>
        </div>
        <div class="dash-actions">
          <button class="btn btn-primary" data-act="proj-new">${ic('plus')} Nouveau projet</button>
        </div>
      </div>

      <div class="kpis-grid kpis-compact">
        <div class="kpi blue" data-act="proj-filter" data-filter="all" role="button" tabindex="0" title="Afficher tous les projets" style="cursor:pointer">
          <div class="k-label">${ic('folder')} Total projets</div>
          <div class="k-value">${total}</div>
          <div class="k-foot">Tous les projets suivis</div>
        </div>
        <div class="kpi green" data-act="proj-filter" data-filter="active" role="button" tabindex="0" title="Afficher les projets en cours" style="cursor:pointer">
          <div class="k-label">${ic('check')} Projets en cours</div>
          <div class="k-value">${activeCount}</div>
          <div class="k-foot">En cours de réalisation</div>
        </div>
        <div class="kpi red" data-act="proj-filter" data-filter="done" role="button" tabindex="0" title="Afficher les projets achevés" style="cursor:pointer">
          <div class="k-label">${ic('fileCheck')} Projets achevés</div>
          <div class="k-value">${doneCount}</div>
          <div class="k-foot">Travaux terminés</div>
        </div>
      </div>

      <div class="dash-section">
        <div class="section-head proj-section-head">
          <h3>${ic('grid')} ${filterTitle} <span style="font-weight:600;color:var(--text-dim)">(${visibleProjects.length})</span></h3>
          <div class="proj-tools">
            <div class="search proj-search">${ic('search')}<input placeholder="Rechercher un projet…" data-in="proj-search" value="${esc(ui.projSearch || '')}"></div>
            <div class="tabs proj-filters" role="group" aria-label="Filtrer les projets par état">
              ${filterBtn('all', 'Tous', total)}
              ${filterBtn('active', 'En cours', activeCount)}
              ${filterBtn('done', 'Achevés', doneCount)}
            </div>
          </div>
        </div>
        <div class="projects-list">${projectRows || emptyList}</div>
      </div>
    </div>`;
  }

  /* =========================================================
     VUE : DGD
     ========================================================= */
  function heroHTML(p) {
    const i = p.info;
    const done = projStatus(p) === 'done';
    const f = (l, v) => `<div><div class="ig-l">${l}</div><div class="ig-v">${esc(v || '—')}</div></div>`;
    return `<div class="proj-hero">
      <div class="ph-top">
        <div style="flex:1;min-width:260px">
          <div class="row" style="gap:10px"><span class="badge green">${ic('layers').replace('<svg', '<svg width="12" height="12"')} Projet ODN</span>${projectStateBadge(p)}${i.dateDebut ? `<span class="badge">Début : ${frDate(i.dateDebut)}</span>` : ''}</div>
          <h2 style="margin-top:10px">${esc(i.nom || 'Projet')}</h2>
          <div class="ph-obj">${esc(i.objet || '')}</div>
        </div>
        <div class="btn-group">
          <button class="btn ${done ? 'btn-success' : 'btn-danger'}" data-act="proj-status" data-id="${p.id}" title="${done ? 'Réactiver ce projet (le repasser en cours)' : 'Marquer ce projet comme achevé'}">${ic(done ? 'refresh' : 'check')}${done ? 'Réactiver le projet' : 'Marquer achevé'}</button>
          ${done ? '' : `<button class="btn" data-act="edit-project" data-id="${p.id}">${ic('edit')}Infos projet</button>`}
        </div>
      </div>
      <div class="info-grid">
        ${f('DO', i.do)}${f('CMP', i.cmp)}${f('Entreprise', i.entreprise)}${f('Surveillant', i.surveillant)}
        ${f('ODS N°', i.ods)}${f('Contrat', i.contrat)}${f('BC', i.bc)}
      </div>
    </div>`;
  }

  function viewDGD() {
    const p = proj();
    const rows = dgdRows(p);
    const auto = autoByCode(p);
    const inDgd = new Set(p.dgd.map((r) => up(r.code)));
    const ignored = new Set(arr(p.dgdIgnored).map(up));
    const missing = Object.keys(auto).filter((c) => auto[c] > 0 && !inDgd.has(c) && !ignored.has(c));
    const filt = up(ui.dgdFilter);
    const locked = isProjLocked(p);

    const body = rows.map((x) => {
      const show = !filt || up(x.r.code).includes(filt) || up(x.b.des).includes(filt);
      const dis = locked ? 'disabled' : '';
      return `<tr data-id="${x.r.id}" class="${show ? '' : 'hide'}">
        <td class="code">${esc(x.r.code)}</td>
        <td class="des"><div class="clamp" title="${esc(x.b.des)}">${esc(x.b.des)}</div></td>
        <td class="center dim">${esc(x.b.unit)}</td>
        <td class="num"><input class="cell-input" inputmode="decimal" data-in="dgd" data-f="qc" data-id="${x.r.id}" value="${inVal(x.qc)}" placeholder="0" ${dis}></td>
        <td class="num" style="min-width:170px">${x.linked
          ? `<div class="qr-cell"><button type="button" class="auto-chip qr-click" data-act="qr-detail" data-code="${esc(x.r.code)}" title="Cliquer pour voir le détail par FDT et par câble">${ic('link')}<span data-c="qa">${fq(x.qa)}</span></button></div><div class="faint" style="font-size:11px;text-align:right;margin-top:3px">= <b data-c="qr">${fq(x.qr)}</b></div>`
          : `<div class="qr-cell"><input class="cell-input" style="max-width:110px" inputmode="decimal" data-in="dgd" data-f="qm" data-id="${x.r.id}" value="${inVal(x.qm)}" placeholder="0" title="Quantité réalisée (saisie manuelle)" ${dis}></div>`}</td>
        <td class="num" data-c="moins"></td>
        <td class="num" data-c="plus"></td>
        <td class="num">${fmt(x.pu)}</td>
        <td class="num" data-c="mc"></td>
        <td class="num" data-c="mm"></td>
        <td class="num" data-c="mp"></td>
        <td class="num strong" data-c="mg"></td>
        <td style="min-width:110px"><div class="row" style="gap:8px;flex-wrap:nowrap"><div class="progress" data-c="bar" style="flex:1"><i></i></div><span class="faint" style="font-size:11px;width:38px;text-align:right" data-c="pct"></span></div></td>
        ${locked ? '' : `<td><button class="btn btn-icon btn-sm btn-ghost" data-act="dgd-del" data-id="${x.r.id}" title="Retirer l'article">${ic('trash')}</button></td>`}
      </tr>`;
    }).join('');

    return `${heroHTML(p)}
      ${locked ? `<div class="alert info">${ic('info')}<div><b>Projet achevé :</b> les données sont en lecture seule. Vous pouvez uniquement imprimer, exporter en Excel ou réactiver le projet.</div></div>` : ''}
      <div class="kpis">
        <div class="kpi blue"><div class="k-label">${ic('money')}Montant commande HT</div><div class="k-value" data-k="mc"></div><div class="k-foot" data-k="mcttc"></div></div>
        <div class="kpi green"><div class="k-label">${ic('check')}Montant réalisé HT</div><div class="k-value" data-k="mg"></div><div class="k-foot" data-k="mgttc"></div></div>
        <div class="kpi gold"><div class="k-label">${ic('up')}Plus-value (+)</div><div class="k-value" data-k="mp"></div><div class="k-foot">Hors cadre commande</div></div>
        <div class="kpi red"><div class="k-label">${ic('down')}Moins-value (−)</div><div class="k-value" data-k="mm"></div><div class="k-foot">Non réalisé</div></div>
        <div class="kpi"><div class="k-label">${ic('gauge')}Taux d'avancement</div><div class="k-value" data-k="taux"></div><div class="progress mt" data-k="tauxbar"><i></i></div></div>
      </div>
      ${!locked && missing.length ? `<div class="alert">${ic('alert')}<div style="flex:1">Les fiches de tirage alimentent ${missing.map((c) => `<b>${esc(c)}</b>`).join(', ')} mais ${missing.length > 1 ? 'ces articles ne sont' : 'cet article n\'est'} pas dans le DGD.</div><button class="btn btn-sm btn-primary" data-act="dgd-add-missing">${ic('plus')}Ajouter au DGD</button></div>` : ''}
      <div class="card">
        <div class="card-head">
          <div><h3>Décompte Général des Travaux</h3><div class="sub">${p.dgd.length} articles</div></div>
          <div class="toolbar">
            <div class="search">${ic('search')}<input placeholder="Rechercher un article…" data-in="dgd-filter" value="${esc(ui.dgdFilter)}"></div>
            ${locked ? '' : `<button class="btn btn-primary" data-act="dgd-add">${ic('plus')}Ajouter des articles</button>`}
            <button class="btn" data-act="export-dgd" title="Exporter vers Excel">${ic('sheet')}Excel</button>
            <button class="btn" data-act="print-dgd" title="Imprimer / PDF">${ic('print')}Imprimer</button>
          </div>
        </div>
        ${p.dgd.length ? `<div class="table-wrap"><table class="tbl" id="dgdTable">
          <thead><tr>
            <th>N°<br>Articles</th><th>Désignation</th><th class="center">Unité</th><th class="num">Qté<br>commande</th><th class="num">Qté<br>réalisée</th>
            <th class="num">Qté<br>(−) cadre</th><th class="num">Qté<br>(+) cadre</th><th class="num">P.U</th><th class="num">Montant<br>commande</th>
            <th class="num">Montant<br>(−)</th><th class="num">Montant<br>(+)</th><th class="num">Montant<br>général</th><th>Avancement</th>${locked ? '' : '<th></th>'}
          </tr></thead>
          <tbody>${body}</tbody>
          <tfoot>
            <tr><td colspan="8" class="num">Montant total HT</td><td class="num" data-t="mc"></td><td class="num dgd-minus" data-t="mm"></td><td class="num dgd-plus" data-t="mp"></td><td class="num" data-t="mg"></td><td colspan="${locked ? 1 : 2}"></td></tr>
          </tfoot>
        </table></div>
        <div class="totals">
          <div><div class="t-l">Total HT (général)</div><div class="t-v" data-k="mg2"></div></div>
          <div><div class="t-l">TVA ${fq(S.tva)} %</div><div class="t-v" data-k="tva"></div></div>
          <div><div class="t-l">Montant total TTC</div><div class="t-v big" data-k="ttc"></div></div>
          <div><div class="t-l">TTC commande</div><div class="t-v" data-k="ttcc"></div></div>
        </div>`
        : emptyHTML('table', 'Aucun article dans le DGD', locked ? 'Ce projet est achevé et ne contient aucun article.' : 'Les articles des fiches de tirage seront ajoutés automatiquement avec leurs quantités réalisées. Vous pouvez aussi ajouter des articles du BPE.', locked ? '' : `<button class="btn btn-primary" data-act="dgd-add">${ic('plus')}Ajouter des articles</button>`)}
      </div>`;
  }

  let _patchRaf = 0;
  function schedulePatch(fn) {
    if (_patchRaf) cancelAnimationFrame(_patchRaf);
    _patchRaf = requestAnimationFrame(() => { _patchRaf = 0; try { fn(); } catch (e) { console.error(e); } });
  }
  function patchDGD() {
    const p = proj(); if (!p || S.view !== 'dgd') return;
    const rows = dgdRows(p), t = dgdTotals(rows);
    rows.forEach((x) => {
      const tr = $(`#dgdTable tr[data-id="${x.r.id}"]`); if (!tr) return;
      const set = (c, v, cls) => { const el = $(`[data-c="${c}"]`, tr); if (el) { el.textContent = v; if (cls !== undefined) el.className = 'num ' + cls; } };
      set('qa', fq(x.qa)); set('qr', fq(x.qr));
      set('moins', x.moins ? fq(x.moins) : '—', x.moins ? 'dgd-minus' : 'dim');
      set('plus', x.plus ? fq(x.plus) : '—', x.plus ? 'dgd-plus' : 'dim');
      set('mc', fmt(x.mc)); set('mm', x.mm ? fmt(x.mm) : '—', x.mm ? 'dgd-minus' : 'dim'); set('mp', x.mp ? fmt(x.mp) : '—', x.mp ? 'dgd-plus' : 'dim');
      set('mg', fmt(x.mg), 'strong');
      const pct = x.qc ? x.qr / x.qc : (x.qr ? 1 : 0);
      const bar = $('[data-c="bar"]', tr);
      if (bar) { bar.classList.toggle('over', pct > 1); const inner = $('i', bar); if (inner) inner.style.width = Math.min(pct * 100, 100) + '%'; }
      const pctEl = $('[data-c="pct"]', tr); if (pctEl) pctEl.textContent = Math.round(pct * 100) + '%';
    });
    const k = (n, v) => $$(`[data-k="${n}"]`).forEach((el) => { el.innerHTML = v; });
    const tt = (n, v) => $$(`[data-t="${n}"]`).forEach((el) => { el.textContent = v; });
    k('mc', fmt(t.mc) + '<small>DA</small>'); k('mg', fmt(t.mg) + '<small>DA</small>');
    k('mp', fmt(t.mp) + '<small>DA</small>'); k('mm', fmt(t.mm) + '<small>DA</small>');
    k('mcttc', 'TTC : ' + money(t.ttc.mc)); k('mgttc', 'TTC : ' + money(t.ttc.mg));
    k('taux', fmt(t.taux * 100, 2) + '<small>%</small>');
    $$('[data-k="tauxbar"]').forEach((b) => { b.classList.toggle('over', t.taux > 1); $('i', b).style.width = Math.min(t.taux * 100, 100) + '%'; });
    k('mg2', money(t.mg)); k('tva', money(t.tva.mg)); k('ttc', money(t.ttc.mg)); k('ttcc', money(t.ttc.mc));
    tt('mc', fmt(t.mc)); tt('mm', fmt(t.mm)); tt('mp', fmt(t.mp)); tt('mg', fmt(t.mg));
  }

  function sortDgd(p) {
    const bm = bpeIndex();
    p.dgd.sort((a, b) => ((bm[up(a.code)] || { _i: 1e9 })._i - (bm[up(b.code)] || { _i: 1e9 })._i));
  }

  function openBpePicker() {
    const p = proj();
    const inSet = new Set(p.dgd.map((r) => up(r.code)));
    const sel = new Set();
    const listHTML = (q) => {
      const foldSearch = (v) => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const Q = foldSearch(q); let last = null, html = '';
      S.bpe.forEach((b) => {
        if (Q && !foldSearch(b.code).includes(Q) && !foldSearch(b.des).includes(Q) && !foldSearch(b.cat).includes(Q)) return;
        if (b.cat !== last) { html += `<div class="pick-cat">${esc(b.cat || 'Divers')}</div>`; last = b.cat; }
        const isIn = inSet.has(up(b.code)), isSel = sel.has(b.code);
        html += `<div class="pick-row ${isIn ? 'in' : ''} ${isSel ? 'sel' : ''}" data-code="${esc(b.code)}">
          <div class="chk">${isSel || isIn ? ic('check') : ''}</div>
          <div class="code" style="width:90px;font-family:JetBrains Mono,monospace;font-weight:700;color:var(--at-green-2)">${esc(b.code)}</div>
          <div style="flex:1;font-size:13px">${esc(b.des)}</div>
          <div class="faint" style="width:60px;text-align:center">${esc(b.unit)}</div>
          <div style="width:100px;text-align:right;font-weight:600">${fmt(b.pu)}</div>
        </div>`;
      });
      return html || '<div class="empty"><p>Aucun article trouvé.</p></div>';
    };
    openModal({
      title: 'Ajouter des articles du BPE au DGD', icon: 'book', wide: true,
      body: `<div class="row mb"><div class="search" style="flex:1">${ic('search')}<input id="pkQ" style="width:100%" placeholder="Code, désignation ou chapitre… (ex : RA50, poteau, fouille)"></div></div>
             <div class="pick-list" id="pkList">${listHTML('')}</div>`,
      foot: `<span class="muted" id="pkCount" style="margin-right:auto">0 sélectionné</span><button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-primary" id="pkOk">${ic('plus')}Ajouter au DGD</button>`,
      onMount: (m) => {
        const q = $('#pkQ', m), list = $('#pkList', m);
        q.oninput = () => { list.innerHTML = listHTML(q.value); };
        list.onclick = (e) => {
          const row = e.target.closest('.pick-row'); if (!row || row.classList.contains('in')) return;
          const c = row.dataset.code; sel.has(c) ? sel.delete(c) : sel.add(c);
          row.classList.toggle('sel'); $('.chk', row).innerHTML = sel.has(c) ? ic('check') : '';
          $('#pkCount', m).textContent = `${sel.size} sélectionné${sel.size > 1 ? 's' : ''}`;
        };
        $('#pkOk', m).onclick = () => {
          if (!sel.size) return toast('Sélectionnez au moins un article', true);
          const selUp = new Set([...sel].map(up));
          const codes = [...sel];
          sel.forEach((code) => p.dgd.push({ id: uid(), code, qc: 0, qm: 0 }));
          p.dgdIgnored = arr(p.dgdIgnored).filter((c) => !selUp.has(up(c)));
          logEvent(p, 'dgd', 'add', `${codes.length} article(s) ajouté(s) au DGD : ${codes.join(', ')}`);
          sortDgd(p); save(); closeModal(); render(); toast(`${sel.size} article(s) ajouté(s) au DGD`);
        };
      }
    });
  }

  /* =========================================================
     VUE : FICHES DE TIRAGE
     ========================================================= */
  function viewFDT() {
    const p = proj();
    const locked = isProjLocked(p);
    if (ui.fdtSel !== 'recap' && !p.fdts.find((f) => f.id === ui.fdtSel)) ui.fdtSel = p.fdts[0] ? p.fdts[0].id : null;
    const cols = activeCols(p);
    const selFdt = (ui.fdtSel && ui.fdtSel !== 'recap') ? p.fdts.find((f) => f.id === ui.fdtSel) : null;
    const list = p.fdts.map((f) => {
      const t = fdtTotals(f), ml = Object.keys(t).filter(isCable).reduce((a, k) => a + t[k], 0);
      const nCl = f.lines.reduce((a, l) => a + l.closers.length, 0);
      return `<div class="fdt-item ${ui.fdtSel === f.id ? 'active' : ''}" data-act="fdt-sel" data-id="${f.id}">
        <div class="fi-ico">${ic('route')}</div>
        <div><div class="fi-name">${esc(f.name)}</div><div class="fi-meta">${f.lines.length} ligne(s) · ${nCl} closer(s)</div></div>
        <div class="fi-total" data-tot="fdtitem:${f.id}">${fq(ml)} ml</div>
      </div>`;
    }).join('');
    const emptyAction = locked ? '' : `<button class="btn btn-primary" data-act="fdt-add">${ic('plus')}Nouvelle FDT</button>`;
    const right = ui.fdtSel === 'recap' ? recapHTML(p) : (ui.fdtSel ? fdtDetailHTML(p, p.fdts.find((f) => f.id === ui.fdtSel), cols)
      : `<div class="card">${emptyHTML('route', 'Aucune fiche de tirage', locked ? 'Ce projet est achevé et ne contient aucune fiche de tirage.' : 'Créez votre première FDT (ex : FDT 18), puis ajoutez les lignes, les closers et les mètres de câble.', emptyAction)}</div>`);
    const uplinkDisabled = !selFdt || locked ? 'disabled' : '';
    return `${locked ? `<div class="alert info" style="margin:0 0 10px">${ic('info')}<div><b>Projet achevé :</b> fiches de tirage en lecture seule. Impression et export Excel disponibles.</div></div>` : ''}<div class="fdt-top">
      <div class="uplink-case">
        <label class="uplink-label" for="fdtUplink">UPLINK (ml)</label>
        <input class="uplink-input" id="fdtUplink" type="text" inputmode="decimal" placeholder="${selFdt ? 'Longueur en ml…' : 'Sélectionnez une FDT'}" data-in="fdt-uplink" data-f="${selFdt ? selFdt.id : ''}" value="${esc(selFdt ? (selFdt.uplink || '') : '')}" ${uplinkDisabled}>
        <div class="faint" style="font-size:10.5px;margin-top:6px;line-height:1.35">Compté dans le DGD · Qté réalisée de <b>RA502A</b> (Pose câble FO en conduite)</div>
      </div>
      ${locked ? '' : `<button class="btn btn-primary fdt-new-btn" data-act="fdt-add">${ic('plus')}Nouvelle FDT</button>`}
      <div class="fdt-list">
        ${list}
        ${p.fdts.length ? `<div class="fdt-item ${ui.fdtSel === 'recap' ? 'active' : ''}" data-act="fdt-sel" data-id="recap">
          <div class="fi-ico" style="background:linear-gradient(135deg,#f5a623,#ffd977);color:#2b1c00">${ic('sigma')}</div>
          <div><div class="fi-name">Récapitulatif</div><div class="fi-meta">Toutes les FDT</div></div></div>` : ''}
      </div>
    </div>
    <div class="fdt-detail">${right}</div>`;
  }

  function colHeadHTML(cols, lead, tail) {
    const groups = [];
    cols.forEach((c) => { const g = groups[groups.length - 1]; if (g && g.name === c.group) g.n++; else groups.push({ name: c.group, n: 1 }); });
    const starts = new Set(); let i = 0; groups.forEach((g) => { starts.add(i); i += g.n; });
    return `<thead>
      <tr>${lead.map((l) => `<th rowspan="2">${l}</th>`).join('')}${groups.map((g) => `<th class="grp c-grp-start" colspan="${g.n}">${esc(g.name)}</th>`).join('')}${tail.map((l) => `<th rowspan="2" class="${l.cls || ''}">${l.t}</th>`).join('')}</tr>
      <tr>${cols.map((c, j) => { const w = c.key === 'gm_fp' ? ' style="width:120px"' : ''; return `<th class="num ${starts.has(j) ? 'c-grp-start' : ''}" title="BPE ${esc(c.code)}" data-k="${c.key}"${w}>${esc(c.label)}</th>`; }).join('')}</tr>
    </thead>`;
  }

  function fdtDetailHTML(p, f, cols) {
    const locked = isProjLocked(p);
    const dis = locked ? 'disabled' : '';
    const keys = cols.map((c) => c.key);
    const starts = new Set(); { let prev = null; cols.forEach((c, j) => { if (c.group !== prev) starts.add(j); prev = c.group; }); }
    const ft = fdtTotals(f);
    const lines = f.lines.map((l) => {
      const collapsed = ui.collapsed[l.id];
      let rows = '';
      const raccIdx = cols.findIndex((c) => c.key === 'racc');
      const pboIdx = cols.findIndex((c) => c.key === 'pbo');
      const raccInput = (c, rs) => `<td class="racc-cell ${raccIdx >= 0 && starts.has(raccIdx) ? 'c-grp-start' : ''}" data-k="racc"${rs ? ` rowspan="${rs}"` : ''}><input class="cell-input ${num(c.racc) ? 'has-val' : ''}" inputmode="numeric" data-in="closer-racc" data-f="${f.id}" data-l="${l.id}" data-c="${c.id}" value="${inVal(num(c.racc))}" placeholder="0" title="Raccordement brin (par closer) — reporté sur RA804"></td>`;
      const pboInput = (c, rs) => {
        const cls = pboIdx >= 0 && starts.has(pboIdx) ? 'c-grp-start' : '';
        const fa = num(c.pboFa), im = num(c.pboIm);
        return `<td class="pbo-cell ${cls}" data-k="pbo"${rs ? ` rowspan="${rs}"` : ''}>
          <div class="pbo-field"><span class="pbo-lbl" title="RA801 – Façade">Façade</span><input class="cell-input ${fa ? 'has-val' : ''}" inputmode="numeric" data-in="closer-pbo" data-fld="fa" data-f="${f.id}" data-l="${l.id}" data-c="${c.id}" value="${inVal(fa)}" placeholder="0" title="PBO Façade (RA801)" ${dis}></div>
          <div class="pbo-field"><span class="pbo-lbl" title="RA803 – Immeuble">Immeuble</span><input class="cell-input ${im ? 'has-val' : ''}" inputmode="numeric" data-in="closer-pbo" data-fld="im" data-f="${f.id}" data-l="${l.id}" data-c="${c.id}" value="${inVal(im)}" placeholder="0" title="PBO Immeuble (RA803)" ${dis}></div>
        </td>`;
      };
      const segCell = (s, col, j, c) => {
        const cls = starts.has(j) ? 'c-grp-start' : '';
        if (col.key === 'pbo' || col.key === 'racc') return '';
        const v = num(s.v[col.key]); const w = col.key === 'gm_fp' ? ' style="width:110px"' : '';
        return `<td class="${cls}" data-k="${col.key}"${w}><input class="cell-input ${v ? 'has-val' : ''}" inputmode="decimal" data-in="seg" data-f="${f.id}" data-l="${l.id}" data-c="${c.id}" data-s="${s.id}" data-k="${col.key}" value="${inVal(v)}" ${dis}></td>`;
      };
      l.closers.forEach((c, ci) => {
        const ct = closerTotals(c);
        const n = Math.max(c.segs.length, 1);
        const closerCell = `<td class="closer-cell" rowspan="${n}">
          <span class="closer-tag">${ic('box')}Closer ${pad2(ci + 1)}</span>
          <div class="faint" style="font-size:11.5px;margin-top:6px">Σ <b data-tot="closer:${c.id}">${fq(sumObj(ct, keys.filter(isCable)))}</b> ml</div>
          ${!c.segs.length ? `<div class="faint" style="font-size:10.5px;margin-top:6px;line-height:1.3">Aucun tronçon</div>` : ''}
          <div class="closer-actions">
            ${locked ? '' : `<button class="btn btn-sm" data-act="seg-add" data-f="${f.id}" data-l="${l.id}" data-c="${c.id}" title="Ajouter un tronçon">${ic('plus')}Tronçon</button>
            <button class="btn btn-icon btn-sm btn-danger" data-act="closer-del" data-f="${f.id}" data-l="${l.id}" data-c="${c.id}" title="Supprimer le closer">${ic('trash')}</button>`}
          </div></td>`;
        if (!c.segs.length) {
          const empty = cols.map((col, j) => {
            if (col.key === 'pbo') return pboInput(c, 1);
            if (col.key === 'racc') return raccInput(c, 1);
            return `<td class="${starts.has(j) ? 'c-grp-start' : ''}" data-k="${col.key}"></td>`;
          }).join('');
          rows += `<tr class="closer-first">${closerCell}<td class="seg-num">—</td>${empty}<td class="num faint">—</td></tr>`;
        }
        c.segs.forEach((s, si) => {
          const cells = cols.map((col, j) => {
            if (col.key === 'pbo') return si === 0 ? pboInput(c, n) : '';
            if (col.key === 'racc') return si === 0 ? raccInput(c, n) : '';
            return segCell(s, col, j, c);
          }).join('');
          rows += `<tr class="${si === 0 ? 'closer-first' : ''}">${si === 0 ? closerCell : ''}
            <td class="seg-num">${si + 1}</td>
            ${cells}
            <td class="num strong" data-tot="seg:${s.id}">${fq(sumObj(s.v, keys.filter(isCable)))}</td>
          </tr>`;
        });
      });
      const lt = lineTotals(l);
      return `<div class="card line-card ${collapsed ? 'collapsed' : ''}" data-line="${l.id}">
        <div class="line-head">
          <button class="btn btn-icon btn-sm btn-ghost collapse-btn" data-act="line-toggle" data-l="${l.id}">${ic('chevron')}</button>
          <div class="lh-ico">${ic('route')}</div>
          <input class="line-name" data-in="line-name" data-f="${f.id}" data-l="${l.id}" value="${esc(l.name)}" ${dis}>
          <span class="badge blue">${l.closers.length} closer(s)</span>
          <span class="badge green">Σ <span data-tot="line:${l.id}:all">${fq(sumObj(lt, keys.filter(isCable)))}</span> ml</span>
          <div class="toolbar">
            ${locked ? '' : `<button class="btn btn-sm btn-primary" data-act="closer-add" data-f="${f.id}" data-l="${l.id}">${ic('plus')}Closer</button>
            <button class="btn btn-icon btn-sm" data-act="line-dup" data-f="${f.id}" data-l="${l.id}" title="Dupliquer la ligne">${ic('copy')}</button>
            <button class="btn btn-icon btn-sm btn-danger" data-act="line-del" data-f="${f.id}" data-l="${l.id}" title="Supprimer la ligne">${ic('trash')}</button>`}
          </div>
        </div>
        <div class="line-body"><div class="table-wrap" style="max-height:none">
          <table class="tbl fdt-table">
            ${colHeadHTML(cols, ['Closer', '#'], [{ t: 'Total ml', cls: 'num' }])}
            <tbody>${rows || `<tr><td colspan="${keys.length + 3}" class="faint center" style="padding:24px">Aucun closer. Cliquez sur « + Closer ».</td></tr>`}</tbody>
            <tfoot><tr><td colspan="2">TOTAL ${esc(l.name)}</td>${cols.map((c, j) => `<td class="num ${starts.has(j) ? 'c-grp-start' : ''}" data-tot="line:${l.id}:${c.key}">${fq(lt[c.key] || 0)}</td>`).join('')}<td class="num" data-tot="line:${l.id}:all2">${fq(sumObj(lt, keys.filter(isCable)))}</td></tr></tfoot>
          </table></div></div>
      </div>`;
    }).join('');

    const hidden = Object.keys(ft).filter((k) => ft[k] && !keys.includes(k));
    return `<div class="card mb">
        <div class="card-head">
          <div class="fi-ico" style="width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--grad);color:#fff">${ic('route')}</div>
          <div><input class="line-name" style="font-size:19px" data-in="fdt-name" data-f="${f.id}" value="${esc(f.name)}" ${dis}><div class="sub" style="padding-left:9px">${f.lines.length} ligne(s)</div></div>
          <div class="toolbar">
            ${locked ? '' : `<button class="btn btn-primary" data-act="line-add" data-f="${f.id}">${ic('plus')}Ligne</button>
            <button class="btn" data-act="cols-edit">${ic('columns')}Colonnes</button>`}
            <button class="btn" data-act="export-fdt" data-f="${f.id}">${ic('sheet')}Excel</button>
            <button class="btn" data-act="print-fdt" data-f="${f.id}">${ic('print')}Imprimer</button>
            ${locked ? '' : `<button class="btn btn-icon btn-danger" data-act="fdt-del" data-f="${f.id}" title="Supprimer la FDT">${ic('trash')}</button>`}
          </div>
        </div>
        <div class="table-wrap" style="max-height:none">
          <table class="tbl">
            ${colHeadHTML(cols, [''], [{ t: 'Total câble', cls: 'num' }])}
            <tbody><tr class="total-row"><td>TOTAL ${esc(f.name)}</td>${cols.map((c, j) => `<td class="num ${starts.has(j) ? 'c-grp-start' : ''}" data-tot="fdt:${f.id}:${c.key}">${fq(ft[c.key] || 0)}</td>`).join('')}<td class="num" data-tot="fdt:${f.id}:all">${fq(sumObj(ft, keys.filter(isCable)))} ml</td></tr></tbody>
          </table>
        </div>
      </div>
      ${hidden.length ? `<div class="alert info">${ic('info')}<div>Des quantités existent dans des colonnes masquées (${hidden.map((k) => esc((colMap()[k] || {}).group + ' ' + (colMap()[k] || {}).label)).join(', ')}). Elles sont comptées dans le DGD. <a href="#" data-act="cols-edit">Afficher les colonnes</a></div></div>` : ''}
      ${lines || `<div class="card">${emptyHTML('route', 'Aucune ligne', locked ? 'Ce projet est achevé et cette FDT ne contient aucune ligne.' : 'Ajoutez une ligne (ex : LIGNE A FO 72), puis ses closers numérotés.', locked ? '' : `<button class="btn btn-primary" data-act="line-add" data-f="${f.id}">${ic('plus')}Ajouter une ligne</button>`)}</div>`}
      ${f.lines.length && !locked ? `<div class="row" style="justify-content:center"><button class="btn btn-primary" data-act="line-add" data-f="${f.id}">${ic('plus')}Ajouter une ligne</button></div>` : ''}`;
  }

  function recapHTML(p) {
    const cols = S.cols.filter((c) => p.fdts.some((f) => fdtTotals(f)[c.key]) || (p.activeCols || []).includes(c.key));
    const keys = cols.map((c) => c.key);
    const pt = projTotals(p);
    const auto = autoByCode(p), bm = bpeIndex();
    const rows = p.fdts.map((f) => { const t = fdtTotals(f); return `<tr><td class="strong">${esc(f.name)}</td>${cols.map((c) => `<td class="num">${t[c.key] ? fq(t[c.key]) : '<span class="dim">—</span>'}</td>`).join('')}<td class="num strong">${fq(sumObj(t, keys.filter(isCable)))}</td></tr>`; }).join('');
    const byCode = Object.keys(auto).map((code) => { const b = bm[code] || { des: '—', unit: '', pu: 0 }; return `<tr><td class="code">${esc(code)}</td><td class="des">${esc(b.des)}</td><td class="center dim">${esc(b.unit)}</td><td class="num strong">${fq(auto[code])}</td><td class="num">${fmt(b.pu)}</td><td class="num strong">${fmt(auto[code] * (b.pu || 0))}</td></tr>`; }).join('');
    return `<div class="card mb">
        <div class="card-head"><div><h3>Récapitulatif des fiches de tirage</h3><div class="sub">Somme de toutes les FDT du projet</div></div>
          <div class="toolbar"><button class="btn" data-act="export-recap">${ic('sheet')}Excel</button></div></div>
        <div class="table-wrap" style="max-height:none"><table class="tbl">
          ${colHeadHTML(cols, ['FDT'], [{ t: 'Total câble', cls: 'num' }])}
          <tbody>${rows}<tr class="total-row"><td>TOTAL GÉNÉRAL</td>${cols.map((c) => `<td class="num">${fq(pt[c.key] || 0)}</td>`).join('')}<td class="num">${fq(sumObj(pt, keys.filter(isCable)))} ml</td></tr></tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Report automatique vers le DGD</h3><div class="sub">Quantités par code BPE (selon le paramétrage des colonnes)</div></div></div>
        <div class="table-wrap" style="max-height:none"><table class="tbl">
          <thead><tr><th>Code BPE</th><th>Désignation</th><th class="center">Unité</th><th class="num">Quantité FDT</th><th class="num">P.U</th><th class="num">Montant</th></tr></thead>
          <tbody>${byCode || '<tr><td colspan="6" class="faint center">Aucune quantité saisie.</td></tr>'}</tbody>
        </table></div>
      </div>`;
  }

  function patchFDT() {
    const p = proj(); if (!p) return;
    const keys = activeCols(p).map((c) => c.key), ck = keys.filter(isCable);
    const allCable = (t) => Object.keys(t).filter(isCable).reduce((a, k) => a + t[k], 0);
    const T = {};
    p.fdts.forEach((f) => {
      const ft = fdtTotals(f);
      T[`fdtitem:${f.id}`] = fq(allCable(ft)) + ' ml';
      keys.forEach((k) => { T[`fdt:${f.id}:${k}`] = fq(ft[k] || 0); });
      T[`fdt:${f.id}:all`] = fq(sumObj(ft, ck)) + ' ml';
      f.lines.forEach((l) => {
        const lt = lineTotals(l);
        keys.forEach((k) => { T[`line:${l.id}:${k}`] = fq(lt[k] || 0); });
        T[`line:${l.id}:all`] = T[`line:${l.id}:all2`] = fq(sumObj(lt, ck));
        l.closers.forEach((c) => { T[`closer:${c.id}`] = fq(sumObj(closerTotals(c), ck)); c.segs.forEach((s) => { T[`seg:${s.id}`] = fq(sumObj(s.v, ck)); }); });
      });
    });
    $$('[data-tot]').forEach((el) => { const v = T[el.dataset.tot]; if (v !== undefined) el.textContent = v; });
  }

  function findSeg(d) {
    const p = proj(); const f = p.fdts.find((x) => x.id === d.f); if (!f) return {};
    const l = f.lines.find((x) => x.id === d.l); const c = l && l.closers.find((x) => x.id === d.c);
    const s = c && d.s ? c.segs.find((x) => x.id === d.s) : null;
    return { p, f, l, c, s };
  }

  function openColsEditor() {
    const p = proj();
    const set = new Set(p.activeCols);
    const html = () => {
      const groups = {};
      S.cols.forEach((c) => { (groups[c.group] = groups[c.group] || []).push(c); });
      return Object.keys(groups).map((g) => `<div class="mb"><div class="field"><label>${esc(g)}</label></div><div class="col-toggles">
        ${groups[g].map((c) => `<div class="col-toggle ${set.has(c.key) ? 'on' : ''}" data-key="${c.key}"><div class="chk">${set.has(c.key) ? ic('check') : ''}</div><div><div>${esc(c.label)}</div><div class="faint" style="font-size:11px">BPE ${esc(c.code || '—')}</div></div></div>`).join('')}
      </div></div>`).join('');
    };
    openModal({
      title: 'Colonnes affichées dans les fiches de tirage', icon: 'columns', wide: true,
      body: `<p class="muted" style="margin-top:0">Choisissez les types de câble / poses à saisir pour ce projet. Le code BPE associé à chaque colonne se règle dans <b>Paramètres</b>.</p><div id="colT">${html()}</div>`,
      foot: `<button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-primary" id="colOk">${ic('check')}Appliquer</button>`,
      onMount: (m) => {
        $('#colT', m).onclick = (e) => { const t = e.target.closest('.col-toggle'); if (!t) return; const k = t.dataset.key; set.has(k) ? set.delete(k) : set.add(k); $('#colT', m).innerHTML = html(); };
        $('#colOk', m).onclick = () => {
          p.activeCols = S.cols.map((c) => c.key).filter((k) => set.has(k));
          logEvent(p, 'fdt', 'edit', `Colonnes des fiches de tirage mises à jour (${p.activeCols.length} colonne(s) active(s))`);
          save(); closeModal(); render(); toast('Colonnes mises à jour');
        };
      }
    });
  }

  /* =========================================================
     VUE : ATTACHEMENT
     ========================================================= */
  function attachDocHTML(p) {
    const rows = dgdRows(p);
    const i = p.info, a = p.attach || {};
    return `<div class="doc doc-attach doc-compact">
      ${docHeadStandard(p, { attachLayout: true, contratBc: false })}
      <div class="doc-title">Attachement des travaux réalisés</div>
      <table>
        <thead><tr><th style="width:110px">N° Articles</th><th>Désignation</th><th style="width:80px">Unité</th><th style="width:120px">Quantité</th></tr></thead>
        <tbody>${rows.map((x) => `<tr><td class="code">${esc(x.r.code)}</td><td>${esc(x.b.des)}</td><td style="text-align:center">${esc(x.b.unit)}</td>${tdNum(x.qr, 2, true)}</tr>`).join('') || '<tr><td colspan="4" style="text-align:center">Aucune quantité réalisée.</td></tr>'}</tbody>
      </table>
      <div class="doc-signatures attach-sign">
        <div class="signs"><div>Directeur CMP</div><div>Le Surveillant</div><div>Entreprise</div></div>
        <div class="signs two"><div>Représentant DO</div><div>Représentant CIL</div></div>
        <div class="doc-foot"><span>Algérie Télécom — Suivi projets ODN</span><span>Édité le ${frDate(today())}</span></div>
      </div>
    </div>`;
  }
  function docBrand() {
    return `<div class="doc-brand">
      <img src="logo-algerie-telecom.svg" alt="Algérie Télécom" style="height:70px;width:auto;max-width:260px;object-fit:contain;display:block">
      <div><div class="db-t">Algérie Télécom</div><div class="db-s">DIRECTION OPÉRATIONNELLE</div></div></div>`;
  }
  function docHeadStandard(p, opts = {}) {
    const i = (p && p.info) || {};
    const surveillant = `<div><b>Surveillant :</b> ${esc(i.surveillant || '')}</div>`;
    const objet = `<div><b>Objet :</b> ${esc(i.objet || '')}</div>`;
    const ods = `<div><b>ODS N° :</b> ${esc(i.ods || '')}</div>`;
    const showContratBc = opts.contratBc !== false;
    const contrat = showContratBc && i.contrat ? `<div><b>Contrat :</b> ${esc(i.contrat)}</div>` : '';
    const bc = showContratBc && i.bc ? `<div><b>BC :</b> ${esc(i.bc)}</div>` : '';
    let leftExtra = '';
    let rightItems = [surveillant, objet, ods, contrat, bc];
    if (opts.attachLayout) {
      leftExtra = `${surveillant}${objet}${ods}`;
      rightItems = [contrat, bc];
    }
    const right = rightItems.filter(Boolean).join('');
    const brandCenter = `<div class="doc-brand doc-brand-center">
        <img src="logo-algerie-telecom.svg" alt="Algérie Télécom" style="height:56px;width:auto;max-width:220px;object-fit:contain;display:block;margin:0 auto">
        <div style="text-align:center"><div class="db-t" style="font-size:14px">Algérie Télécom</div><div class="db-s" style="font-size:9.5px;letter-spacing:.8px">DIRECTION OPÉRATIONNELLE</div></div>
      </div>`;
    const brandRight = `<div class="doc-brand doc-brand-right" style="text-align:center;justify-self:end;flex-direction:column;gap:6px;align-items:center">
        <img src="logo-algerie-telecom.svg" alt="Algérie Télécom" style="height:56px;width:auto;max-width:220px;object-fit:contain;display:block;margin:0 auto">
        <div style="text-align:center"><div class="db-t" style="font-size:14px">Algérie Télécom</div><div class="db-s" style="font-size:9.5px;letter-spacing:.8px">DIRECTION OPÉRATIONNELLE</div></div>
      </div>`;
    if (opts.attachLayout) {
      const infoLeft = `<div><b>DO :</b> ${esc(i.do || '')}</div><div><b>CMP :</b> ${esc(i.cmp || '')}</div><div><b>ENTREPRISE :</b> ${esc(i.entreprise || '')}</div>${leftExtra}${right}`;
      return `<div class="doc-head dgd-doc-head">
      <div class="doc-info doc-info-left">${infoLeft}</div>
      <div class="doc-brand doc-brand-center"></div>
      <div class="doc-info doc-info-right" style="display:flex;justify-content:flex-end;align-items:flex-start">${brandRight}</div>
    </div>`;
    }
    return `<div class="doc-head dgd-doc-head">
      <div class="doc-info doc-info-left">
        <div><b>DO :</b> ${esc(i.do || '')}</div><div><b>CMP :</b> ${esc(i.cmp || '')}</div><div><b>ENTREPRISE :</b> ${esc(i.entreprise || '')}</div>${leftExtra}
      </div>
      ${brandCenter}
      <div class="doc-info doc-info-right">${right}</div>
    </div>`;
  }
  const tdNum = (v, d = 2, q) => `<td class="num" x:num="${r2(v)}" style="mso-number-format:'#,##0.00'">${q ? fq(v) : fmt(v, d)}</td>`;

  function viewAttach() {
    const p = proj(); const a = p.attach; const locked = isProjLocked(p); const dis = locked ? 'disabled' : '';
    return `${locked ? `<div class="alert info no-print">${ic('info')}<div><b>Projet achevé :</b> attachement en lecture seule (impression / Excel disponibles).</div></div>` : ''}<div class="card mb no-print"><div class="card-head" style="background:linear-gradient(135deg,#0f3d5e 0%,#0072bc 55%,#00894a 100%);border-radius:12px;padding:14px 18px;align-items:center;gap:14px;box-shadow:0 10px 24px rgba(0,114,188,.18)">
        <div style="color:#fff;font-size:1.35rem;font-weight:800;letter-spacing:.2px;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,.18);font-family:'Segoe UI',Inter,system-ui,-apple-system,sans-serif">Algérie Télécom - Suivi projets ODN</div>
        <div class="toolbar" style="gap:10px;flex-wrap:wrap">
          <div class="field" style="display:flex;align-items:center;gap:8px;margin:0"><label style="margin:0;color:#fff;font-weight:600">N°</label><input style="width:80px;height:36px;background:rgba(255,255,255,.96);color:#0f172a;border:1px solid rgba(255,255,255,.35);border-radius:8px;padding:0 10px" data-in="attach" data-f="num" value="${esc(a.num)}" ${dis}></div>
          <div class="field" style="display:flex;align-items:center;gap:8px;margin:0"><label style="margin:0;color:#fff;font-weight:600">Date</label><input type="date" style="width:155px;height:36px;background:rgba(255,255,255,.96);color:#0f172a;border:1px solid rgba(255,255,255,.35);border-radius:8px;padding:0 8px" data-in="attach" data-f="date" value="${esc(a.date)}" ${dis}></div>
          <button class="btn" data-act="export-attach" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.28)">${ic('sheet')}Excel</button>
          <button class="btn btn-primary" data-act="print-attach" style="background:#fff;color:#0072bc;border-color:#fff">${ic('print')}Imprimer / PDF</button>
        </div></div></div>
      <div id="attachDoc">${attachDocHTML(p)}</div>`;
  }

  /* =========================================================
     VUE : DEVIS ESTIMATIF ET QUANTITATIF — TRAVAUX SUPPLÉMENTAIRES (DEVIS-TR)
     ========================================================= */
  function devisTRRows(p) {
    return dgdRows(p).filter((x) => num(x.plus) > 0);
  }
  function devisTRDocHTML(p) {
    const rows = devisTRRows(p), i = p.info || {};
    const t = rows.reduce((a, x) => ({ mp: r2(a.mp + num(x.mp)), plus: r2(a.plus) }), { mp: 0, plus: 0 });
    const tvaRate = (S.tva || 0) / 100;
    const tva = r2(t.mp * tvaRate), ttc = r2(t.mp + tva);
    return `<div class="doc doc-compact">
      ${docHeadStandard(p, { contratBc: false })}
      <div class="doc-title">Devis Estimatif et Quantitatif Des Travaux Supplémentaires ODN<small>${esc(i.nom || '')}</small></div>
      <table>
        <thead><tr><th style="width:90px">N° Article</th><th>Désignation</th><th style="width:60px">Unité</th><th style="width:95px">Qté commandée</th><th style="width:95px">Qté réalisée</th><th style="width:95px">Qté (+) cadre</th><th style="width:90px">P.U</th><th style="width:110px">Montant (+)</th></tr></thead>
        <tbody>${rows.map((x) => `<tr><td class="code">${esc(x.r.code)}</td><td>${esc(x.b.des)}</td><td style="text-align:center">${esc(x.b.unit)}</td>${tdNum(x.qc, 2, true)}${tdNum(x.qr, 2, true)}${tdNum(x.plus, 2, true)}${tdNum(x.pu)}${tdNum(x.mp)}</tr>`).join('') || '<tr><td colspan="8" style="text-align:center">Aucun article avec Qté (+) cadre.</td></tr>'}</tbody>
        ${rows.length ? `<tfoot>
          <tr class="tot"><td colspan="7" class="num">Montant total travaux supplémentaires (HT)</td>${tdNum(t.mp)}</tr>
          <tr class="tot"><td colspan="7" class="num">TVA ${fq(S.tva)} %</td>${tdNum(tva)}</tr>
          <tr class="tot"><td colspan="7" class="num">TOTAL TTC</td>${tdNum(ttc)}</tr>
        </tfoot>` : ''}
      </table>

    </div>`;
  }
  function viewDevisTR() {
    const p = proj(); if (!p) return emptyHTML('sheet', 'Aucun projet', 'Créez ou sélectionnez un projet.');
    const locked = isProjLocked(p);
    return `${locked ? `<div class="alert info no-print">${ic('info')}<div><b>Projet achevé :</b> document en lecture seule (impression / Excel disponibles).</div></div>` : ''}<div class="card mb no-print"><div class="card-head" style="background:linear-gradient(135deg,#0f3d5e 0%,#0072bc 55%,#00894a 100%);border-radius:12px;padding:14px 18px;align-items:center;gap:14px;box-shadow:0 10px 24px rgba(0,114,188,.18)">
        <div style="color:#fff;font-size:1.35rem;font-weight:800;letter-spacing:.2px;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,.18);font-family:'Segoe UI',Inter,system-ui,-apple-system,sans-serif">Algérie Télécom - Suivi projets ODN</div>
        <div class="toolbar">
          <button class="btn" data-act="export-devis" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.28)">${ic('sheet')}Excel</button>
          <button class="btn btn-primary" data-act="print-devis" style="background:#fff;color:#0072bc;border-color:#fff">${ic('print')}Imprimer / PDF</button>
        </div>
      </div></div>
      <div id="devisTRDoc">${devisTRDocHTML(p)}</div>`;
  }

  /* =========================================================
     VUE : ÉTAT DE DOTATION MATÉRIELS
     ========================================================= */
  function normDotationBons(list) {
    return arr(list).map((r, idx) => {
      if (r && Array.isArray(r.items)) {
        return {
          id: r.id || uid(), num: String(r.num || ''), date: String(r.date || ''),
          items: arr(r.items).map((it) => ({ id: (it && it.id) || uid(), des: String(it && it.des || ''), unit: String(it && it.unit || ''), qdotee: num(it && it.qdotee), quse: num(it && it.quse), obs: String(it && it.obs || '') }))
        };
      }
      return {
        id: (r && r.id) || uid(), num: `Bon ${pad2(idx + 1)}`, date: '',
        items: [{ id: uid(), des: String(r && r.des || ''), unit: String(r && r.unit || ''), qdotee: num(r && r.qdotee), quse: num(r && r.quse), obs: String(r && r.obs || '') }]
      };
    });
  }

  function dotationAllItems(p) {
    const out = [];
    normDotationBons(p && p.dotation).forEach((b) => arr(b.items).forEach((it) => {
      const qd = num(it.qdotee), qu = num(it.quse), qr = num(it.qrev);
      out.push({ b, it, qd, qu, qr });
    }));
    return out;
  }

  function dotationDocHTML(p) {
    const bons = normDotationBons(p && p.dotation), i = p.info || {};
    const sections = bons.map((b) => {
      const items = arr(b.items);
      const span = Math.max(1, items.length);
      const bonCell = `<td class="code" rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(b.num)}</td>`;
      const dateCell = `<td rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(frDate(b.date) || b.date || '')}</td>`;
      if (!items.length) {
        return `<tr>${bonCell}${dateCell}<td colspan="6" style="text-align:center;color:#6b7f99">Aucune désignation.</td></tr>`;
      }
      return items.map((it, ii) => {
        const qd = num(it.qdotee), qu = num(it.quse), qr = num(it.qrev);
        const merged = ii === 0 ? `${bonCell}${dateCell}` : '';
        return `<tr>${merged}<td>${esc(it.des)}</td><td style="text-align:center">${esc(it.unit)}</td>${tdNum(qd, 2, true)}${tdNum(qu, 2, true)}${tdNum(qr, 2, true)}<td>${esc(it.obs)}</td></tr>`;
      }).join('');
    }).join('');
    return `<div class="doc doc-compact">
      ${docHeadStandard(p, { contratBc: false })}
      <div class="doc-title">État de dotation matériels<small>${esc(i.nom || '')}</small></div>
      <table>
        <thead><tr><th style="width:90px">Bon N°</th><th style="width:90px">Date</th><th>Désignation</th><th style="width:58px">Unité</th><th style="width:90px">Dotation</th><th style="width:90px">Attachement</th><th style="width:90px">Reversement</th><th>Observation</th></tr></thead>
        <tbody>${sections || '<tr><td colspan="8" style="text-align:center">Aucun bon / matériel.</td></tr>'}</tbody>
      </table>

    </div>`;
  }

  function viewDotation() {
    const p = proj(); if (!p) return emptyHTML('box', 'Aucun projet', 'Créez ou sélectionnez un projet.');
    const locked = isProjLocked(p);
    p.dotation = normDotationBons(p.dotation);
    const bons = p.dotation;
    const totalItems = bons.reduce((a, b) => a + arr(b.items).length, 0);
    const blocks = bons.map((b, bi) => {
      const itemRows = arr(b.items).map((it, ii) => {
        const qd = num(it.qdotee), qu = num(it.quse), qr = num(it.qrev);
        return `<tr>
          <td class="num" style="width:36px">${ii + 1}</td>
          <td><input class="cell-input txt" data-in="dotation" data-bid="${b.id}" data-iid="${it.id}" data-f="des" value="${esc(it.des)}" placeholder="Désignation du matériel"></td>
          <td style="width:80px"><input class="cell-input txt" style="text-align:center" data-in="dotation" data-bid="${b.id}" data-iid="${it.id}" data-f="unit" value="${esc(it.unit)}" placeholder="U, ml…"></td>
          <td style="width:110px"><input class="cell-input" inputmode="decimal" data-in="dotation" data-bid="${b.id}" data-iid="${it.id}" data-f="qdotee" value="${inVal(qd)}"></td>
          <td style="width:110px"><input class="cell-input" inputmode="decimal" data-in="dotation" data-bid="${b.id}" data-iid="${it.id}" data-f="quse" data-dot-quse="${b.id}:${it.id}" value="${inVal(qu)}"></td>
          <td style="width:100px"><input class="cell-input" inputmode="decimal" data-in="dotation" data-bid="${b.id}" data-iid="${it.id}" data-f="qrev" data-dot-rev="${b.id}:${it.id}" value="${inVal(qr)}"></td>
          <td><input class="cell-input txt" data-in="dotation" data-bid="${b.id}" data-iid="${it.id}" data-f="obs" value="${esc(it.obs)}" placeholder="Observation"></td>
          <td style="width:42px">${locked ? '' : `<button class="btn btn-icon btn-sm btn-danger" data-act="dotation-item-del" data-bid="${b.id}" data-iid="${it.id}" title="Supprimer la désignation">${ic('trash')}</button>`}</td>
        </tr>`;
      }).join('');
      return `<div class="card mb" data-bon="${b.id}">
        <div class="card-head" style="gap:12px;flex-wrap:wrap">
          <div class="row" style="gap:10px;flex:1;min-width:260px;align-items:flex-end;flex-wrap:wrap">
            <div class="field" style="width:180px"><label>Bon N°</label><input class="cell-input txt code" style="height:38px" data-in="dotation" data-bid="${b.id}" data-f="num" value="${esc(b.num)}" placeholder="Ex : Bon 01"></div>
            <div class="field" style="width:170px"><label>Date du bon</label><input type="date" class="cell-input txt" style="height:38px" data-in="dotation" data-bid="${b.id}" data-f="date" value="${esc(b.date)}"></div>
            <span class="badge blue">${arr(b.items).length} désignation(s)</span>
          </div>
          <div class="toolbar">
            ${locked ? '' : `<button class="btn btn-sm btn-primary" data-act="dotation-item-add" data-bid="${b.id}">${ic('plus')}Désignation</button>
            <button class="btn btn-sm btn-danger" data-act="dotation-bon-del" data-bid="${b.id}">${ic('trash')}Supprimer bon</button>`}
          </div>
        </div>
        <div class="table-wrap" style="max-height:none"><table class="tbl">
          <thead><tr><th style="width:36px">N°</th><th>Désignation</th><th style="width:80px" class="center">Unité</th><th class="num" style="width:110px">Dotation</th><th class="num" style="width:110px">Attachement</th><th class="num" style="width:100px">Reversement</th><th>Observation</th><th style="width:42px"></th></tr></thead>
          <tbody>${itemRows || '<tr><td colspan="8" class="center faint" style="padding:18px">Aucune désignation. Cliquez sur « Désignation ».</td></tr>'}</tbody>
        </table></div>
      </div>`;
    }).join('');

    return `${locked ? `<div class="alert info">${ic('info')}<div><b>Projet achevé :</b> dotation en lecture seule (impression / Excel disponibles).</div></div>` : ''}<div class="card mb">
        <div class="card-head" style="background:linear-gradient(135deg,#0f3d5e 0%,#0072bc 55%,#00894a 100%);border-radius:12px;padding:14px 18px;align-items:center;gap:14px;box-shadow:0 10px 24px rgba(0,114,188,.18)">
          <div style="color:#fff;font-size:1.35rem;font-weight:800;letter-spacing:.2px;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,.18);font-family:'Segoe UI',Inter,system-ui,-apple-system,sans-serif">Algérie Télécom - Suivi projets ODN</div>
          <div class="toolbar">
            ${locked ? '' : `<button class="btn" data-act="dotation-bon-add" style="background:#00894a;color:#fff;border-color:rgba(255,255,255,.2)">${ic('plus')}Nouveau Bon</button>`}
            <button class="btn" data-act="export-dotation" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.28)">${ic('sheet')}Excel</button>
            <button class="btn btn-primary" data-act="print-dotation" style="background:#fff;color:#0072bc;border-color:#fff">${ic('print')}Imprimer</button>
          </div>
        </div>
      </div>
      ${blocks || `<div class="card">${emptyHTML('box', 'Aucun bon', locked ? 'Ce projet est achevé et ne contient aucun bon.' : 'Ajoutez un Bon N° avec sa date, puis ses désignations de matériel.', locked ? '' : `<button class="btn btn-primary" data-act="dotation-bon-add">${ic('plus')}Nouveau Bon</button>`)}</div>`}`;
  }

  /* =========================================================
     VUE : ÉTAT DE REVERSEMENT MATÉRIELS
     ========================================================= */
  function normReversementBons(list) {
    return arr(list).map((r, idx) => ({
      id: (r && r.id) || uid(), num: String(r && r.num || `Bon ${pad2(idx + 1)}`), date: String(r && r.date || ''),
      items: arr(r && r.items).map((it) => ({ id: (it && it.id) || uid(), des: String(it && it.des || ''), unit: String(it && it.unit || ''), qdotee: num(it && it.qdotee), qte: num(it && it.qte), obs: String(it && it.obs || '') }))
    }));
  }

  function reversementDocHTML(p) {
    const bons = normReversementBons(p && p.reversement), i = p.info || {};
    const sections = bons.map((b) => {
      const items = arr(b.items);
      const span = Math.max(1, items.length);
      const bonCell = `<td class="code" rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(b.num)}</td>`;
      const dateCell = `<td rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(frDate(b.date) || b.date || '')}</td>`;
      if (!items.length) {
        return `<tr>${bonCell}${dateCell}<td colspan="5" style="text-align:center;color:#6b7f99">Aucune désignation.</td></tr>`;
      }
      return items.map((it, ii) => {
        const qd = num(it.qdotee), q = num(it.qte);
        const merged = ii === 0 ? `${bonCell}${dateCell}` : '';
        return `<tr>${merged}<td>${esc(it.des)}</td><td style="text-align:center">${esc(it.unit)}</td>${tdNum(qd, 2, true)}${tdNum(q, 2, true)}<td>${esc(it.obs)}</td></tr>`;
      }).join('');
    }).join('');
    return `<div class="doc doc-compact">
      ${docHeadStandard(p, { contratBc: false })}
      <div class="doc-title">État de reversement matériels<small>${esc(i.nom || '')}</small></div>
      <table>
        <thead><tr><th style="width:90px">Bon N°</th><th style="width:90px">Date</th><th>Désignation</th><th style="width:60px">Unité</th><th style="width:95px">Dotation</th><th style="width:100px">Reversement</th><th>Observation</th></tr></thead>
        <tbody>${sections || '<tr><td colspan="7" style="text-align:center">Aucun bon / matériel.</td></tr>'}</tbody>
      </table>

    </div>`;
  }

  function viewReversement() {
    const p = proj(); if (!p) return emptyHTML('refresh', 'Aucun projet', 'Créez ou sélectionnez un projet.');
    const locked = isProjLocked(p);
    p.reversement = normReversementBons(p.reversement);
    const bons = p.reversement;
    const blocks = bons.map((b) => {
      const itemRows = arr(b.items).map((it, ii) => {
        const qd = num(it.qdotee), q = num(it.qte);
        return `<tr>
          <td class="num" style="width:36px">${ii + 1}</td>
          <td><input class="cell-input txt" data-in="reversement" data-bid="${b.id}" data-iid="${it.id}" data-f="des" value="${esc(it.des)}" placeholder="Désignation du matériel"></td>
          <td style="width:80px"><input class="cell-input txt" style="text-align:center" data-in="reversement" data-bid="${b.id}" data-iid="${it.id}" data-f="unit" value="${esc(it.unit)}" placeholder="U, ml…"></td>
          <td style="width:110px"><input class="cell-input" inputmode="decimal" data-in="reversement" data-bid="${b.id}" data-iid="${it.id}" data-f="qdotee" value="${inVal(qd)}"></td>
          <td style="width:110px"><input class="cell-input" inputmode="decimal" data-in="reversement" data-bid="${b.id}" data-iid="${it.id}" data-f="qte" value="${inVal(q)}"></td>
          <td><input class="cell-input txt" data-in="reversement" data-bid="${b.id}" data-iid="${it.id}" data-f="obs" value="${esc(it.obs)}" placeholder="Observation"></td>
          <td style="width:42px">${locked ? '' : `<button class="btn btn-icon btn-sm btn-danger" data-act="rev-item-del" data-bid="${b.id}" data-iid="${it.id}" title="Supprimer la désignation">${ic('trash')}</button>`}</td>
        </tr>`;
      }).join('');
      return `<div class="card mb" data-bon="${b.id}">
        <div class="card-head" style="gap:12px;flex-wrap:wrap">
          <div class="row" style="gap:10px;flex:1;min-width:260px;align-items:flex-end;flex-wrap:wrap">
            <div class="field" style="width:180px"><label>Bon N°</label><input class="cell-input txt code" style="height:38px" data-in="reversement" data-bid="${b.id}" data-f="num" value="${esc(b.num)}" placeholder="Ex : Bon 01"></div>
            <div class="field" style="width:170px"><label>Date du bon</label><input type="date" class="cell-input txt" style="height:38px" data-in="reversement" data-bid="${b.id}" data-f="date" value="${esc(b.date)}"></div>
            <span class="badge blue">${arr(b.items).length} désignation(s)</span>
          </div>
          <div class="toolbar">
            ${locked ? '' : `<button class="btn btn-sm btn-primary" data-act="rev-item-add" data-bid="${b.id}">${ic('plus')}Désignation</button>
            <button class="btn btn-sm btn-danger" data-act="rev-bon-del" data-bid="${b.id}">${ic('trash')}Supprimer bon</button>`}
          </div>
        </div>
        <div class="table-wrap" style="max-height:none"><table class="tbl">
          <thead><tr><th style="width:36px">N°</th><th>Désignation</th><th style="width:80px" class="center">Unité</th><th class="num" style="width:110px">Dotation</th><th class="num" style="width:110px">Reversement</th><th>Observation</th><th style="width:42px"></th></tr></thead>
          <tbody>${itemRows || '<tr><td colspan="7" class="center faint" style="padding:18px">Aucune désignation. Cliquez sur « Désignation ».</td></tr>'}</tbody>
        </table></div>
      </div>`;
    }).join('');

    return `${locked ? `<div class="alert info">${ic('info')}<div><b>Projet achevé :</b> reversement en lecture seule (impression / Excel disponibles).</div></div>` : ''}<div class="card mb">
        <div class="card-head" style="background:linear-gradient(135deg,#0f3d5e 0%,#0072bc 55%,#00894a 100%);border-radius:12px;padding:14px 18px;align-items:center;gap:14px;box-shadow:0 10px 24px rgba(0,114,188,.18)">
          <div style="color:#fff;font-size:1.35rem;font-weight:800;letter-spacing:.2px;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,.18);font-family:'Segoe UI',Inter,system-ui,-apple-system,sans-serif">Algérie Télécom - Suivi projets ODN</div>
          <div class="toolbar">
            ${locked ? '' : `<button class="btn" data-act="rev-bon-add" style="background:#00894a;color:#fff;border-color:rgba(255,255,255,.2)">${ic('plus')}Nouveau Bon</button>`}
            <button class="btn" data-act="export-reversement" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.28)">${ic('sheet')}Excel</button>
            <button class="btn btn-primary" data-act="print-reversement" style="background:#fff;color:#0072bc;border-color:#fff">${ic('print')}Imprimer</button>
          </div>
        </div>
      </div>
      ${blocks || `<div class="card">${emptyHTML('refresh', 'Aucun bon', locked ? 'Ce projet est achevé et ne contient aucun bon.' : 'Ajoutez un Bon N° avec sa date, puis ses désignations de matériel reversé.', locked ? '' : `<button class="btn btn-primary" data-act="rev-bon-add">${ic('plus')}Nouveau Bon</button>`)}</div>`}`;
  }

  /* =========================================================
     VUE : PROJETS / TABLEAU DE BORD
     ========================================================= */
  function viewProjects() {
    let mc = 0, mg = 0, cable = 0, closers = 0;
    const activeCount = S.projects.filter((p) => projStatus(p) === 'active').length;
    const doneCount = S.projects.length - activeCount;
    const cards = S.projects.map((p) => {
      const s = projSummary(p); mc += s.t.mc; mg += s.t.mg; cable += s.cable; closers += s.closers;
      const pct = Math.round(s.t.taux * 100);
      const done = projStatus(p) === 'done';
      return `<div class="card proj-card ${p.id === S.current ? 'current' : ''} ${done ? 'is-done' : ''}" data-act="proj-open" data-id="${p.id}">
        <div class="pc-top">
          <div class="ring ${pct > 100 ? 'over' : ''}" style="--p:${Math.min(pct, 100)}"><span>${pct}%</span></div>
          <div style="min-width:0"><h3>${esc(p.info.nom || 'Projet')}</h3><div class="pc-sub">${esc(p.info.cmp || '')} · ${esc(p.info.entreprise || '')}</div>
          <div class="pc-badges">${projectStateBadge(p)}${p.id === S.current ? '<span class="proj-active-badge"><span class="dot"></span>Sélectionné</span>' : ''}</div></div>
        </div>
        <div class="pc-stats">
          <div><div class="l">Commande HT</div><div class="v">${fmt(s.t.mc, 0)} DA</div></div>
          <div><div class="l">Réalisé HT</div><div class="v">${fmt(s.t.mg, 0)} DA</div></div>
          <div><div class="l">Câble posé</div><div class="v">${fq(s.cable)} ml</div></div>
          <div><div class="l">FDT / Closers</div><div class="v">${p.fdts.length} / ${s.closers}</div></div>
        </div>
        <div class="pc-actions">
          <button class="btn btn-sm ${done ? 'btn-success' : 'btn-danger'}" data-act="proj-status" data-id="${p.id}" title="${done ? 'Réactiver ce projet (le repasser en cours)' : 'Marquer ce projet comme achevé'}">${ic(done ? 'refresh' : 'check')}${done ? 'Réactiver' : 'Marquer achevé'}</button>
          ${done ? '' : `<button class="btn btn-sm" data-act="edit-project" data-id="${p.id}">${ic('edit')}Modifier</button>`}
          <button class="btn btn-sm" data-act="proj-dup" data-id="${p.id}">${ic('copy')}Dupliquer</button>
          ${done ? '' : `<button class="btn btn-sm btn-danger btn-icon" data-act="proj-del" data-id="${p.id}" title="Supprimer">${ic('trash')}</button>`}
          <button class="btn btn-sm btn-primary" data-act="proj-open" data-id="${p.id}">Ouvrir ${ic('arrow')}</button>
        </div>
      </div>`;
    }).join('');
    return `<div class="kpis">
        <div class="kpi"><div class="k-label">${ic('folder')}Projets</div><div class="k-value">${S.projects.length}</div><div class="k-foot">${activeCount} en cours · ${doneCount} achevé(s)</div></div>
        <div class="kpi blue"><div class="k-label">${ic('money')}Total commandes HT</div><div class="k-value">${fmt(mc, 0)}<small>DA</small></div></div>
        <div class="kpi green"><div class="k-label">${ic('check')}Total réalisé HT</div><div class="k-value">${fmt(mg, 0)}<small>DA</small></div><div class="k-foot">Taux global : ${fmt(mc ? (mg / mc) * 100 : 0, 1)} %</div></div>
        <div class="kpi gold"><div class="k-label">${ic('ruler')}Câble FO posé</div><div class="k-value">${fq(cable)}<small>ml</small></div><div class="k-foot">${closers} closers</div></div>
      </div>
      <div class="projects">
        ${cards}
        <div class="card proj-card new-card" data-act="proj-new"><div><div class="nc-ico">${ic('plus')}</div><h3>Nouveau projet ODN</h3><div class="pc-sub">DGD, fiches de tirage et attachement</div></div></div>
      </div>`;
  }

  function projectForm(p) {
    const i = (p && p.info) || {};
    const currentStatus = p ? projStatus(p) : 'active';
    const f = (k, l, full, type = 'text') => `<div class="field ${full ? 'full' : ''}"><label>${l}</label><input type="${type}" name="${k}" value="${esc(i[k] || '')}"></div>`;
    const copyOpts = S.projects.filter((x) => !p || x.id !== p.id).map((x) => `<option value="${x.id}">${esc(x.info.nom)}</option>`).join('');
    return `<form id="projForm" class="form-grid" onsubmit="return false">
      ${f('nom', 'Nom du projet *', true)}${f('objet', 'Objet', true)}
      ${f('do', 'DO')}${f('cmp', 'CMP')}${f('entreprise', 'Entreprise')}${f('surveillant', 'Surveillant')}
      ${f('ods', 'ODS N°')}${f('contrat', 'Contrat N°')}${f('bc', 'BC')}${f('dateDebut', 'Date de début', false, 'date')}
      <div class="field full"><label>État du projet</label><select name="status">
        <option value="active" ${currentStatus === 'active' ? 'selected' : ''}>En cours — réalisation en cours</option>
        <option value="done" ${currentStatus === 'done' ? 'selected' : ''}>Achevé — travaux terminés</option>
      </select></div>
      ${!p ? `<div class="field full"><label>Articles du DGD</label><select name="copyFrom">
        <option value="__none" selected>Aucun article — DGD vide (les articles des FDT seront ajoutés automatiquement)</option>
        <option value="__default">Articles de câble par défaut (RA502A, RA503A, RA504A)</option>
        ${copyOpts ? `<optgroup label="Copier les articles d'un projet existant">${copyOpts}</optgroup>` : ''}
      </select></div>` : ''}
    </form>`;
  }
  function openProjectModal(p) {
    openModal({
      title: p ? 'Modifier les informations du projet' : 'Nouveau projet ODN', icon: p ? 'edit' : 'folder', wide: true,
      body: projectForm(p),
      foot: `<button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-primary" id="pfOk">${ic('save')}${p ? 'Enregistrer' : 'Créer le projet'}</button>`,
      onMount: (m) => {
        $('#pfOk', m).onclick = () => {
          const fd = Object.fromEntries(new FormData($('#projForm', m)).entries());
          if (!fd.nom || !fd.nom.trim()) return toast('Le nom du projet est obligatoire', true);
          const copyFrom = fd.copyFrom; delete fd.copyFrom;
          const status = fd.status === 'done' ? 'done' : 'active'; delete fd.status;
          if (p) { Object.assign(p.info, fd); p.status = status; logEvent(p, 'projet', 'edit', `Informations du projet mises à jour (${fd.nom})`); toast('Projet mis à jour'); }
          else {
            let dgd = [];
            if (copyFrom === '__default') dgd = ['RA502A', 'RA503A', 'RA504A'].map((code) => ({ id: uid(), code, qc: 0, qm: 0 }));
            else if (copyFrom && copyFrom !== '__none') { const src = S.projects.find((x) => x.id === copyFrom); if (src) dgd = src.dgd.map((r) => ({ id: uid(), code: r.code, qc: r.qc, qm: 0 })); }
            const np = { id: uid(), createdAt: Date.now(), status, info: fd, activeCols: DEFAULT_ACTIVE.slice(), dgd, dgdIgnored: [], dotation: [], reversement: [], fdts: [], attach: { num: '01', date: today() }, journal: [] };
            logEvent(np, 'projet', 'add', `Projet « ${fd.nom} » créé`);
            S.projects.push(np); S.current = np.id; S.view = 'dgd'; toast('Projet créé');
          }
          save(); closeModal(); render();
        };
      }
    });
  }

  /* =========================================================
     VUE : BPE
     ========================================================= */
  function viewBPE() {
    const usage = {};
    S.projects.forEach((p) => p.dgd.forEach((r) => { const c = up(r.code); usage[c] = (usage[c] || 0) + 1; }));
    const cats = [...new Set(S.bpe.map((b) => b.cat || 'Divers'))];
    const Q = up(ui.bpeFilter);
    let last = null;
    const rows = S.bpe.map((b, i) => {
      if (ui.bpeCat && (b.cat || 'Divers') !== ui.bpeCat) return '';
      if (Q && !up(b.code).includes(Q) && !up(b.des).includes(Q)) return '';
      let head = '';
      if (b.cat !== last) { head = `<tr class="sub-row"><td colspan="6" style="font-weight:700;color:var(--at-green-2);font-size:12px;text-transform:uppercase;letter-spacing:.5px">${esc(b.cat || 'Divers')}</td></tr>`; last = b.cat; }
      const u = usage[up(b.code)] || 0;
      return head + `<tr>
        <td style="width:120px"><input class="cell-input txt code" style="color:var(--at-green-2);font-weight:700" data-ch="bpe" data-i="${i}" data-f="code" value="${esc(b.code)}"></td>
        <td><input class="cell-input txt" data-ch="bpe" data-i="${i}" data-f="des" value="${esc(b.des)}" title="${esc(b.des)}"></td>
        <td style="width:110px"><input class="cell-input txt" style="text-align:center" data-ch="bpe" data-i="${i}" data-f="unit" value="${esc(b.unit)}"></td>
        <td style="width:140px"><input class="cell-input" inputmode="decimal" data-ch="bpe" data-i="${i}" data-f="pu" value="${inVal(b.pu)}"></td>
        <td class="center" style="width:90px">${u ? `<span class="badge green">${u} projet${u > 1 ? 's' : ''}</span>` : '<span class="dim">—</span>'}</td>
        <td style="width:50px"><button class="btn btn-icon btn-sm btn-ghost" data-act="bpe-del" data-i="${i}" title="Supprimer">${ic('trash')}</button></td>
      </tr>`;
    }).join('');
    return `<div class="alert info">${ic('info')}<div>Le <b>BPE est unique pour tous les projets</b> : toute modification de prix ou de désignation est appliquée immédiatement à tous les DGD et attachements.</div></div>
      <div class="card">
        <div class="card-head">
          <div><h3>Bordereau des Prix Unitaires</h3><div class="sub">${S.bpe.length} articles · ${cats.length} chapitres</div></div>
          <div class="toolbar">
            <div class="search">${ic('search')}<input placeholder="Code ou désignation…" data-in="bpe-filter" value="${esc(ui.bpeFilter)}"></div>
            <div class="field"><select style="height:40px;width:240px" data-in="bpe-cat"><option value="">Tous les chapitres</option>${cats.map((c) => `<option ${ui.bpeCat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div>
            <button class="btn btn-primary" data-act="bpe-add">${ic('plus')}Nouvel article</button>
            <button class="btn" data-act="export-bpe">${ic('sheet')}Excel</button>
          </div>
        </div>
        <div class="table-wrap"><table class="tbl">
          <thead><tr><th>N° Article</th><th>Désignation</th><th class="center">Unité</th><th class="num">Prix unitaire (DA)</th><th class="center">Utilisé</th><th></th></tr></thead>
          <tbody id="bpeBody">${rows || '<tr><td colspan="6" class="center faint" style="padding:30px">Aucun article.</td></tr>'}</tbody>
        </table></div>
      </div>`;
  }
  function openBpeAdd() {
    const cats = [...new Set(S.bpe.map((b) => b.cat || 'Divers'))];
    openModal({
      title: 'Nouvel article BPE', icon: 'book',
      body: `<form id="bpeForm" class="form-grid" onsubmit="return false">
        <div class="field"><label>N° Article *</label><input name="code"></div>
        <div class="field"><label>Unité</label><input name="unit" placeholder="ML, U, M3…"></div>
        <div class="field full"><label>Désignation *</label><textarea name="des"></textarea></div>
        <div class="field"><label>Prix unitaire (DA)</label><input name="pu" inputmode="decimal"></div>
        <div class="field"><label>Chapitre</label><input name="cat" list="catList" value="Ajouts"><datalist id="catList">${cats.map((c) => `<option value="${esc(c)}">`).join('')}</datalist></div>
      </form>`,
      foot: `<button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-primary" id="bfOk">${ic('plus')}Ajouter</button>`,
      onMount: (m) => {
        $('#bfOk', m).onclick = () => {
          const fd = Object.fromEntries(new FormData($('#bpeForm', m)).entries());
          if (!fd.code.trim() || !fd.des.trim()) return toast('Code et désignation obligatoires', true);
          if (bpeIndex()[up(fd.code)]) return toast('Ce code existe déjà dans le BPE', true);
          const item = { code: fd.code.trim(), des: fd.des.trim(), unit: fd.unit.trim(), pu: num(fd.pu), cat: fd.cat.trim() || 'Ajouts' };
          const lastIdx = S.bpe.map((b) => b.cat).lastIndexOf(item.cat);
          if (lastIdx >= 0) S.bpe.splice(lastIdx + 1, 0, item); else S.bpe.push(item);
          save(); closeModal(); render(); toast('Article ajouté au BPE');
        };
      }
    });
  }

  /* =========================================================
     VUE : PARAMÈTRES
     ========================================================= */
  function viewSettings() {
    const used = {};
    S.projects.forEach((p) => { const t = projTotals(p); Object.keys(t).forEach((k) => { used[k] = (used[k] || 0) + t[k]; }); });
    const snaps = readSnapshots();
    const info = storageInfo();
    const totalFdt = S.projects.reduce((a, p) => a + arr(p.fdts).length, 0);
    const backupAge = S.lastBackupAt ? (Date.now() - new Date(S.lastBackupAt).getTime()) : null;
    const backupWarn = !S.lastBackupAt || (backupAge && backupAge > 3 * 24 * 3600 * 1000);
    return `<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(440px,1fr))">
      <div class="card"><div class="card-head"><div><h3>Sauvegarde fiable</h3><div class="sub">Locale, vérifiée, avec points de restauration</div></div></div><div class="card-body">
        ${backupWarn ? `<div class="alert info" style="margin-bottom:12px">${ic('alert')}<div><b>Sauvegarde recommandée.</b> Exportez un fichier JSON pour protéger vos données (cache navigateur, changement de poste, transfert).</div></div>` : `<div class="alert" style="margin-bottom:12px;border-color:rgba(122,193,67,.35);background:rgba(0,166,81,.08)">${ic('check')}<div>Dernier export : <b>${esc(fmtDT(S.lastBackupAt))}</b></div></div>`}
        <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <span class="badge">Projets : ${S.projects.length}</span>
          <span class="badge">FDT : ${totalFdt}</span>
          <span class="badge">BPE : ${arr(S.bpe).length}</span>
          <span class="badge">Stockage local : ~${info.kb} Ko</span>
        </div>
        <div class="faint" style="font-size:12px;margin-bottom:12px;line-height:1.5">Les données sont enregistrées automatiquement dans ce navigateur. L’export crée un fichier de sauvegarde portable. L’import vérifie le format et crée un point de restauration avant remplacement. ${S.lastSavedAt ? `Dernier enregistrement : ${esc(fmtDT(S.lastSavedAt))}.` : ''}</div>
        <div class="btn-group">
          <button class="btn btn-primary" data-act="backup">${ic('download')}Exporter la sauvegarde</button>
          <button class="btn" data-act="restore">${ic('upload')}Importer</button>
          <button class="btn" data-act="backup-now">${ic('save')}Point de restauration</button>
          <button class="btn btn-danger" data-act="reset">${ic('refresh')}Réinitialiser</button>
        </div>
        <input type="file" id="restoreFile" accept=".json,application/json" class="hide">
      </div></div>

      <div class="card" style="grid-column:1/-1"><div class="card-head"><div><h3>Points de restauration</h3><div class="sub">Snapshots locaux (max ${SNAP_LIMIT}) — récupération rapide avant import/réinitialisation ou manuelle</div></div>
        <div class="toolbar"><button class="btn btn-sm" data-act="snapshot-create">${ic('plus')}Créer un point</button></div></div>
        ${snaps.length ? `<div class="table-wrap" style="max-height:none"><table class="tbl">
          <thead><tr><th>Date</th><th>Libellé</th><th>Contenu</th><th></th></tr></thead>
          <tbody>${snaps.map((s) => {
            const m = s.meta || {};
            return `<tr>
              <td class="code" style="white-space:nowrap">${esc(fmtDT(m.at || (m.exportedAt)))}</td>
              <td>${esc(s.label || 'Point de restauration')}</td>
              <td class="faint">${m.projects || 0} projet(s) · ${m.fdts || 0} FDT · ${m.bpe || 0} BPE</td>
              <td style="white-space:nowrap">
                <button class="btn btn-sm" data-act="snapshot-download" data-id="${esc(s.id)}" title="Exporter ce point">${ic('download')}</button>
                <button class="btn btn-sm" data-act="snapshot-restore" data-id="${esc(s.id)}">${ic('refresh')}Restaurer</button>
                <button class="btn btn-sm btn-danger" data-act="snapshot-delete" data-id="${esc(s.id)}">${ic('trash')}</button>
              </td>
            </tr>`;
          }).join('')}</tbody>
        </table></div>` : `<div class="card-body"><div class="muted">Aucun point de restauration pour le moment. Créez-en un avant des modifications importantes, ou utilisez l’export JSON pour une sauvegarde externe.</div></div>`}
      </div>
    </div>`;
  }

  /* =========================================================
     EXPORT PDF PROFESSIONNEL — TABLEAU DE BORD
     ========================================================= */
  function buildDashboardPDF() {
    let totalMc = 0, totalMg = 0, totalCable = 0, totalClosers = 0, totalFdt = 0, totalDgdArticles = 0;
    S.projects.forEach((p) => {
      const s = projSummary(p);
      totalMc += s.t.mc; totalMg += s.t.mg; totalCable += s.cable; totalClosers += s.closers; totalFdt += p.fdts.length; totalDgdArticles += p.dgd.length;
    });
    const globalTaux = totalMc ? (totalMg / totalMc) * 100 : 0;

    const projRows = S.projects.map((p) => {
      const s = projSummary(p);
      const pct = s.t.taux * 100;
      return `<tr>
        <td class="code">${esc(p.info.nom || 'Projet')}</td>
        <td>${esc(p.info.cmp || '')}</td>
        <td>${esc(p.info.entreprise || '')}</td>
        <td class="num">${fmt(s.t.mc, 0)}</td>
        <td class="num">${fmt(s.t.mg, 0)}</td>
        <td class="num">${fq(s.cable)}</td>
        <td class="num">${s.closers}</td>
        <td class="num">${p.fdts.length}</td>
        <td class="num">${fmt(pct, 1)}%</td>
      </tr>`;
    }).join('') || '<tr><td colspan="9" class="center faint">Aucun projet.</td></tr>';

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  @page {
    size: A4 landscape;
    margin: 15mm 12mm 18mm 12mm;
    @bottom-center {
      content: "Algérie Télécom — Suivi Projets ODN · Page " counter(page) " / " counter(pages);
      font-size: 9pt; color: #6b7f99; font-family: 'Inter', sans-serif;
    }
  }
  * { box-sizing: border-box; }
  body { font-family: 'Inter', 'Segoe UI', sans-serif; font-size: 9pt; color: #0d2340; margin: 0; }
  .pdf-header { border-bottom: 4px solid; border-image: linear-gradient(90deg, #00a651, #0072bc) 1; padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start; }
  .pdf-brand { display: flex; gap: 14px; align-items: center; }
  .pdf-brand .db-t { font: 700 18pt "Poppins", sans-serif; color: #0072bc; margin: 0; }
  .pdf-brand .db-s { font-size: 9pt; color: #00a651; font-weight: 700; letter-spacing: .6px; margin: 0; }
  .pdf-title { text-align: right; }
  .pdf-title h1 { margin: 0; font: 700 16pt "Poppins", sans-serif; color: #0d2340; text-transform: uppercase; letter-spacing: .5px; }
  .pdf-title .sub { font-size: 9pt; color: #4a6280; margin-top: 3px; }
  .pdf-info { display: flex; gap: 30px; margin-bottom: 16px; font-size: 8.5pt; }
  .pdf-info div { line-height: 1.5; }
  .pdf-info b { color: #0d2340; }
  table.pdf-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 16px; }
  table.pdf-table th { background: linear-gradient(135deg, #00894a, #005f9e); color: #fff; padding: 8px 6px; border: 1px solid #0b5a7a; font-weight: 600; text-transform: uppercase; font-size: 8pt; letter-spacing: .4px; text-align: center; }
  table.pdf-table td { padding: 6px 8px; border: 1px solid #c9d6e4; vertical-align: middle; }
  table.pdf-table td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  table.pdf-table td.code { font-weight: 700; color: #00733a; white-space: nowrap; }
  table.pdf-table tr:nth-child(even) td { background: #f5f9fc; }
  table.pdf-table tr.total-row td { background: #e8f4ee !important; font-weight: 700; }
  .kpis-pdf { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .kpi-pdf { flex: 1; min-width: 170px; background: #f5f9fc; border: 1px solid #e3ebf5; border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
  .kpi-pdf .kl { font-size: 7.5pt; font-weight: 700; color: #4a6280; text-transform: uppercase; letter-spacing: .5px; }
  .kpi-pdf .kv { font: 700 13pt "Poppins", sans-serif; color: #0d2340; }
  .kpi-pdf .kf { font-size: 7.5pt; color: #6b7f99; }
  .section-title { font: 700 11pt "Poppins", sans-serif; color: #0072bc; margin: 20px 0 8px; padding-bottom: 6px; border-bottom: 2px solid #e8f4ee; display: flex; align-items: center; gap: 8px; }
  .section-title svg { width: 14px; height: 14px; }
  .signs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 30px; }
  .sign-box { text-align: center; font-size: 8.5pt; }
  .sign-line { height: 1px; background: #0d2340; margin: 28px 0 6px; }
  .sign-name { font-weight: 700; color: #0d2340; }
  .sign-role { font-size: 7.5pt; color: #4a6280; text-transform: uppercase; letter-spacing: .4px; }
  .doc-foot { margin-top: 20px; font-size: 8pt; color: #6b7f99; display: flex; justify-content: space-between; border-top: 1px solid #e3ebf5; padding-top: 8px; }
  .center { text-align: center; }
  .faint { color: #6b7f99; }
  .no-print { display: none; }
</style>
</head>
<body>
  <div class="pdf-header">
    <div class="pdf-brand">
      <div style="width:44px;height:44px;background:linear-gradient(135deg,#00a651,#0072bc);border-radius:12px;display:flex;align-items:center;justify-content:center">
        <svg width="24" height="24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 43 32 19l12 24"/><path d="M25 35h14"/></svg>
      </div>
      <div>
        <p class="db-t">Algérie Télécom</p>
        <p class="db-s">DIRECTION OPÉRATIONNELLE</p>
      </div>
    </div>
    <div class="pdf-title">
      <h1>Suivi Projet ODN</h1>
      <div class="sub">Rapport d'activité · Édité le ${frDate(today())}</div>
    </div>
  </div>

  <div class="pdf-info">
    <div><b>Entreprise :</b> ETB NIBRAS TELECOM</div>
    <div><b>DO :</b> AIN DEFLA</div>
    <div><b>CMP :</b> MILIANA</div>
    <div><b>Surveillant :</b> HIADDIHINE HASSEN</div>
  </div>

  <div class="kpis-pdf">
    <div class="kpi-pdf"><div class="kl">Projets</div><div class="kv">${S.projects.length}</div><div class="kf">En suivi</div></div>
    <div class="kpi-pdf"><div class="kl">Fiches de tirage</div><div class="kv">${totalFdt}</div><div class="kf">Créées</div></div>
    <div class="kpi-pdf"><div class="kl">Articles DGD</div><div class="kv">${totalDgdArticles}</div><div class="kf">Décomptés</div></div>
    <div class="kpi-pdf"><div class="kl">Montant Commande</div><div class="kv">${fmt(totalMc, 0)} DA</div><div class="kf">Total HT</div></div>
    <div class="kpi-pdf"><div class="kl">Montant Réalisé</div><div class="kv">${fmt(totalMg, 0)} DA</div><div class="kf">Total HT</div></div>
    <div class="kpi-pdf"><div class="kl">Taux Avancement</div><div class="kv">${fmt(globalTaux, 1)} %</div><div class="kf">Réalisé / Cde</div></div>
    <div class="kpi-pdf"><div class="kl">Câble FO posé</div><div class="kv">${fq(totalCable)} ml</div><div class="kf">Tous projets</div></div>
    <div class="kpi-pdf"><div class="kl">Closers</div><div class="kv">${totalClosers}</div><div class="kf">Sections tirées</div></div>
  </div>

  <div class="section-title">${ic('grid')} Détail par projet</div>
  <table class="pdf-table">
    <thead><tr>
      <th>Projet</th><th>CMP</th><th>Entreprise</th>
      <th class="num">Commande HT</th>
      <th class="num">Réalisé HT</th>
      <th class="num">Câble FO</th>
      <th class="num">Closers</th>
      <th class="num">FDT</th>
      <th class="num">Taux</th>
    </tr></thead>
    <tbody>${projRows}</tbody>
  </table>

  <div class="signs">
    <div class="sign-box"><div class="sign-line"></div><div class="sign-name">Directeur CMP</div><div class="sign-role">Algérie Télécom</div></div>
    <div class="sign-box"><div class="sign-line"></div><div class="sign-name">Le Surveillant</div><div class="sign-role">HIADDIHINE HASSEN</div></div>
    <div class="sign-box"><div class="sign-line"></div><div class="sign-name">Entreprise</div><div class="sign-role">ETB NIBRAS TELECOM</div></div>
    <div class="sign-box"><div class="sign-line"></div><div class="sign-name">Représentant DO</div><div class="sign-role">Direction Opérationnelle</div></div>
  </div>

  <div class="doc-foot">
    <span>Algérie Télécom — Suivi projets ODN · ${frDate(today())}</span>
    <span>Document généré automatiquement — ODN Suivi</span>
  </div>
</body>
</html>`;

    printDoc(html);
  }

  /* =========================================================
     EXPORT EXCEL & IMPRESSION
     ========================================================= */
  function infoBlock(p, cols) {
    const i = p.info;
    return [['DO', i.do], ['CMP', i.cmp], ['ENTREPRISE', i.entreprise], ['Surveillant', i.surveillant], ['Objet', i.objet], ['ODS N°', i.ods], ['Contrat', i.contrat]]
      .filter((x) => x[1]).map((x) => `<tr><td colspan="${cols}" style="border:0;font-weight:bold">${esc(x[0])} : ${esc(x[1])}</td></tr>`).join('');
  }
  function xlsInfoRows(p, cols, opts) {
    opts = opts || {};
    const i = (p && p.info) || {};
    const fields = [
      ['DO', i.do], ['CMP', i.cmp],
      ['ENTREPRISE', i.entreprise], ['Surveillant', i.surveillant],
      ['Objet', i.objet], ['ODS N°', i.ods]
    ];
    if (opts.contratBc !== false) {
      if (i.contrat) fields.push(['Contrat', i.contrat]);
      if (i.bc) fields.push(['BC', i.bc]);
    }
    const left = Math.ceil(cols / 2), right = cols - left;
    const cell = (f, cspan) => `<td colspan="${cspan}" style="border:0;padding:2px 8px 2px 0;font-size:10.5pt;color:#1e293b"><span style="color:#0072bc;font-weight:bold">${esc(f[0])} :</span> ${esc(f[1] || '')}</td>`;
    const rows = [];
    for (let k = 0; k < fields.length; k += 2) {
      const a = fields[k], b = fields[k + 1];
      rows.push(`<tr>${cell(a, left)}${b ? cell(b, right) : `<td colspan="${right}" style="border:0"></td>`}</tr>`);
    }
    return rows.join('');
  }
  function xlsHeader(p, cols, title, opts) {
    opts = opts || {};
    // Export Excel : sans logo (affichage fiable). En-tête professionnel, lisible et organisé.
    const brand = `<tr><td colspan="${cols}" style="border:0;padding:6px 0 2px 0">
      <div style="color:#00894a;font-weight:bold;font-size:11.5pt;letter-spacing:.4px">ALGÉRIE TÉLÉCOM</div>
      <div style="color:#0072bc;font-weight:bold;font-size:16pt;line-height:1.15;margin-top:1px">Direction Opérationnelle</div>
    </td></tr>
    <tr><td colspan="${cols}" style="border:0;border-bottom:1.5pt solid #0072bc;padding:0;height:6px"></td></tr>
    <tr><td colspan="${cols}" style="border:0;height:4px"></td></tr>`;
    return `${brand}${xlsInfoRows(p, cols, opts)}<tr><td colspan="${cols}" style="border:0;height:6px"></td></tr><tr><td colspan="${cols}" class="title" style="font-size:14pt;padding:4px 0">${esc(title)}</td></tr>`;
  }
  function downloadXls(name, sheet, tableHtml, opts) {
    opts = opts || {};
    let pageXml = '';
    let pageCss = '';
    if (opts.pageSetup) {
      const ps = opts.pageSetup;
      const landscape = ps.orientation === 'landscape';
      const paper = ps.paperSize || 9; // 9 = A4
      const m = ps.margins || {};
      const cm = (v, d) => (v == null ? d : v);
      const inVal = (cmv) => (cmv / 2.54).toFixed(4);
      const mt = cm(m.top, 1.9), mb = cm(m.bottom, 1.9), ml = cm(m.left, 1.8), mr = cm(m.right, 1.8), mh = cm(m.header, 0.8), mf = cm(m.footer, 0.8);
      const fitW = (ps.fitToWidth != null) ? ps.fitToWidth : '';
      const fitH = (ps.fitToHeight != null) ? ps.fitToHeight : '';
      const fitToPage = (fitW !== '' || fitH !== '') ? '<x:FitToPage/>' : '';
      const fitPrint = (fitW !== '' || fitH !== '') ? `<x:FitWidth>${fitW !== '' ? fitW : 0}</x:FitWidth><x:FitHeight>${fitH !== '' ? fitH : 0}</x:FitHeight>` : '';
      pageXml = `<x:Print><x:ValidPrinterInfo/><x:PaperSizeIndex>${paper}</x:PaperSizeIndex>${fitPrint}<x:HorizontalResolution>600</x:HorizontalResolution><x:VerticalResolution>600</x:VerticalResolution></x:Print>` +
        `${fitToPage}` +
        `<x:PageSetup>` +
        `<x:Layout x:Orientation="${landscape ? 'Landscape' : 'Portrait'}"/>` +
        `<x:Header x:Margin="${inVal(mh)}"/>` +
        `<x:Footer x:Margin="${inVal(mf)}"/>` +
        `<x:PageMargins x:Bottom="${inVal(mb)}" x:Left="${inVal(ml)}" x:Right="${inVal(mr)}" x:Top="${inVal(mt)}"/>` +
        `</x:PageSetup>`;
      pageCss = `@page{size:${paper === 9 ? 'A4' : 'auto'} ${landscape ? 'landscape' : 'portrait'};margin:${mt}cm ${mr}cm ${mb}cm ${ml}cm;}`;
    }
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:v="urn:schemas-microsoft-com:vml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${esc(sheet)}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>${pageXml}</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <style>v\\:*{behavior:url(#default#VML);} ${pageCss} table{border-collapse:collapse;font-family:Calibri,Arial;font-size:11pt}td,th{border:.5pt solid #8aa;padding:4px;vertical-align:top}th{background:#00894a;color:#fff;font-weight:bold}.num{text-align:right}.code{font-weight:bold;color:#00733a;text-align:left}.tot td{background:#e2f0e8;font-weight:bold}.title{font-size:15pt;font-weight:bold;color:#0072bc;border:0;text-align:center}</style></head><body>${tableHtml}</body></html>`;
    const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name.replace(/[\\/:*?"<>|]+/g, '_') + '.xls';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast('Fichier Excel exporté');
  }
  let _printTitle = '';
  let _printGuard = null;
  function endPrint() {
    document.body.classList.remove('printing');
    const pa = $('#print-area'); if (pa) pa.innerHTML = '';
    try { if (_printTitle) document.title = _printTitle; } catch (e) {}
    if (_printGuard) { clearTimeout(_printGuard); _printGuard = null; }
  }
  function printDoc(html, title) {
    _printTitle = document.title;
    try { document.title = title || (proj() && proj().info && proj().info.nom) || 'Document'; } catch (e) {}
    $('#print-area').innerHTML = html;
    document.body.classList.add('printing');
    if (_printGuard) clearTimeout(_printGuard);
    _printGuard = setTimeout(endPrint, 60000); // sécurité : l'application ne reste jamais bloquée
    setTimeout(() => {
      try { window.print(); } catch (e) { endPrint(); return; }
      setTimeout(endPrint, 3000); // filet de sécurité si « afterprint » n'est pas émis
    }, 120);
  }
  window.addEventListener('afterprint', endPrint);

  function dgdTotalsSummary(p) {
    const rows = dgdRows(p), t = dgdTotals(rows);
    return { rows, t };
  }

  function dgdEndTotalsHTML(p) {
    const { t } = dgdTotalsSummary(p);
    return `<div class="doc-end-totals" style="margin-top:14px;page-break-inside:avoid;break-inside:avoid">
      <table style="width:100%;max-width:560px;margin-left:auto;border-collapse:collapse;font-size:12px">
        <tbody>
          <tr><td style="border:1px solid #c9d6e4;padding:8px 10px;font-weight:700;text-align:right">Montant total HT</td><td style="border:1px solid #c9d6e4;padding:8px 10px;text-align:right;font-weight:700;width:170px">${fmt(t.mg)} DA</td></tr>
          <tr><td style="border:1px solid #c9d6e4;padding:8px 10px;font-weight:700;text-align:right">T.V.A ${fq(S.tva)} %</td><td style="border:1px solid #c9d6e4;padding:8px 10px;text-align:right;font-weight:700">${fmt(t.tva.mg)} DA</td></tr>
          <tr><td style="border:1px solid #c9d6e4;padding:8px 10px;font-weight:800;text-align:right;background:#e8f4ee">Montant total T.T.C</td><td style="border:1px solid #c9d6e4;padding:8px 10px;text-align:right;font-weight:800;background:#e8f4ee">${fmt(t.ttc.mg)} DA</td></tr>
        </tbody>
      </table>
    </div>`;
  }

  function dgdTable(p, withBrand, opts) {
    opts = opts || {};
    const { rows, t } = dgdTotalsSummary(p);
    const tr = rows.map((x) => `<tr><td class="code" style="text-align:left">${esc(x.r.code)}</td><td>${esc(x.b.des)}</td><td style="text-align:center">${esc(x.b.unit)}</td>
      ${tdNum(x.qc, 2, true)}${tdNum(x.qr, 2, true)}${tdNum(x.moins, 2, true)}${tdNum(x.plus, 2, true)}${tdNum(x.pu)}${tdNum(x.mc)}${tdNum(x.mm)}${tdNum(x.mp)}${tdNum(x.mg)}</tr>`).join('');
    const foot = (l, o) => `<tr class="tot"><td colspan="8" class="num">${l}</td>${tdNum(o.mc)}${tdNum(o.mm)}${tdNum(o.mp)}${tdNum(o.mg)}</tr>`;
    const tfoot = opts.repeatTotals === false ? '' : `<tfoot>${foot('Montant total HT', t)}${foot(`T.V.A ${fq(S.tva)} %`, t.tva)}${foot('Montant total T.T.C', t.ttc)}</tfoot>`;
    const xlsSig = opts.excelSignatures ? `<tbody>
      <tr><td colspan="12" style="border:0;height:14px"></td></tr>
      <tr><td colspan="4" style="border:0;font-weight:bold;color:#334155;padding-top:6px">Directeur CMP</td><td colspan="4" style="border:0;font-weight:bold;color:#334155;text-align:center;padding-top:6px">Le Surveillant</td><td colspan="4" style="border:0;font-weight:bold;color:#334155;padding-top:6px">Entreprise</td></tr>
      <tr><td colspan="4" style="border:0;height:50px"></td><td colspan="4" style="border:0"></td><td colspan="4" style="border:0"></td></tr>
      <tr><td colspan="4" style="border:0;font-weight:bold;color:#334155">Représentant DO</td><td colspan="4" style="border:0"></td><td colspan="4" style="border:0;font-weight:bold;color:#334155">Représentant CIL</td></tr>
    </tbody>` : '';
    return `<table class="dgd-doc-table">
      <colgroup><col style="width:90px"><col style="width:360px"><col style="width:70px"><col style="width:100px"><col style="width:100px"><col style="width:85px"><col style="width:85px"><col style="width:95px"><col style="width:120px"><col style="width:105px"><col style="width:105px"><col style="width:120px"></colgroup>
      ${withBrand ? '' : xlsHeader(p, 12, 'DÉCOMPTE GÉNÉRAL DES TRAVAUX')}
      <thead><tr><th style="text-align:left">N°<br>Articles</th><th>DESIGNATION</th><th>Unité</th><th>Qté<br>commande</th><th>Qté<br>réalisée</th><th>Qté<br>(-)<br>cadre</th><th>Qté<br>(+)<br>cadre</th><th>P.U</th><th>Montant<br>commande</th><th>Montant<br>(-)</th><th>Montant<br>(+)</th><th>Montant<br>général</th></tr></thead>
      <tbody>${tr}</tbody>
      ${tfoot}
      ${xlsSig}
    </table>`;
  }
  function docHeader(p, title, sub) {
    const i = p.info;
    return `<div class="doc-head dgd-doc-head">
      <div class="doc-info doc-info-left">
        <div><b>DO :</b> ${esc(i.do)}</div><div><b>CMP :</b> ${esc(i.cmp)}</div><div><b>ENTREPRISE :</b> ${esc(i.entreprise)}</div><div><b>Surveillant :</b> ${esc(i.surveillant)}</div>
      </div>
      <div class="doc-brand doc-brand-center">
        <img src="logo-algerie-telecom.svg" alt="Algérie Télécom" style="height:54px;width:auto;max-width:220px;object-fit:contain;display:block;margin:0 auto">
        <div style="text-align:center"><div class="db-t" style="font-size:14px">Algérie Télécom</div><div class="db-s" style="font-size:9.5px;letter-spacing:.8px">DIRECTION OPÉRATIONNELLE</div></div>
      </div>
      <div class="doc-info doc-info-right">
        <div><b>Objet :</b> ${esc(i.objet)}</div><div><b>ODS N° :</b> ${esc(i.ods)}</div>${i.contrat ? `<div><b>Contrat :</b> ${esc(i.contrat)}</div>` : ''}${i.bc ? `<div><b>BC :</b> ${esc(i.bc)}</div>` : ''}
      </div>
    </div><div class="doc-title">${title}${sub ? `<small>${sub}</small>` : ''}</div>`;
  }
  function fdtTables(p, f, forXls) {
    const cols = activeCols(p).slice();
    const ft = fdtTotals(f);
    Object.keys(ft).forEach((k) => { if (!cols.find((c) => c.key === k) && colMap()[k]) cols.push(colMap()[k]); });
    const keys = cols.map((c) => c.key), ck = keys.filter(isCable);
    const groups = []; cols.forEach((c) => { const g = groups[groups.length - 1]; if (g && g.name === c.group) g.n++; else groups.push({ name: c.group, n: 1 }); });
    const head = `<thead><tr><th rowspan="2">Ligne</th><th rowspan="2">Closer</th>${groups.map((g) => `<th colspan="${g.n}" class="grp-th">${esc(g.name)}</th>`).join('')}<th rowspan="2">Total ml</th></tr>
      <tr>${cols.map((c) => { const w = c.key === 'gm_fp' ? ' style="width:120px"' : ''; return `<th${w}>${esc(c.label)}</th>`; }).join('')}</tr></thead>`;
    let out = '';
    f.lines.forEach((l) => {
      let body = '';
      l.closers.forEach((c, ci) => {
        const segs = c.segs.length ? c.segs : [{ v: {}, obs: '' }];
        segs.forEach((s, si) => {
          const cells = cols.map((col) => {
            if (col.key === 'pbo') {
              if (si !== 0) return '<td></td>';
              const fa = num(c.pboFa), im = num(c.pboIm);
              if (!fa && !im) return '<td></td>';
              const parts = [];
              if (fa) parts.push(`Façade: ${fq(fa)}`);
              if (im) parts.push(`Immeuble: ${fq(im)}`);
              return `<td style="text-align:center;font-size:10.5px;line-height:1.3">${parts.map(esc).join('<br>')}</td>`;
            }
            if (col.key === 'racc') return si === 0 ? (num(c.racc) ? tdNum(num(c.racc), 0, true) : '<td></td>') : '<td></td>';
            const v = num(s.v[col.key]); return v ? tdNum(v, 2, true) : '<td></td>';
          }).join('');
          body += `<tr><td>${si === 0 && ci === 0 ? esc(l.name) : ''}</td><td>${si === 0 ? 'Closer ' + pad2(ci + 1) : ''}</td>${cells}${tdNum(sumObj(s.v, ck), 2, true)}</tr>`;
        });
      });
      const lt = lineTotals(l);
      body += `<tr class="tot"><td colspan="2">TOTAL ${esc(l.name)}</td>${cols.map((c) => tdNum(lt[c.key] || 0, 2, true)).join('')}${tdNum(sumObj(lt, ck), 2, true)}<td></td></tr>`;
      out += forXls ? `<tr><td colspan="${cols.length + 4}" style="border:0"></td></tr>${body}` : `<div class="doc-sub">${esc(l.name)}</div><table>${head}<tbody>${body}</tbody></table>`;
    });
    const totRow = `<tr class="tot"><td colspan="2">TOTAL ${esc(f.name)}</td>${cols.map((c) => tdNum(ft[c.key] || 0, 2, true)).join('')}${tdNum(sumObj(ft, ck), 2, true)}<td></td></tr>`;
    if (forXls) return `<table>${infoBlock(p, cols.length + 4)}<tr><td colspan="${cols.length + 4}" class="title">FICHE DE TIRAGE — ${esc(f.name)}</td></tr>${head}<tbody>${out}<tr><td colspan="${cols.length + 4}" style="border:0"></td></tr>${totRow}</tbody></table>`;
    return out + `<div class="doc-sub">TOTAL ${esc(f.name)}</div><table>${head}<tbody>${totRow}</tbody></table>`;
  }

  /* =========================================================
     ACTIONS (clics)
     ========================================================= */
  const ACTIONS = {
    'go': (el) => go(el.dataset.view),
    'qr-detail': (el) => {
      const p = proj(); if (!p) return;
      const code = up(el.dataset.code || '');
      const bm = bpeIndex();
      const b = bm[code] || { code, des: '', unit: '' };
      const br = codeBreakdownByFdt(p, code);
      const sections = br.items.map((g) => {
        const rows = g.items.map((it) => `<tr>
          <td>${esc(g.fdt)}</td>
          <td>${it.kind === 'uplink' ? `<span class="badge blue" style="margin-right:6px">UPLINK</span>` : ''}${esc(it.label)}</td>
          <td class="num strong">${fq(it.value)}</td>
        </tr>`).join('');
        return `<tr class="qr-group-head"><td colspan="2" style="font-weight:800;color:var(--at-blue-2);background:rgba(0,174,239,.06)">${esc(g.fdt)} <span class="faint" style="font-weight:600;margin-left:8px">(${g.items.length} élément(s))</span></td><td class="num" style="font-weight:800;background:rgba(0,174,239,.06)">${fq(g.sum)}</td></tr>${rows}`;
      }).join('');
      const body = `
        <div class="mb" style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap">
          <div><div class="faint" style="font-size:11px;text-transform:uppercase;letter-spacing:.6px;font-weight:700">Article</div><div style="font-weight:800;font-size:16px;color:var(--text)">${esc(b.code || code)}</div><div class="sub">${esc(b.des || '')}</div></div>
          <div style="margin-left:auto;text-align:right"><div class="faint" style="font-size:11px;text-transform:uppercase;letter-spacing:.6px;font-weight:700">Total Qté réalisée</div><div style="font-family:Poppins,sans-serif;font-weight:800;font-size:24px;color:var(--at-blue-2)">${fq(br.total)} <span style="font-size:12px;color:var(--text-dim);font-weight:600">${esc(b.unit || 'ml')}</span></div></div>
        </div>
        ${br.items.length ? `<div class="table-wrap" style="max-height:none"><table class="tbl">
          <thead><tr><th>FDT</th><th>Câble / Élément</th><th class="num">Quantité</th></tr></thead>
          <tbody>${sections}</tbody>
          <tfoot><tr><td colspan="2" style="font-weight:800">TOTAL</td><td class="num" style="font-weight:800;font-size:15px;color:var(--at-blue-2)">${fq(br.total)}</td></tr></tfoot>
        </table></div>` : `<div class="alert info">${ic('info')}<div>Aucune quantité réalisée trouvée pour cet article dans les fiches de tirage.</div></div>`}
        <div class="faint" style="margin-top:12px;font-size:12px">Détail par FDT et par câble (colonnes de tirage)${code === 'RA502A' ? ' · inclut UPLINK (ml)' : ''}.</div>`;
      openModal({ title: `Détail Qté réalisée — ${b.code || code}`, icon: 'link', body, wide: true, foot: `<button class="btn btn-primary" data-act="modal-close">Fermer</button>` });
    },
    'modal-close': () => closeModal(),
    'modal-back': (el, e) => { if (e.target === el) closeModal(); },

    /* Projets */
    'proj-open': (el, e) => { if (e.target.closest('[data-act]') !== el) return; S.current = el.dataset.id; go('dgd'); },
    'proj-new': () => openProjectModal(null),
    'proj-filter': (el) => {
      const f = el.dataset.filter;
      ui.projFilter = ['all', 'active', 'done'].includes(f) ? f : 'all';
      render();
    },
    'proj-status': (el) => {
      const p = S.projects.find((x) => x.id === el.dataset.id); if (!p) return;
      const next = projStatus(p) === 'done' ? 'active' : 'done';
      p.status = next;
      save();
      render();
      logEvent(p, 'projet', 'edit', `État du projet « ${p.info.nom} » : ${statusLabel(p)}`);
      toast(next === 'done' ? `Projet « ${p.info.nom} » marqué achevé` : `Projet « ${p.info.nom} » réactivé`);
    },
    'edit-project': (el) => openProjectModal(S.projects.find((p) => p.id === el.dataset.id)),
    'proj-dup': (el) => {
      const src = S.projects.find((p) => p.id === el.dataset.id); const c = clone(src);
      c.id = uid(); c.info.nom = src.info.nom + ' (copie)'; c.createdAt = Date.now(); c.status = 'active';
      c.dgd.forEach((r) => { r.id = uid(); }); c.fdts = normFdts(c.fdts.map((f) => ({ ...f, id: null, lines: f.lines.map((l) => ({ ...l, id: null, closers: l.closers.map((cl) => ({ ...cl, id: null, segs: cl.segs.map((s) => ({ ...s, id: null })) })) })) })));
      c.journal = [];
      logEvent(c, 'projet', 'dup', `Projet dupliqué depuis « ${src.info.nom} »`);
      S.projects.push(c); save(); render(); toast('Projet dupliqué');
    },
    'proj-del': (el) => {
      const p = S.projects.find((x) => x.id === el.dataset.id);
      confirmBox(`Supprimer définitivement le projet <b>${esc(p.info.nom)}</b> (DGD, fiches de tirage, attachement) ?`, () => {
        S.projects = S.projects.filter((x) => x.id !== p.id);
        if (S.current === p.id) S.current = S.projects[0] ? S.projects[0].id : null;
        save(); render(); toast('Projet supprimé');
      });
    },

    /* DGD */
    'dgd-add': () => openBpePicker(),
    'dgd-del': (el) => {
      const p = proj(); const r = p.dgd.find((x) => x.id === el.dataset.id);
      confirmBox(`Retirer l'article <b>${esc(r.code)}</b> du DGD de ce projet ?`, () => {
        const code = up(r.code);
        logEvent(p, 'dgd', 'del', `Article ${r.code} retiré du DGD`);
        p.dgd = p.dgd.filter((x) => x.id !== r.id);
        if (!arr(p.dgdIgnored).map(up).includes(code)) p.dgdIgnored = [...arr(p.dgdIgnored), r.code];
        save(); render(); toast('Article retiré');
      }, 'Retirer');
    },
    'dgd-add-missing': () => {
      const p = proj(); const auto = autoByCode(p); const inD = new Set(p.dgd.map((r) => up(r.code))); const bm = bpeIndex();
      const added = Object.keys(auto).filter((c) => auto[c] > 0 && !inD.has(c));
      added.forEach((c) => p.dgd.push({ id: uid(), code: bm[c] ? bm[c].code : c, qc: 0, qm: 0 }));
      const addedSet = new Set(added.map(up));
      p.dgdIgnored = arr(p.dgdIgnored).filter((c) => !addedSet.has(up(c)));
      if (added.length) logEvent(p, 'dgd', 'add', `${added.length} article(s) ajouté(s) automatiquement au DGD depuis les FDT : ${added.join(', ')}`);
      sortDgd(p); save(); render(); toast('Articles ajoutés au DGD');
    },
    'export-dgd': () => {
      const p = proj();
      downloadXls(`DGD - ${p.info.nom}`, 'DGD', dgdTable(p, false, { excelSignatures: true }), {
        pageSetup: {
          orientation: 'landscape',
          paperSize: 9,
          margins: { top: 0.9, bottom: 0.9, left: 0.4, right: 0.4, header: 0.4, footer: 0.7 },
          fitToWidth: 1,
          fitToHeight: 0
        }
      });
    },
    'print-dgd': () => {
      const p = proj();
      const sig = `<div class="doc-signatures" style="margin-top:10px;padding-top:14px;border-top:1px solid #d8e4f0;page-break-inside:avoid;break-inside:avoid">
        <div class="signs" style="margin-top:8px"><div>Directeur CMP</div><div>Le Surveillant</div><div>Entreprise</div></div>
        <div class="signs two" style="margin-top:14px"><div>Représentant DO</div><div>Représentant CIL</div></div>
      </div>`;
      printDoc(`<div class="doc">${docHeader(p, 'Décompte général des travaux')}${dgdTable(p, true, { repeatTotals: false })}<div style="page-break-inside:avoid;break-inside:avoid;break-before:avoid-page">${dgdEndTotalsHTML(p)}${sig}</div></div>`);
    },
    'export-dashboard': () => { printDoc(buildDashboardPDF()); },

    /* FDT */
    'fdt-sel': (el) => { ui.fdtSel = el.dataset.id; render(); },
    'fdt-add': () => {
      const p = proj();
      openModal({
        title: 'Nouvelle fiche de tirage', icon: 'route',
        body: `<div class="form-grid"><div class="field full"><label>Nom de la FDT</label><input id="fdtN" placeholder="ex : FDT 18" value="FDT ${pad2(p.fdts.length + 1)}"></div>
          <div class="field full"><label>Première ligne (optionnel)</label><input id="fdtL" placeholder="ex : LIGNE A FO 72" value="LIGNE A FO 72"></div></div>`,
        foot: `<button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-primary" id="fdtOk">${ic('plus')}Créer</button>`,
        onMount: (m) => {
          $('#fdtOk', m).onclick = () => {
            const name = $('#fdtN', m).value.trim() || 'FDT'; const ln = $('#fdtL', m).value.trim();
            const f = { id: uid(), name, lines: ln ? [{ id: uid(), name: ln, closers: [{ id: uid(), segs: [{ id: uid(), v: {}, obs: '' }] }] }] : [] };
            p.fdts.push(f); ui.fdtSel = f.id;
            logEvent(p, 'fdt', 'add', `Création de la FDT « ${name} »`, { fdt: name });
            if (ln) logEvent(p, 'line', 'add', `Ligne « ${ln} » ajoutée à la FDT « ${name} »`, { fdt: name, line: ln });
            save(); closeModal(); render(); toast(`${name} créée`);
          };
        }
      });
    },
    'fdt-del': (el) => {
      const p = proj(); const f = p.fdts.find((x) => x.id === el.dataset.f);
      confirmBox(`Supprimer la fiche <b>${esc(f.name)}</b> et toutes ses lignes ? Les quantités seront retirées du DGD.`, () => {
        logEvent(p, 'fdt', 'del', `Suppression de la FDT « ${f.name} » (${f.lines.length} ligne(s))`, { fdt: f.name });
        p.fdts = p.fdts.filter((x) => x.id !== f.id); ui.fdtSel = null; save(); render(); toast('FDT supprimée');
      });
    },
    'line-add': (el) => {
      const { p, f } = findSeg(el.dataset);
      const letter = String.fromCharCode(65 + f.lines.length);
      const l = { id: uid(), name: `LIGNE ${letter} FO 72`, closers: [{ id: uid(), segs: [{ id: uid(), v: {}, obs: '' }] }] };
      f.lines.push(l);
      logEvent(p, 'line', 'add', `Ligne « ${l.name} » ajoutée à la FDT « ${f.name} »`, { fdt: f.name, line: l.name });
      save(); render();
      setTimeout(() => { const inp = $(`[data-in="line-name"][data-l="${l.id}"]`); if (inp) { inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); inp.select(); } }, 50);
    },
    'line-del': (el) => {
      const { p, f, l } = findSeg(el.dataset);
      confirmBox(`Supprimer la ligne <b>${esc(l.name)}</b> et ses ${l.closers.length} closer(s) ?`, () => {
        logEvent(p, 'line', 'del', `Suppression de la ligne « ${l.name} » (${l.closers.length} closer(s)) de la FDT « ${f.name} »`, { fdt: f.name, line: l.name });
        f.lines = f.lines.filter((x) => x.id !== l.id); save(); render(); toast('Ligne supprimée');
      });
    },
    'line-dup': (el) => {
      const { p, f, l } = findSeg(el.dataset);
      const c = { id: uid(), name: l.name + ' (copie)', closers: l.closers.map((cl) => ({ id: uid(), segs: cl.segs.map((s) => ({ id: uid(), v: { ...s.v }, obs: s.obs })) })) };
      f.lines.splice(f.lines.indexOf(l) + 1, 0, c);
      logEvent(p, 'line', 'dup', `Ligne « ${l.name} » dupliquée → « ${c.name} » dans la FDT « ${f.name} »`, { fdt: f.name, line: c.name });
      save(); render(); toast('Ligne dupliquée');
    },
    'line-toggle': (el) => { ui.collapsed[el.dataset.l] = !ui.collapsed[el.dataset.l]; el.closest('.line-card').classList.toggle('collapsed'); },
    'closer-add': (el) => {
      const { p, f, l } = findSeg(el.dataset); const c = { id: uid(), segs: [{ id: uid(), v: {}, obs: '' }] };
      l.closers.push(c);
      logEvent(p, 'closer', 'add', `Closer ${pad2(l.closers.length)} ajouté à la ligne « ${l.name} »`, { fdt: f.name, line: l.name, closer: `Closer ${pad2(l.closers.length)}` });
      save(); render(); focusSeg(c.segs[0].id);
    },
    'closer-del': (el) => {
      const { p, f, l, c } = findSeg(el.dataset); const idx = l.closers.indexOf(c) + 1;
      const doDel = () => {
        logEvent(p, 'closer', 'del', `Suppression du Closer ${pad2(idx)} de la ligne « ${l.name} »`, { fdt: f.name, line: l.name, closer: `Closer ${pad2(idx)}` });
        l.closers = l.closers.filter((x) => x.id !== c.id); save(); render(); toast(`Closer ${pad2(idx)} supprimé — renumérotation automatique`);
      };
      if (c.segs.some((s) => Object.values(s.v).some((v) => num(v)))) confirmBox(`Supprimer le <b>Closer ${pad2(idx)}</b> et ses tronçons ?`, doDel); else doDel();
    },
    'seg-add': (el) => {
      const { p, f, l, c } = findSeg(el.dataset); const s = { id: uid(), v: {}, obs: '' };
      c.segs.push(s);
      const ci = l.closers.indexOf(c) + 1, si = c.segs.length;
      logEvent(p, 'seg', 'add', `Tronçon ${pad2(si)} ajouté au Closer ${pad2(ci)} de la ligne « ${l.name} »`, { fdt: f.name, line: l.name, closer: `Closer ${pad2(ci)}`, seg: `Tronçon ${pad2(si)}` });
      save(); render(); focusSeg(s.id);
    },
    'cols-edit': (el, e) => { e.preventDefault(); openColsEditor(); },
    'export-fdt': (el) => { const p = proj(); const f = p.fdts.find((x) => x.id === el.dataset.f); downloadXls(`${f.name} - ${p.info.nom}`, f.name, fdtTables(p, f, true)); },
    'print-fdt': (el) => { const p = proj(); const f = p.fdts.find((x) => x.id === el.dataset.f); printDoc(`<div class="doc">${docHeader(p, 'Fiche de tirage — ' + esc(f.name), `Édité le ${frDate(today())}`)}${fdtTables(p, f, false)}</div>`); },
    'export-recap': () => {
      const p = proj(); const auto = autoByCode(p), bm = bpeIndex();
      const cols = S.cols.filter((c) => p.fdts.some((f) => fdtTotals(f)[c.key])); const ck = cols.map((c) => c.key).filter(isCable);
      let h = `<table>${infoBlock(p, cols.length + 2)}<tr><td colspan="${cols.length + 2}" class="title">RÉCAPITULATIF DES FICHES DE TIRAGE</td></tr><thead><tr><th>FDT</th>${cols.map((c) => `<th>${esc(c.group + ' ' + c.label)}</th>`).join('')}<th>Total câble</th></tr></thead><tbody>`;
      p.fdts.forEach((f) => { const t = fdtTotals(f); h += `<tr><td>${esc(f.name)}</td>${cols.map((c) => tdNum(t[c.key] || 0, 2, true)).join('')}${tdNum(sumObj(t, ck), 2, true)}</tr>`; });
      const pt = projTotals(p); h += `<tr class="tot"><td>TOTAL</td>${cols.map((c) => tdNum(pt[c.key] || 0, 2, true)).join('')}${tdNum(sumObj(pt, ck), 2, true)}</tr></tbody></table><br><table><thead><tr><th>Code BPE</th><th>Désignation</th><th>Unité</th><th>Quantité</th></tr></thead><tbody>`;
      Object.keys(auto).forEach((c) => { const b = bm[c] || {}; h += `<tr><td class="code">${esc(c)}</td><td>${esc(b.des)}</td><td>${esc(b.unit)}</td>${tdNum(auto[c], 2, true)}</tr>`; });
      downloadXls(`Récap FDT - ${p.info.nom}`, 'Recap FDT', h + '</tbody></table>');
    },

    /* Attachement */
    'export-attach': () => {
      const p = proj(); const rows = dgdRows(p);
      const title = `ATTACHEMENT DES TRAVAUX RÉALISÉS — N° ${esc(p.attach.num || '')} du ${frDate(p.attach.date)}`;
      downloadXls(`Attachement ${p.attach.num} - ${p.info.nom}`, 'Attachement', `<table><colgroup><col style="width:110px"><col style="width:420px"><col style="width:80px"><col style="width:120px"></colgroup>${xlsHeader(p, 4, title, { contratBc: false })}
        <thead><tr><th style="text-align:left">N° Articles</th><th>DESIGNATION</th><th>Unité</th><th>Quantité</th></tr></thead>
        <tbody>${rows.map((x) => `<tr><td class="code">${esc(x.r.code)}</td><td>${esc(x.b.des)}</td><td>${esc(x.b.unit)}</td>${tdNum(x.qr, 2, true)}</tr>`).join('')}</tbody>
        <tr><td colspan="4" style="border:0;height:14px"></td></tr>
        <tr><td style="border:0;font-weight:bold;color:#334155;padding-top:6px">Directeur CMP</td><td style="border:0;font-weight:bold;color:#334155;text-align:center;padding-top:6px">Le Surveillant</td><td colspan="2" style="border:0;font-weight:bold;color:#334155;padding-top:6px">Entreprise</td></tr>
        <tr><td style="border:0;height:50px"></td><td style="border:0"></td><td colspan="2" style="border:0"></td></tr>
        <tr><td style="border:0;font-weight:bold;color:#334155">Représentant DO</td><td style="border:0"></td><td colspan="2" style="border:0;font-weight:bold;color:#334155">Représentant CIL</td></tr>
      </table>`);
    },
    'print-attach': () => { const p = proj(); printDoc(attachDocHTML(p), 'Attachement - ' + ((p && p.info && p.info.nom) || '')); },



    /* DEVIS-TR (Travaux Supplémentaires) */
    'export-devis': () => {
      const p = proj(); if (!p) return;
      const rows = devisTRRows(p);
      const t = rows.reduce((a, x) => ({ mp: r2(a.mp + num(x.mp)) }), { mp: 0 });
      const tva = r2(t.mp * ((S.tva || 0) / 100)), ttc = r2(t.mp + tva);
      downloadXls(`Devis Travaux Supplementaires - ${p.info.nom}`, 'Devis TS', `<table><colgroup><col style="width:90px"><col style="width:340px"><col style="width:70px"><col style="width:110px"><col style="width:110px"><col style="width:110px"><col style="width:100px"><col style="width:120px"></colgroup>${xlsHeader(p, 8, 'DEVIS ESTIMATIF ET QUANTITATIF DES TRAVAUX SUPPLÉMENTAIRES ODN', { contratBc: false })}
        <thead><tr><th style="text-align:left">N° Article</th><th>Désignation</th><th>Unité</th><th>Qté commandée</th><th>Qté réalisée</th><th>Qté (+) cadre</th><th>P.U</th><th>Montant (+)</th></tr></thead>
        <tbody>${rows.map((x) => `<tr><td class="code">${esc(x.r.code)}</td><td>${esc(x.b.des)}</td><td>${esc(x.b.unit)}</td>${tdNum(x.qc, 2, true)}${tdNum(x.qr, 2, true)}${tdNum(x.plus, 2, true)}${tdNum(x.pu)}${tdNum(x.mp)}</tr>`).join('') || '<tr><td colspan="8" style="text-align:center">Aucun article avec Qté (+) cadre.</td></tr>'}</tbody>
        ${rows.length ? `<tfoot>
          <tr class="tot"><td colspan="7" style="text-align:right;font-weight:bold">Montant total travaux supplémentaires (HT)</td>${tdNum(t.mp)}</tr>
          <tr class="tot"><td colspan="7" style="text-align:right;font-weight:bold">TVA ${fq(S.tva)} %</td>${tdNum(tva)}</tr>
          <tr class="tot"><td colspan="7" style="text-align:right;font-weight:bold">TOTAL TTC</td>${tdNum(ttc)}</tr>
        </tfoot>` : ''}
      </table>`);
    },
    'print-devis': () => { const p = proj(); if (p) printDoc(devisTRDocHTML(p), 'Devis travaux supplémentaires - ' + ((p.info && p.info.nom) || '')); },

    /* Dotation matériels */
    'dotation-bon-add': () => {
      const p = proj(); if (!p) return;
      p.dotation = normDotationBons(p.dotation);
      const n = p.dotation.length + 1;
      const b = { id: uid(), num: `Bon ${pad2(n)}`, date: today(), items: [{ id: uid(), des: '', unit: '', qdotee: 0, quse: 0, qrev: 0, obs: '' }] };
      p.dotation.push(b);
      save(); render();
      setTimeout(() => { const inp = $(`[data-bon="${b.id}"] input[data-f="num"]`); if (inp) { inp.focus(); inp.select(); inp.scrollIntoView({ block: 'center' }); } }, 40);
    },
    'dotation-bon-del': (el) => {
      const p = proj(); if (!p) return;
      p.dotation = normDotationBons(p.dotation);
      const b = p.dotation.find((x) => x.id === el.dataset.bid);
      confirmBox(`Supprimer <b>${esc((b && b.num) || 'ce bon')}</b> et toutes ses désignations ?`, () => {
        p.dotation = p.dotation.filter((x) => x.id !== el.dataset.bid);
        save(); render(); toast('Bon supprimé');
      });
    },
    'dotation-item-add': (el) => {
      const p = proj(); if (!p) return;
      p.dotation = normDotationBons(p.dotation);
      const b = p.dotation.find((x) => x.id === el.dataset.bid); if (!b) return;
      const it = { id: uid(), des: '', unit: '', qdotee: 0, quse: 0, qrev: 0, obs: '' };
      b.items.push(it);
      save(); render();
      setTimeout(() => { const inp = $(`input[data-bid="${b.id}"][data-iid="${it.id}"][data-f="des"]`); if (inp) { inp.focus(); inp.scrollIntoView({ block: 'center' }); } }, 40);
    },
    'dotation-item-del': (el) => {
      const p = proj(); if (!p) return;
      p.dotation = normDotationBons(p.dotation);
      const b = p.dotation.find((x) => x.id === el.dataset.bid); if (!b) return;
      confirmBox('Supprimer cette désignation ?', () => {
        b.items = arr(b.items).filter((it) => it.id !== el.dataset.iid);
        save(); render(); toast('Désignation supprimée');
      });
    },
    'export-dotation': () => {
      const p = proj(); if (!p) return;
      p.dotation = normDotationBons(p.dotation);
      let n = 0;
      const rows = p.dotation.flatMap((b) => {
        const items = arr(b.items);
        const span = Math.max(1, items.length);
        const bonCell = `<td rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(b.num)}</td>`;
        const dateCell = `<td rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(frDate(b.date) || b.date || '')}</td>`;
        if (!items.length) {
          n++;
          return [`<tr><td style="text-align:left">${n}</td>${bonCell}${dateCell}<td colspan="6" style="text-align:center">Aucune désignation.</td></tr>`];
        }
        return items.map((it, ii) => {
          n++; const qd = num(it.qdotee), qu = num(it.quse), qr = num(it.qrev);
          const merged = ii === 0 ? `${bonCell}${dateCell}` : '';
          return `<tr><td style="text-align:left">${n}</td>${merged}<td>${esc(it.des)}</td><td>${esc(it.unit)}</td>${tdNum(qd, 2, true)}${tdNum(qu, 2, true)}${tdNum(qr, 2, true)}<td>${esc(it.obs)}</td></tr>`;
        });
      });
      downloadXls(`Dotation materiels - ${p.info.nom}`, 'Dotation', `<table><colgroup><col style="width:45px"><col style="width:90px"><col style="width:95px"><col style="width:320px"><col style="width:70px"><col style="width:100px"><col style="width:110px"><col style="width:110px"><col style="width:260px"></colgroup>${xlsHeader(p, 9, 'ÉTAT DE DOTATION MATÉRIELS', { contratBc: false })}
        <thead><tr><th style="text-align:left">N°</th><th>Bon N°</th><th>Date</th><th>Désignation</th><th>Unité</th><th>Dotation</th><th>Attachement</th><th>Reversement</th><th>Observation</th></tr></thead>
        <tbody>${rows.join('') || '<tr><td colspan="9">Aucun bon / matériel.</td></tr>'}</tbody></table>`);
    },
    'print-dotation': () => { const p = proj(); if (p) { p.dotation = normDotationBons(p.dotation); printDoc(dotationDocHTML(p), 'État de dotation matériels - ' + ((p.info && p.info.nom) || '')); } },

    /* Reversement matériels */
    'rev-bon-add': () => {
      const p = proj(); if (!p) return;
      p.reversement = normReversementBons(p.reversement);
      const n = p.reversement.length + 1;
      const b = { id: uid(), num: `Bon ${pad2(n)}`, date: today(), items: [{ id: uid(), des: '', unit: '', qdotee: 0, qte: 0, obs: '' }] };
      p.reversement.push(b);
      save(); render();
      setTimeout(() => { const inp = $(`[data-bon="${b.id}"] input[data-in="reversement"][data-f="num"]`); if (inp) { inp.focus(); inp.select(); inp.scrollIntoView({ block: 'center' }); } }, 40);
    },
    'rev-bon-del': (el) => {
      const p = proj(); if (!p) return;
      p.reversement = normReversementBons(p.reversement);
      const b = p.reversement.find((x) => x.id === el.dataset.bid);
      confirmBox(`Supprimer <b>${esc((b && b.num) || 'ce bon')}</b> et toutes ses désignations ?`, () => {
        p.reversement = p.reversement.filter((x) => x.id !== el.dataset.bid);
        save(); render(); toast('Bon supprimé');
      });
    },
    'rev-item-add': (el) => {
      const p = proj(); if (!p) return;
      p.reversement = normReversementBons(p.reversement);
      const b = p.reversement.find((x) => x.id === el.dataset.bid); if (!b) return;
      const it = { id: uid(), des: '', unit: '', qdotee: 0, qte: 0, obs: '' };
      b.items.push(it);
      save(); render();
      setTimeout(() => { const inp = $(`input[data-in="reversement"][data-bid="${b.id}"][data-iid="${it.id}"][data-f="des"]`); if (inp) { inp.focus(); inp.scrollIntoView({ block: 'center' }); } }, 40);
    },
    'rev-item-del': (el) => {
      const p = proj(); if (!p) return;
      p.reversement = normReversementBons(p.reversement);
      const b = p.reversement.find((x) => x.id === el.dataset.bid); if (!b) return;
      confirmBox('Supprimer cette désignation ?', () => {
        b.items = arr(b.items).filter((it) => it.id !== el.dataset.iid);
        save(); render(); toast('Désignation supprimée');
      });
    },
    'export-reversement': () => {
      const p = proj(); if (!p) return;
      p.reversement = normReversementBons(p.reversement);
      let n = 0;
      const rows = p.reversement.flatMap((b) => {
        const items = arr(b.items);
        const span = Math.max(1, items.length);
        const bonCell = `<td rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(b.num)}</td>`;
        const dateCell = `<td rowspan="${span}" style="vertical-align:middle;text-align:center">${esc(frDate(b.date) || b.date || '')}</td>`;
        if (!items.length) {
          n++;
          return [`<tr><td style="text-align:left">${n}</td>${bonCell}${dateCell}<td colspan="5" style="text-align:center">Aucune désignation.</td></tr>`];
        }
        return items.map((it, ii) => {
          n++; const qd = num(it.qdotee), q = num(it.qte);
          const merged = ii === 0 ? `${bonCell}${dateCell}` : '';
          return `<tr><td style="text-align:left">${n}</td>${merged}<td>${esc(it.des)}</td><td>${esc(it.unit)}</td>${tdNum(qd, 2, true)}${tdNum(q, 2, true)}<td>${esc(it.obs)}</td></tr>`;
        });
      });
      downloadXls(`Reversement materiels - ${p.info.nom}`, 'Reversement', `<table><colgroup><col style="width:45px"><col style="width:90px"><col style="width:95px"><col style="width:340px"><col style="width:70px"><col style="width:110px"><col style="width:110px"><col style="width:260px"></colgroup>${xlsHeader(p, 8, 'ÉTAT DE REVERSEMENT MATÉRIELS', { contratBc: false })}
        <thead><tr><th style="text-align:left">N°</th><th>Bon N°</th><th>Date</th><th>Désignation</th><th>Unité</th><th>Dotation</th><th>Reversement</th><th>Observation</th></tr></thead>
        <tbody>${rows.join('') || '<tr><td colspan="8">Aucun bon / matériel.</td></tr>'}</tbody></table>`);
    },
    'print-reversement': () => { const p = proj(); if (p) { p.reversement = normReversementBons(p.reversement); printDoc(reversementDocHTML(p), 'État de reversement matériels - ' + ((p.info && p.info.nom) || '')); } },

    /* BPE */
    'bpe-add': () => openBpeAdd(),
    'bpe-del': (el) => {
      const b = S.bpe[+el.dataset.i];
      const n = S.projects.filter((p) => p.dgd.some((r) => up(r.code) === up(b.code))).length;
      if (n) return toast(`Impossible : l'article ${b.code} est utilisé dans ${n} projet(s)`, true);
      confirmBox(`Supprimer l'article <b>${esc(b.code)}</b> du BPE ?`, () => { S.bpe.splice(+el.dataset.i, 1); save(); render(); toast('Article supprimé'); });
    },
    'export-bpe': () => downloadXls('BPE', 'BPE', `<table><colgroup><col style="width:100px"><col style="width:420px"><col style="width:80px"><col style="width:120px"><col style="width:220px"></colgroup><tr><td colspan="5" class="title">BORDEREAU DES PRIX UNITAIRES</td></tr><thead><tr><th style="text-align:left">N° Articles</th><th>DESIGNATION</th><th>Unité</th><th>Prix Unitaire</th><th>Chapitre</th></tr></thead><tbody>${S.bpe.map((b) => `<tr><td class="code">${esc(b.code)}</td><td>${esc(b.des)}</td><td>${esc(b.unit)}</td>${tdNum(b.pu)}<td>${esc(b.cat)}</td></tr>`).join('')}</tbody></table>`),

    /* Paramètres */
    'col-add': () => { S.cols.push({ key: 'c_' + uid(), group: 'FO 48', label: 'Conduite', code: 'RA502A' }); save(); render(); },
    'col-del': (el) => {
      const c = S.cols[+el.dataset.i];
      const used = S.projects.some((p) => projTotals(p)[c.key]);
      if (used) return toast('Colonne utilisée dans des fiches de tirage : suppression impossible', true);
      confirmBox(`Supprimer la colonne <b>${esc(c.group + ' ' + c.label)}</b> ?`, () => { S.cols.splice(+el.dataset.i, 1); S.projects.forEach((p) => { p.activeCols = p.activeCols.filter((k) => k !== c.key); }); save(); render(); });
    },
    'backup': () => exportBackup('Export manuel'),
    'backup-project': () => {
      const p = proj();
      const name = p && p.info && p.info.nom ? p.info.nom : 'ODN';
      exportBackup('Sauvegarde projet', name);
    },
    'backup-now': () => { save(true); createSnapshot('Sauvegarde manuelle', false); },
    'restore': () => {
      const inp = $('#restoreFile');
      if (!inp) return;
      inp.value = '';
      inp.onchange = () => {
        const file = inp.files[0]; if (!file) return;
        const rd = new FileReader();
        rd.onload = () => {
          try {
            const obj = JSON.parse(rd.result);
            const ns = normalizeState(obj);
            if (!ns) throw new Error('Format invalide : données BPE/projets introuvables');
            const meta = (obj && obj.meta) || (obj && obj._backup) || {};
            const info = `<div style="text-align:left;line-height:1.6">
              <div><b>Fichier :</b> ${esc(file.name)}</div>
              <div><b>Projets :</b> ${arr(ns.projects).length} · <b>BPE :</b> ${arr(ns.bpe).length} · <b>FDT :</b> ${arr(ns.projects).reduce((a,p)=>a+arr(p.fdts).length,0)}</div>
              ${meta.exportedAt || meta.at ? `<div><b>Date sauvegarde :</b> ${esc(frDate(meta.exportedAt || meta.at))}</div>` : ''}
              <div style="margin-top:10px;color:var(--warn)">L'import remplacera toutes les données actuelles. Un point de restauration sera créé automatiquement avant l'import.</div>
            </div>`;
            openModal({
              title: 'Importer une sauvegarde', icon: 'upload', body: info,
              foot: `<button class="btn" data-act="modal-close">Annuler</button><button class="btn btn-primary" id="restoreOk">${ic('upload')}Importer</button>`,
              onMount: (m) => { $('#restoreOk', m).onclick = () => { try { closeModal(); importBackupObject(obj); } catch (e) { toast('Import impossible : ' + e.message, true); } }; }
            });
          } catch (e) { toast('Fichier invalide : ' + e.message, true); }
        };
        rd.readAsText(file);
      };
      inp.click();
    },
    'snapshot-create': () => createSnapshot('Point manuel (' + fmtDT(new Date().toISOString()) + ')'),
    'snapshot-restore': (el) => {
      const snap = readSnapshots().find((s) => s.id === el.dataset.id);
      if (!snap) return toast('Point de restauration introuvable', true);
      confirmBox(`Restaurer le point <b>${esc(snap.label || 'Sauvegarde')}</b> (${esc(fmtDT(snap.meta && snap.meta.at))}) ?<br>Les données actuelles seront remplacées. Un point de restauration sera créé avant.`, () => {
        try { createSnapshot('Avant restauration', true); importBackupObject({ meta: snap.meta, data: snap.data }, { skipSnapshot: true }); } catch (e) { toast('Restauration impossible : ' + e.message, true); }
      }, 'Restaurer');
    },
    'snapshot-delete': (el) => {
      const list = readSnapshots().filter((s) => s.id !== el.dataset.id);
      writeSnapshots(list); render(); toast('Point de restauration supprimé');
    },
    'snapshot-download': (el) => {
      const snap = readSnapshots().find((s) => s.id === el.dataset.id);
      if (!snap) return toast('Point de restauration introuvable', true);
      downloadJSON({ meta: snap.meta || {}, data: snap.data }, `ODN-snapshot-${(snap.meta && snap.meta.at ? String(snap.meta.at).slice(0,10) : today())}.json`);
      toast('Point de restauration exporté');
    },
    'reset': () => confirmBox('Réinitialiser toutes les données (BPE par défaut, aucun projet) ?<br><b>Toutes vos saisies seront perdues.</b> Un export de sauvegarde sera téléchargé automatiquement.', () => {
      try { createSnapshot('Avant réinitialisation', true); } catch (e) {}
      try { exportBackup('Avant réinitialisation'); } catch (e) {}
      localStorage.removeItem(STORE_KEY); S = fromSeed(); save(true); render(); toast('Données réinitialisées');
    }, 'Réinitialiser')
  };

  function focusSeg(segId) {
    setTimeout(() => { const inp = $(`[data-in="seg"][data-s="${segId}"]`); if (inp) { inp.focus(); inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 40);
  }

  /* =========================================================
     SAISIES (input / change)
     ========================================================= */
  const INPUTS = {
    'dgd': (el) => {
      const p = proj(); const r = p.dgd.find((x) => x.id === el.dataset.id); if (!r) return;
      r[el.dataset.f] = num(el.value);
      save();
      schedulePatch(() => patchDGD());
    },
    'dgd-filter': (el) => {
      ui.dgdFilter = el.value; const Q = up(el.value); const bm = bpeIndex();
      proj().dgd.forEach((r) => { const tr = $(`#dgdTable tr[data-id="${r.id}"]`); if (tr) { const b = bm[up(r.code)] || {}; tr.classList.toggle('hide', !!Q && !up(r.code).includes(Q) && !up(b.des).includes(Q)); } });
    },
    'seg': (el) => {
      const { s } = findSeg(el.dataset); if (!s) return;
      const v = num(el.value);
      if (v) s.v[el.dataset.k] = v; else delete s.v[el.dataset.k];
      el.classList.toggle('has-val', !!v);
      save();
      schedulePatch(() => { syncDgdFromFdt(proj()); patchFDT(); });
    },
    'closer-racc': (el) => {
      const { p, f, l, c } = findSeg(el.dataset); if (!p || !c) return;
      const v = num(el.value);
      if (v) c.racc = v; else delete c.racc;
      el.classList.toggle('has-val', !!v);
      const ci = l ? l.closers.indexOf(c) + 1 : 0;
      logEvent(p, 'seg', v ? 'edit' : 'del', `Raccordement brin — Closer ${pad2(ci)} (ligne « ${l ? l.name : ''} ») : ${v ? fq(v) : '—'}`, { fdt: f ? f.name : '', line: l ? l.name : '', closer: ci ? `Closer ${pad2(ci)}` : '' });
      save();
      schedulePatch(() => { syncDgdFromFdt(proj()); patchFDT(); });
    },
    'closer-pbo': (el) => {
      const { p, f, l, c } = findSeg(el.dataset); if (!p || !c) return;
      const fld = el.dataset.fld; // 'fa' (RA801) ou 'im' (RA803)
      const v = num(el.value);
      if (fld === 'fa') { if (v) c.pboFa = v; else delete c.pboFa; }
      else if (fld === 'im') { if (v) c.pboIm = v; else delete c.pboIm; }
      el.classList.toggle('has-val', !!v);
      const ci = l ? l.closers.indexOf(c) + 1 : 0;
      const label = fld === 'fa' ? 'Façade (RA801)' : 'Immeuble (RA803)';
      logEvent(p, 'seg', v ? 'edit' : 'del', `PBO ${label} — Closer ${pad2(ci)} (ligne « ${l ? l.name : ''} ») : ${v ? fq(v) : '—'}`, { fdt: f ? f.name : '', line: l ? l.name : '', closer: ci ? `Closer ${pad2(ci)}` : '' });
      save();
      schedulePatch(() => { syncDgdFromFdt(proj()); patchFDT(); });
    },
    'obs': (el) => { const { s } = findSeg(el.dataset); if (s) { s.obs = el.value; save(); } },
    'line-name': (el) => { const { l } = findSeg(el.dataset); if (l) { l.name = el.value; save(); } },
    'fdt-name': (el) => { const { f } = findSeg(el.dataset); if (f) { f.name = el.value; save(); const n = $(`.fdt-item[data-id="${f.id}"] .fi-name`); if (n) n.textContent = el.value; } },
    'fdt-uplink': (el) => { const { f } = findSeg(el.dataset); if (f) { f.uplink = el.value; syncDgdFromFdt(proj()); save(); if (S.view === 'dgd') scheduleRender(0); } },
    'attach': (el) => { const p = proj(); p.attach[el.dataset.f] = el.value; save(); $('#attachDoc').innerHTML = attachDocHTML(p); },
    'hide-zero': (el) => { ui.hideZero = !!el.checked; if ($('#attachDoc')) $('#attachDoc').innerHTML = attachDocHTML(proj()); },
    'dotation': (el) => {
      const p = proj(); if (!p) return;
      p.dotation = normDotationBons(p.dotation);
      const b = p.dotation.find((x) => x.id === el.dataset.bid); if (!b) return;
      const iid = el.dataset.iid;
      const f = el.dataset.f;
      if (iid) {
        const it = arr(b.items).find((x) => x.id === iid); if (!it) return;
        if (f === 'qdotee' || f === 'quse' || f === 'qrev') {
          it[f] = num(el.value);
          if (f === 'qdotee') {
            it.qrev = r2(num(it.qdotee) - num(it.quse));
            const revIn = $(`[data-dot-rev="${b.id}:${it.id}"]`); if (revIn) revIn.value = inVal(it.qrev);
          } else if (f === 'quse') {
            it.qrev = r2(num(it.qdotee) - num(it.quse));
            const revIn = $(`[data-dot-rev="${b.id}:${it.id}"]`); if (revIn) revIn.value = inVal(it.qrev);
          } else if (f === 'qrev') {
            it.quse = r2(num(it.qdotee) - num(it.qrev));
            const quseIn = $(`[data-dot-quse="${b.id}:${it.id}"]`); if (quseIn) quseIn.value = inVal(it.quse);
          }
        } else {
          it[f] = el.value;
        }
      } else {
        // Bon-level fields: num, date
        b[f] = el.value;
      }
      save();
    },
    'reversement': (el) => {
      const p = proj(); if (!p) return;
      p.reversement = normReversementBons(p.reversement);
      const b = p.reversement.find((x) => x.id === el.dataset.bid); if (!b) return;
      const iid = el.dataset.iid;
      const f = el.dataset.f;
      if (iid) {
        const it = arr(b.items).find((x) => x.id === iid); if (!it) return;
        if (f === 'qte' || f === 'qdotee') it[f] = num(el.value); else it[f] = el.value;
      } else {
        b[f] = el.value;
      }
      save();
    },
    'bpe-filter': (el) => { ui.bpeFilter = el.value; scheduleRender(200); },
    'bpe-cat': (el) => { ui.bpeCat = el.value; scheduleRender(0); },
    'proj-search': (el) => { ui.projSearch = el.value; scheduleRender(200); }
  };
  const CHANGES = {
    'bpe': (el) => {
      const b = S.bpe[+el.dataset.i]; const f = el.dataset.f;
      if (f === 'code') {
        const nv = el.value.trim(); if (!nv) { el.value = b.code; return; }
        if (up(nv) !== up(b.code) && bpeIndex()[up(nv)]) { toast('Ce code existe déjà', true); el.value = b.code; return; }
        const old = up(b.code);
        S.projects.forEach((p) => p.dgd.forEach((r) => { if (up(r.code) === old) r.code = nv; }));
        S.cols.forEach((c) => { if (up(c.code) === old) c.code = nv; });
        b.code = nv;
      } else if (f === 'pu') b.pu = num(el.value);
      else b[f] = el.value;
      save(); toast(`Article ${b.code} mis à jour`);
    },
    'col': (el) => { const c = S.cols[+el.dataset.i]; c[el.dataset.f] = el.value.trim(); save(); render(); },
    'tva': (el) => { S.tva = num(el.value); save(); toast('TVA mise à jour'); }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act;
    const fn = ACTIONS[act]; if (!fn) return;
    // Projet achevé : lecture seule (impression / Excel / réactivation / consultation uniquement)
    const allowedWhenLocked = new Set(['go','proj-open','proj-filter','proj-status','fdt-sel','modal-close','modal-back','qr-detail','export-dgd','print-dgd','export-fdt','print-fdt','export-recap','export-attach','print-attach','export-devis','print-devis','export-dotation','print-dotation','export-reversement','print-reversement','export-dashboard','toggle-cat','section-toggle','backup','backup-project','backup-create','backup-download','backup-restore','backup-import','backup-import-json','backup-delete','proj-dup']);
    if (!allowedWhenLocked.has(act)) {
      const pById = el.dataset.id ? S.projects.find((x) => x.id === el.dataset.id) : null;
      const locked = (pById && isProjLocked(pById)) || (pById ? false : isProjLocked(proj()));
      // Si action cible un projet précis (edit/del/status déjà géré), respecter son état; sinon état du projet courant
      const targetLocked = pById ? isProjLocked(pById) : isProjLocked(proj());
      if (targetLocked && act !== 'proj-status') { toast('Projet achevé : réactivez-le pour modifier.', true); return; }
    }
    try { fn(el, e); } catch (err) { console.error('Action (' + act + ') :', err); closeModal(); toast("Une erreur est survenue, l'opération a été annulée.", true); }
  });
  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-in]'); if (!el) return;
    if (isProjLocked(proj()) && !['dgd-filter','bpe-filter','bpe-cat','proj-search'].includes(el.dataset.in)) return;
    const fn = INPUTS[el.dataset.in]; if (!fn) return;
    try { fn(el, e); } catch (err) { console.error('Saisie (' + el.dataset.in + ') :', err); }
  });
  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-ch]'); if (!el) return;
    const fn = CHANGES[el.dataset.ch]; if (!fn) return;
    try { fn(el, e); } catch (err) { console.error('Modification (' + el.dataset.ch + ') :', err); }
  });

  /* Journalisation des modifications de texte / valeurs (au moment de la validation du champ) */
  function logFieldChange(el) {
    const kind = el.dataset.in;
    if (!['fdt-name', 'line-name', 'fdt-uplink', 'attach'].includes(kind)) return;
    const oldV = el.defaultValue || '', newV = el.value || '';
    if (oldV === newV) return;
    if (kind === 'attach') {
      const p = proj(); if (!p) return;
      const f = el.dataset.f;
      const msg = f === 'num'
        ? `Attachement — N° : « ${oldV || '—'} » → « ${newV || '—'} »`
        : `Attachement — Date : ${frDate(oldV) || '—'} → ${frDate(newV) || '—'}`;
      logEvent(p, 'attach', 'edit', msg);
      el.defaultValue = el.value; save(); return;
    }
    const { p, f, l } = findSeg(el.dataset);
    if (!p) return;
    if (kind === 'fdt-name' && f) logEvent(p, 'fdt', 'edit', `FDT renommée : « ${oldV} » → « ${newV} »`, { fdt: newV });
    else if (kind === 'line-name' && f && l) logEvent(p, 'line', 'edit', `Ligne renommée : « ${oldV} » → « ${newV} » (FDT « ${f.name} »)`, { fdt: f.name, line: newV });
    else if (kind === 'fdt-uplink' && f) logEvent(p, 'seg', 'edit', `UPLINK de la FDT « ${f.name} » : ${oldV || '—'} → ${newV || '—'} ml`, { fdt: f.name, line: 'UPLINK' });
    el.defaultValue = el.value;
    save();
  }

  function logSegFieldChange(el) {
    const { p, f, l, c, s } = findSeg(el.dataset); if (!p || !s) return;
    const oldV = num(el.defaultValue), newV = num(el.value);
    if (oldV === newV) return;
    const k = el.dataset.k;
    const col = colMap()[k] || { group: '', label: k, code: '' };
    const code = up(col.code);
    const type = code === '805' ? 'gaine' : code.startsWith('50') ? 'poteau' : code.startsWith('RA50') ? 'cable' : 'seg';
    const label = `${col.group || ''} ${col.label || k}`.trim();
    const ci = l.closers.indexOf(c) + 1, si = c.segs.indexOf(s) + 1;
    logEvent(p, type, newV ? 'edit' : 'del', `Tronçon ${pad2(si)} — ${label} : ${oldV ? fq(oldV) : '—'} → ${newV ? fq(newV) : '—'}`, { fdt: f.name, line: l.name, closer: `Closer ${pad2(ci)}`, seg: `Tronçon ${pad2(si)}` });
    el.defaultValue = el.value;
    save();
  }

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (isProjLocked(proj()) && el.closest && el.closest('[data-in]')) return;
    if (el.dataset.in === 'seg') logSegFieldChange(el);
    else logFieldChange(el);
  });
  // Navigation clavier dans la fiche de tirage : Entrée = ligne suivante (crée un tronçon si besoin)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#modalRoot').innerHTML) return closeModal();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (!isProjLocked(proj())) { save(true); toast('Données enregistrées'); } return; }
    const el = e.target;
    if (e.key === 'Enter' && el.dataset && el.dataset.in === 'seg') {
      e.preventDefault();
      if (isProjLocked(proj())) return;
      const all = $$(`[data-in="seg"][data-k="${el.dataset.k}"][data-l="${el.dataset.l}"]`);
      const i = all.indexOf(el);
      if (i < all.length - 1) { all[i + 1].focus(); all[i + 1].select(); }
      else {
        const { p, f, l, c } = findSeg(el.dataset);
        const s = { id: uid(), v: {}, obs: '' };
        c.segs.push(s);
        const ci = l.closers.indexOf(c) + 1, si = c.segs.length;
        logEvent(p, 'seg', 'add', `Tronçon ${pad2(si)} ajouté au Closer ${pad2(ci)} de la ligne « ${l.name} »`, { fdt: f.name, line: l.name, closer: `Closer ${pad2(ci)}`, seg: `Tronçon ${pad2(si)}` });
        save(); render(); setTimeout(() => { const n = $(`[data-in="seg"][data-s="${s.id}"][data-k="${el.dataset.k}"]`); if (n) n.focus(); }, 30);
      }
    }
    if (e.key === 'Enter' && el.dataset && el.dataset.in === 'dgd') { e.preventDefault(); const all = $$(`[data-in="dgd"][data-f="${el.dataset.f}"]`); const n = all[all.indexOf(el) + 1]; if (n) { n.focus(); n.select(); } }
  });
  /* Curseur : au clic on laisse l'utilisateur placer son curseur librement
     (pas de sélection forcée), au clavier (Tab) on sélectionne tout le contenu. */
  let _pointerDown = false;
  document.addEventListener('mousedown', () => { _pointerDown = true; }, true);
  document.addEventListener('mouseup', () => { _pointerDown = false; }, true);
  document.addEventListener('focusin', (e) => {
    const t = e.target;
    if (!t || !t.classList || !t.classList.contains('cell-input')) return;
    if (_pointerDown) return;
    try { t.select(); } catch (err) {}
  });

  $('#projSelect').addEventListener('change', (e) => { S.current = e.target.value; ui.fdtSel = null; if (!VIEWS[S.view].needP) S.view = 'dgd'; save(); render(); });
  const projDrop = $('#projDropdown'), projTrig = $('#projDropdownTrigger'), projPanel = $('#projDropdownPanel');
  if (projTrig && projDrop) {
    projTrig.addEventListener('click', (e) => { e.stopPropagation(); projDrop.classList.toggle('open'); projTrig.setAttribute('aria-expanded', projDrop.classList.contains('open') ? 'true' : 'false'); });
  }
  if (projPanel) {
    projPanel.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-proj-val]'); if (!opt) return;
      const sel = $('#projSelect'); if (!sel) return;
      sel.value = opt.dataset.projVal;
      if (projDrop) projDrop.classList.remove('open');
      if (projTrig) projTrig.setAttribute('aria-expanded', 'false');
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  document.addEventListener('click', (e) => {
    if (projDrop && !projDrop.contains(e.target)) { projDrop.classList.remove('open'); if (projTrig) projTrig.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projDrop) { projDrop.classList.remove('open'); if (projTrig) projTrig.setAttribute('aria-expanded', 'false'); }
  });
  $('#themeBtn').addEventListener('click', () => { S.theme = S.theme === 'light' ? 'dark' : 'light'; save(); renderChrome(); });
  $('#menuBtn').addEventListener('click', () => $('#app').classList.toggle('nav-open'));

  function emptyHTML(icon, title, text, action) {
    return `<div class="empty"><div class="e-ico">${ic(icon)}</div><h3>${esc(title)}</h3><p>${esc(text)}</p>${action || ''}</div>`;
  }

  /* ---------------- Login / Auth (UI/UX premium) ---------------- */
  const AUTH_KEY = 'odn_auth';
  const AUTH_REMEMBER = 'odn_remember';
  // Empreintes — identifiants non stockés en clair.
  // SHA-256 quand disponible (HTTPS/localhost), sinon repli FNV-1a pour que
  // la connexion fonctionne aussi en ouverture locale (file://) et sur mobile.
  const _au = 's:dea9e2b9b9a015e516eab5fb92db2479a4b7172d1ace1ce02502254cfed1e571';
  const _auf = 'f:011df192';
  const _ap = 's:dea9e2b9b9a015e516eab5fb92db2479a4b7172d1ace1ce02502254cfed1e571';
  const _apf = 'f:011df192';
  function _fh(s) {
    let h = 2166136261 >>> 0;
    const str = String(s);
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return ('00000000' + h.toString(16)).slice(-8);
  }
  async function _vh(s) {
    try {
      if (window.crypto && crypto.subtle && window.TextEncoder) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s)));
        return 's:' + Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {}
    return 'f:' + _fh(s);
  }

  function isAuthed() {
    try {
      if (localStorage.getItem(AUTH_REMEMBER) === '1' && localStorage.getItem(AUTH_KEY) === '1') {
        sessionStorage.setItem(AUTH_KEY, '1');
      }
    } catch (e) {}
    try { return sessionStorage.getItem(AUTH_KEY) === '1'; } catch (e) { return false; }
  }

  function maybeAutoSnapshot() {
    try {
      const snaps = readSnapshots();
      const last = snaps[0] && snaps[0].meta && snaps[0].meta.at ? new Date(snaps[0].meta.at).getTime() : 0;
      const hasData = arr(S.bpe).length || arr(S.projects).length;
      if (hasData && (!last || Date.now() - last > 24 * 3600 * 1000)) createSnapshot('Auto (' + frDate(today()) + ')', true);
    } catch (e) {}
  }

  function startApp() {
    // À l'ouverture / après connexion, on affiche toujours le Dashboard comme page principale
    S.view = 'dashboard';
    render(); histSync(true);
    save(true);
    maybeAutoSnapshot();
  }

  function hideLogin() {
    const ov = $('#loginOverlay');
    if (!ov) { startApp(); return; }
    ov.classList.add('hidden');
    ov.setAttribute('aria-hidden', 'true');
    setTimeout(() => { ov.style.display = 'none'; }, 300);
    startApp();
  }

  function initLogin() {
    const ov = $('#loginOverlay');
    if (!ov) { startApp(); return; }
    if (isAuthed()) {
      ov.classList.add('hidden');
      ov.style.display = 'none';
      ov.setAttribute('aria-hidden', 'true');
      startApp();
      return;
    }

    const form = $('#loginForm');
    const userInp = $('#loginUser');
    const passInp = $('#loginPass');
    const err = $('#loginError');
    const btn = $('#loginBtn');
    const btnText = btn ? $('.login-btn-text', btn) : null;
    const card = $('.login-card', ov);
    const toggle = $('#loginTogglePass');
    const remember = $('#loginRemember');
    const forgot = $('#loginForgot');
    const userField = $('[data-field="user"]', ov);
    const passField = $('[data-field="pass"]', ov);
    const userHint = $('#loginUserHint');

    const setFieldState = (field, inp, state, hintMsg) => {
      if (!field || !inp) return;
      field.classList.toggle('is-valid', state === 'valid');
      field.classList.toggle('is-invalid', state === 'invalid');
      inp.setAttribute('aria-invalid', state === 'invalid' ? 'true' : 'false');
      const icon = $('.login-state-icon', field);
      if (icon) icon.innerHTML = state === 'valid'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
        : '';
      if (field === userField && userHint && hintMsg != null) userHint.textContent = hintMsg;
    };

    const clearError = () => {
      if (err) { err.textContent = ''; err.style.color = ''; err.style.background = ''; err.style.borderColor = ''; }
      if (userInp) userInp.setAttribute('aria-invalid', 'false');
      if (passInp) passInp.setAttribute('aria-invalid', 'false');
      if (userField) userField.classList.remove('is-invalid');
      if (passField) passField.classList.remove('is-invalid');
    };

    const validateUser = (show) => {
      const v = (userInp && userInp.value || '').trim();
      if (!v) {
        if (show) { setFieldState(userField, userInp, 'invalid'); if (userHint) userHint.textContent = "Veuillez saisir votre nom d'utilisateur."; }
        else setFieldState(userField, userInp, 'neutral');
        return false;
      }
      setFieldState(userField, userInp, 'valid');
      if (userHint) userHint.textContent = "Identifiant renseigné.";
      return true;
    };

    const validatePass = (show) => {
      const v = (passInp && passInp.value || '');
      if (!v) {
        if (show) setFieldState(passField, passInp, 'invalid');
        else setFieldState(passField, passInp, 'neutral');
        return false;
      }
      setFieldState(passField, passInp, 'valid');
      return true;
    };

    const updateSubmitState = () => {
      const ok = ((userInp && userInp.value || '').trim().length > 0) && ((passInp && passInp.value || '').length > 0);
      if (btn && !btn.classList.contains('loading')) btn.disabled = !ok;
    };

    const showErr = (msg) => {
      if (err) err.textContent = msg || "Nom d'utilisateur ou mot de passe incorrect.";
      if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
      setFieldState(userField, userInp, 'invalid');
      setFieldState(passField, passInp, 'invalid');
      if (passInp) { passInp.value = ''; passInp.focus(); }
      if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
      updateSubmitState();
    };

    if (userInp) {
      userInp.addEventListener('input', () => { clearError(); validateUser(false); updateSubmitState(); });
      userInp.addEventListener('blur', () => validateUser(true));
    }
    if (passInp) {
      passInp.addEventListener('input', () => { clearError(); validatePass(false); updateSubmitState(); });
      passInp.addEventListener('blur', () => validatePass(true));
    }

    if (toggle && passInp) {
      toggle.addEventListener('click', () => {
        const show = passInp.type === 'password';
        passInp.type = show ? 'text' : 'password';
        toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
        toggle.setAttribute('aria-label', show ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
        passInp.focus();
      });
    }

    if (forgot) {
      forgot.addEventListener('click', (e) => {
        e.preventDefault();
        if (err) {
          err.style.color = 'var(--at-blue-2, #00aeef)';
          err.style.background = 'rgba(0,174,239,0.08)';
          err.style.borderColor = 'rgba(0,174,239,0.18)';
          err.textContent = 'Contactez l’administrateur (RIcha Abdelghafour · Cmp Miliana) pour réinitialiser votre accès.';
        }
      });
    }

    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearError();
      const uv = validateUser(true);
      const pv = validatePass(true);
      if (!uv || !pv) { updateSubmitState(); return; }

      const u = (userInp && userInp.value || '').trim();
      const p = (passInp && passInp.value || '');
      const rem = !!(remember && remember.checked);
      if (btn) { btn.disabled = true; btn.classList.add('loading'); }
      if (btnText) btnText.textContent = 'Connexion…';

      // Préservation de la logique d’authentification existante (validation identifiants + délai UX)
      setTimeout(async () => {
        const [uh, ph] = await Promise.all([_vh(u.toUpperCase()), _vh(p)]);
        const okUser = uh === _au || uh === _auf;
        const okPass = ph === _ap || ph === _apf;
        if (uh && ph && okUser && okPass) {
          try { sessionStorage.setItem(AUTH_KEY, '1'); } catch (ex) {}
          try {
            if (rem) { localStorage.setItem(AUTH_KEY, '1'); localStorage.setItem(AUTH_REMEMBER, '1'); }
            else { localStorage.removeItem(AUTH_KEY); localStorage.removeItem(AUTH_REMEMBER); }
          } catch (ex) {}
          // Animation de succès puis transition vers le tableau de bord
          const successEl = $('#loginSuccess', ov);
          if (successEl) successEl.setAttribute('aria-hidden', 'false');
          const succSub = $('#loginSuccess .ls-sub', ov);
          if (succSub) succSub.textContent = u ? `Bienvenue, ${u}` : 'Bienvenue dans votre espace de travail';
          if (card) card.classList.add('success');
          if (btn) btn.classList.remove('loading');
          setTimeout(hideLogin, card ? 1150 : 0);
        } else {
          if (btnText) btnText.textContent = 'Se connecter';
          showErr("Nom d'utilisateur ou mot de passe incorrect.");
        }
      }, 180);
    });

    updateSubmitState();
    initLoginFx(ov, card);
    setTimeout(() => { if (userInp) userInp.focus(); }, 120);
  }

  /* Effets visuels du login : particules, lumière suivant la souris, parallaxe léger */
  function initLoginFx(ov, card) {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const canvas = $('#loginParticles', ov);
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    let raf = 0, parts = [], w = 0, h = 0;
    const colors = ['0,200,83', '0,163,224', '255,255,255'];

    const resize = () => {
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.min(46, Math.round(w * h / 32000)));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.4 + .4, vy: -(Math.random() * .22 + .06), vx: (Math.random() - .5) * .12,
        a: Math.random() * .45 + .15, c: colors[(Math.random() * colors.length) | 0], t: Math.random() * 6.28
      }));
    };
    const frame = () => {
      if (ov.classList.contains('hidden') || ov.style.display === 'none') { raf = 0; return; }
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.t += .02;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + p.c + ',' + (p.a * (.6 + .4 * Math.sin(p.t))).toFixed(3) + ')';
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    if (ctx) {
      resize();
      window.addEventListener('resize', resize, { passive: true });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
        else if (!raf) raf = requestAnimationFrame(frame);
      });
      raf = requestAnimationFrame(frame);
    }

    // Lumière + parallaxe (souris uniquement, throttlé via rAF)
    if (window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const deco = Array.from(ov.querySelectorAll('[data-depth]'));
      let mx = 0, my = 0, ticking = false;
      const update = () => {
        ticking = false;
        ov.style.setProperty('--lg-mx', mx + 'px');
        ov.style.setProperty('--lg-my', my + 'px');
        const nx = mx / window.innerWidth - .5, ny = my / window.innerHeight - .5;
        deco.forEach(el => {
          const d = parseFloat(el.dataset.depth) || 0;
          el.style.translate = (nx * d).toFixed(1) + 'px ' + (ny * d).toFixed(1) + 'px';
        });
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--cx', (mx - r.left) + 'px');
          card.style.setProperty('--cy', (my - r.top) + 'px');
        }
      };
      ov.addEventListener('pointermove', (e) => {
        mx = e.clientX; my = e.clientY;
        ov.classList.add('has-pointer');
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      ov.addEventListener('pointerleave', () => ov.classList.remove('has-pointer'));
    }
  }

  /* Sécurité : une erreur inattendue ne doit jamais laisser un calque (modale / login) bloquer l'application */
  window.addEventListener('error', (e) => {
    console.error(e.error || e.message);
    try { if ($('#modalRoot')) $('#modalRoot').innerHTML = ''; } catch (err) {}
  });
  window.addEventListener('unhandledrejection', (e) => { console.error('Promesse rejetée :', e.reason); });

  initLogin();
  window.__ODN_READY = true;
})();
