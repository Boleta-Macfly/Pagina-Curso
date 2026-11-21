// Genera un flyer por curso (1080x1350, formato Instagram) con Playwright.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const OUT = process.argv[2];
const img = (f) => "data:image/png;base64," + fs.readFileSync(path.join(DIR, f)).toString("base64");

const mark = `<svg viewBox="0 0 166 69" fill="currentColor"><path d="M22 0H38.5L47 19.5H35C28 19.5 23.5 14.5 22 8Z"/><path d="M11 26H49.5L57 44.5H24C17 44.5 12.5 39 11 32Z"/><path d="M0 50H59.5L67 69H19C9 69 2 62 0 53Z"/><path d="M107 0H165.5V5C165.5 13.5 160 19.5 151 19.5H98Z"/><path d="M96 26H137.5V31C137.5 38.5 132.5 44.5 124.5 44.5H88Z"/><path d="M86 50H103.5V54C103.5 62.5 98 69 89.5 69H78Z"/></svg>`;

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
    kitItems: "Aquo Alcalino · Aquo Neutro · Ziox · Lae36 · Claybar · VX45 20 ml ×2",
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
.main{position:absolute;left:64px;right:64px;top:300px;z-index:2}
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
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 28px;margin-top:28px}
.grid li{list-style:none;font-size:22px;font-weight:500;display:flex;gap:14px;align-items:baseline;color:rgba(255,255,255,.9)}
.grid li b{font-family:Saira;font-style:italic;font-weight:800;font-size:20px;color:rgba(255,255,255,.4);min-width:30px}
.kit{display:flex;align-items:center;gap:26px;margin-top:28px;border-radius:24px;background:#151515;border:2px solid rgba(255,255,255,.08);padding:14px 26px 14px 14px}
.kit img{width:300px;height:150px;object-fit:cover;border-radius:16px}
.kit .t{font-size:30px;line-height:1}
.kit p{font-size:18px;color:rgba(255,255,255,.6);margin-top:10px;line-height:1.4}
.foot{position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;align-items:flex-end}
.inc{display:flex;gap:10px}
.inc span{border:2px solid rgba(255,255,255,.2);border-radius:99px;padding:10px 18px;font-size:18px;font-weight:600}
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
  <ul class="grid">${c.modules.map((m, i) => `<li><b>${String(i + 1).padStart(2, "0")}</b>${m}</li>`).join("")}</ul>
  <div class="kit"><img src="${img(c.kitImg)}"><div><div class="d t">${c.kit}</div><p>${c.kitItems}</p></div></div>
</div>
<div class="foot">
  <div><div class="k" style="margin-bottom:12px">También incluye</div><div class="inc"><span>Certificación</span><span>Video de tus prácticas</span><span>Soporte técnico</span></div></div>
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
