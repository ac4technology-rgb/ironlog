/* IronLog service worker — build afa53b4e */
const SHELL='ironlog-shell-afa53b4e',IMG='ironlog-img-v1';
const ASSETS=["./","index.html","app.css?v=80096a4a","data.js?v=d20cc3ab","app.js?v=137ca480","manifest.json","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","icons/apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('ironlog-shell-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(SHELL).then(c=>c.put('index.html',cp))}return res}).catch(()=>caches.match('index.html',{cacheName:SHELL}).then(m=>m||caches.match('./'))));return}
  if(u.pathname.includes('/img/')){e.respondWith(caches.open(IMG).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok&&(u.pathname.endsWith('.js')||u.pathname.endsWith('.css')||u.pathname.endsWith('.png'))){const cp=res.clone();caches.open(SHELL).then(c=>c.put(r,cp))}return res})))});
