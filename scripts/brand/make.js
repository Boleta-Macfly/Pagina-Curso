// Genera el icono (favicon) y la imagen para compartir en redes (Open Graph).
// Uso: node scripts/brand/make.js  (requiere Playwright)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const img = (f) => "data:image/jpeg;base64," + fs.readFileSync(path.join(ROOT, "public", f)).toString("base64");
const mark = `<svg viewBox="0 0 166 69" fill="currentColor"><path d="M22 0H38.5L47 19.5H35C28 19.5 23.5 14.5 22 8Z"/><path d="M11 26H49.5L57 44.5H24C17 44.5 12.5 39 11 32Z"/><path d="M0 50H59.5L67 69H19C9 69 2 62 0 53Z"/><path d="M107 0H165.5V5C165.5 13.5 160 19.5 151 19.5H98Z"/><path d="M96 26H137.5V31C137.5 38.5 132.5 44.5 124.5 44.5H88Z"/><path d="M86 50H103.5V54C103.5 62.5 98 69 89.5 69H78Z"/></svg>`;
const fonts = `<link href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@1,800&family=Inter:wght@500;600&display=block" rel="stylesheet">`;

const icon = (size, radius) => `<!doctype html><html><head><style>
*{margin:0}body{width:${size}px;height:${size}px;display:grid;place-items:center;background:transparent}
.b{width:${size}px;height:${size}px;border-radius:${radius}px;background:#0a0a0a;display:grid;place-items:center;color:#fff}
.b svg{width:${size * 0.72}px}</style></head><body><div class="b">${mark}</div></body></html>`;

const og = `<!doctype html><html><head>${fonts}<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0a0a0a;color:#fff;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.photo{position:absolute;right:0;top:0;width:560px;height:630px;background:url(${img("cursos/ceramico-portada.jpg")}) center/cover}
.photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0a0a0a 0%,rgba(10,10,10,.35) 45%,rgba(10,10,10,0) 100%)}
.c{position:absolute;left:72px;top:64px;bottom:64px;width:640px;display:flex;flex-direction:column;justify-content:space-between}
.logo{display:flex;align-items:center;gap:16px;font-family:Saira;font-style:italic;font-weight:800;font-size:34px}
.logo svg{height:36px}
h1{font-family:Saira;font-style:italic;font-weight:800;text-transform:uppercase;font-size:84px;line-height:.9}
h1 span{color:transparent;-webkit-text-stroke:2px #fff}
p{font-size:24px;color:rgba(255,255,255,.7);margin-top:20px}
.pills{display:flex;gap:12px}
.pills span{white-space:nowrap;border:2px solid rgba(255,255,255,.25);border-radius:99px;padding:10px 20px;font-size:20px;font-weight:600}
.pills span.w{background:#fff;color:#000;border-color:#fff}
</style></head><body><div class="photo"></div><div class="c">
<div class="logo">${mark}<span>AF ACADEMY</span></div>
<div><h1>Cursos de PPF<br><span>y cerámico</span></h1><p>Práctica real en taller con AlexAF · Trainer Oficial Feynlab Perú</p></div>
<div class="pills"><span class="w">Inscripciones abiertas</span><span>San Miguel, Lima</span><span>Certificación</span></div>
</div></body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [file, size, radius] of [["icon.png", 512, 112], ["apple-icon.png", 180, 0], ["favicon-48.png", 48, 10]]) {
    await p.setViewportSize({ width: size, height: size });
    await p.setContent(icon(size, radius));
    await p.screenshot({ path: path.join(__dirname, file), omitBackground: true });
  }
  await p.setViewportSize({ width: 1200, height: 630 });
  await p.setContent(og, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "opengraph-image.png") });
  await b.close();
})();
