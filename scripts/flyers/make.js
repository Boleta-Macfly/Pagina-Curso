// Genera un flyer por curso (1080x1350, formato Instagram) con Playwright.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const OUT = process.argv[2];
const img = (f) => "data:image/png;base64," + fs.readFileSync(path.join(DIR, f)).toString("base64");

const mark = `<svg viewBox="0 0 166 69" fill="currentColor"><path d="M22 0H38.5L47 19.5H35C28 19.5 23.5 14.5 22 8Z"/><path d="M11 26H49.5L57 44.5H24C17 44.5 12.5 39 11 32Z"/><path d="M0 50H59.5L67 69H19C9 69 2 62 0 53Z"/><path d="M107 0H165.5V5C165.5 13.5 160 19.5 151 19.5H98Z"/><path d="M96 26H137.5V31C137.5 38.5 132.5 44.5 124.5 44.5H88Z"/><path d="M86 50H103.5V54C103.5 62.5 98 69 89.5 69H78Z"/></svg>`;


// Iconos de "También incluye" (mismos trazos que src/components/ItemIcons.tsx)
const ic = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICON = {
  cert: ic(`<path d="M14.5 19H5a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 5 4h14a1.5 1.5 0 0 1 1.5 1.5V11"/><path d="M7 8h10M7 11.5h6"/><circle cx="18" cy="15" r="2.6"/><path d="m16.6 17.2-.8 3.8 2.2-1.2 2.2 1.2-.8-3.8"/>`),
  video: ic(`<rect x="2.5" y="6.5" width="13" height="11" rx="2"/><path d="m15.5 10.5 6-3.5v10l-6-3.5"/><circle cx="6.5" cy="10" r="1" fill="currentColor" stroke="none"/>`),
  group: ic(`<circle cx="8" cy="8" r="2.8"/><path d="M2.5 19c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/><circle cx="15.5" cy="7" r="2.2"/><path d="M15.5 11.5c1 0 2 .3 2.8.8"/><rect x="15" y="15" width="6.5" height="5.5" rx="1"/><path d="M16.5 15v-1.3a1.75 1.75 0 0 1 3.5 0V15"/>`),
  support: ic(`<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-1.5 2.5-4 2.5h-2"/>`),
  cap: ic(`<path d="M3.5 15.5c0-5 3.5-9 8-9s7.5 3.5 7.5 8"/><path d="M3.5 15.5h15.5c1.7 0 2.5.8 2.5 1.6 0 .7-.6 1.2-1.6 1.2H7.5c-2.2 0-4-1.2-4-2.8Z"/><path d="M11.5 6.5c-1.5 2.5-2 5.5-1.8 9"/>`),
  polo: ic(`<path d="M9 3.5 4 5.5 2.5 10l3 1.2L7 9.5V20.5h10V9.5l1.5 1.7 3-1.2L20 5.5l-5-2"/><path d="M9 3.5 12 7l3-3.5"/><path d="M12 7v4"/>`),
};

const courses = [
  {
    slug: "curso-tratamiento-ceramico",
    title: ["Tratamiento", "Cerámico"],
    date: "9 y 10 de diciembre",
    normal: "S/ 1,500",
    presale: "S/ 1,300",
    hero: "hero-ceramico.png",
    kitImg: "kit-ceramico.png",
    kit: "Kit Alcance Pro para tus primeros servicios",
    kitItems: "Aquo Alcalino · Aquo Neutro · Ziox · Lae36 · Claybar · VX45&nbsp;20&nbsp;ml&nbsp;×2",
    modules: [
      "Distinguir los pH de shampoos",
      "Prelavado acorde a cada superficie",
      "Descontaminación química y manual",
      "Eliminación de imperfecciones",
      "Pulido en 3 etapas",
      "Preparación de la superficie",
      "Aplicación del recubrimiento",
    ],
  },
  {
    slug: "curso-ppf",
    title: ["Instalación", "de PPF"],
    date: "11 y 12 de diciembre",
    normal: "S/ 3,300",
    presale: "S/ 2,800",
    hero: "hero-ppf.png",
    kitImg: "kit-ppf.png",
    kit: "Kit PPF Película Da Vida",
    kitItems: "2.5 m de PPF de regalo · Magic Gel 1 L · Magic Activator 1 L · Paletas · Cuchilla",
    modules: [
      "Precortes de manera manual",
      "Precortes utilizando plotter",
      "Uso del software y el plotter",
      "PPF en piezas complejas",
      "Instalación interior y exterior",
    ],
  },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@1,700;1,800;1,900&family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#0a0a0a;color:#fff;font-family:Inter,sans-serif;overflow:hidden;position:relative}
.d{font-family:Saira;font-style:italic;font-weight:800;text-transform:uppercase;line-height:.88}
.hero{position:absolute;inset:0 0 auto 0;height:620px;background:url(${img(c.hero)}) center/cover}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,.55) 0%,rgba(10,10,10,0) 30%,rgba(10,10,10,.6) 70%,#0a0a0a 100%)}
.top{position:absolute;top:52px;left:64px;right:64px;display:flex;justify-content:space-between;align-items:center;z-index:2}
.logo{display:flex;align-items:center;gap:14px;font-size:34px}
.logo svg{height:34px}
.pill{border:2px solid #fff;border-radius:99px;padding:10px 22px;font-weight:700;font-size:18px;letter-spacing:.18em;text-transform:uppercase}
.main{position:absolute;left:64px;right:64px;top:262px;z-index:2}
.eyebrow{font-size:20px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:16px}
.eyebrow:before{content:"";width:48px;height:2px;background:#fff}
h1{font-size:124px;margin-top:20px}
h1 .o{color:transparent;-webkit-text-stroke:2px #fff}
.row{display:flex;gap:14px;margin-top:30px;align-items:stretch}
.box{border:2px solid rgba(255,255,255,.18);border-radius:24px;padding:20px 26px}
.k{font-size:15px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.v{font-size:40px;margin-top:6px;white-space:nowrap}
.price{background:#fff;color:#000;border-radius:24px;padding:20px 28px;display:flex;gap:22px;align-items:flex-end}
.price s{white-space:nowrap;font-size:26px;color:rgba(0,0,0,.45);font-weight:600}
.price .k{color:rgba(0,0,0,.5)}
.price .v{font-size:64px;white-space:nowrap}
.split{display:flex;margin-top:24px;height:46px;border-radius:14px;overflow:hidden;font-size:17px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.split .th{width:20%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,.25);border-right:0;border-radius:14px 0 0 14px;color:rgba(255,255,255,.8)}.split .pr{flex:1;display:flex;align-items:center;justify-content:center;background:#fff;color:#000}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 28px;margin-top:24px}
.grid li{list-style:none;font-size:22px;font-weight:500;display:flex;gap:14px;align-items:baseline;color:rgba(255,255,255,.9)}
.grid li b{font-family:Saira;font-style:italic;font-weight:800;font-size:20px;color:rgba(255,255,255,.4);min-width:30px}
.kit{display:flex;align-items:center;gap:26px;margin-top:28px;border-radius:24px;background:#151515;border:2px solid rgba(255,255,255,.08);padding:14px 26px 14px 14px}
.kit img{width:280px;height:130px;object-fit:cover;border-radius:16px}
.kit .t{font-size:30px;line-height:1}
.kit p{font-size:18px;color:rgba(255,255,255,.6);margin-top:10px;line-height:1.4}
.foot{position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;align-items:flex-end}
.inc{display:grid;grid-template-columns:auto auto;gap:10px;justify-content:start}
.inc span{border:2px solid rgba(255,255,255,.2);border-radius:99px;padding:8px 18px 8px 10px;font-size:18px;font-weight:600;white-space:nowrap;display:flex;align-items:center;gap:10px}.inc i{display:flex;gap:2px;background:#fff;color:#000;border-radius:99px;padding:5px 7px}.inc i svg{width:26px;height:26px}
.cta{text-align:right;font-size:18px;color:rgba(255,255,255,.6)}
.cta .d{font-size:34px;color:#fff;margin-top:6px}
.bigmark{position:absolute;right:-80px;bottom:150px;width:560px;color:rgba(255,255,255,.035);z-index:1}
</style></head><body>
<div class="hero"></div>
<div class="bigmark">${mark}</div>
<div class="top"><div class="logo">${mark}<span class="d">AF Academy</span></div><div class="pill">Preventa</div></div>
<div class="main">
  <div class="eyebrow">Curso intensivo de detailing</div>
  <h1 class="d">${c.title[0]}<br><span class="o">${c.title[1]}</span></h1>
  <div class="row">
    <div class="box" style="flex:1"><div class="k">Fecha y lugar</div><div class="v d">${c.date}</div><div style="font-size:22px;font-weight:600;margin-top:8px;color:rgba(255,255,255,.75)">San Miguel · 2 días · Presencial</div></div>
    <div class="price"><div><div class="k">Normal</div><s>${c.normal}</s></div><div><div class="k">Preventa</div><div class="v d">${c.presale}</div></div></div>
  </div>
  <div class="split"><div class="th">20% teórico</div><div class="pr">80% práctico</div></div>
  <ul class="grid">${c.modules.map((m, i) => `<li><b>${String(i + 1).padStart(2, "0")}</b>${m}</li>`).join("")}</ul>
  <div class="kit"><img src="${img(c.kitImg)}"><div><div class="d t">${c.kit}</div><p>${c.kitItems}</p></div></div>
</div>
<div class="foot">
  <div><div class="k" style="margin-bottom:12px">También incluye</div><div class="inc"><span><i>${ICON.cert}</i>Certificación</span><span><i>${ICON.video}</i>Video de tus prácticas</span><span><i>${ICON.group}</i>Asesoría grupal 1 mes</span><span><i>${ICON.cap}${ICON.polo}</i>Merch</span></div></div>
  <div class="cta">Dictado por AlexAF · @alexaf___<div class="d">Reserva tu cupo</div></div>
</div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const c of courses) {
    await p.setContent(html(c), { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(OUT, `flyer-${c.slug}.png`) });
  }
  await b.close();
})();
