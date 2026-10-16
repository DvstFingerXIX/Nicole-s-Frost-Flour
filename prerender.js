// Pre-renders the price list into index.html so Google and link previews can read it without running JavaScript.
// Usage:  node prerender.js        (needs Node 18+; uses live Supabase data when online, otherwise menu-default.js)
// On Vercel you can set this as the Build Command so every deploy refreshes the snapshot.
const fs = require('fs');
global.window = {};
require('./menu-default.js'); require('./config.js');
const M = window.MENU0, SB = window.SB;
(async () => {
  let remote = null;
  try {
    const rs = await fetch(SB.url + '/rest/v1/site_data?id=eq.main&select=data', { headers: { apikey: SB.key }, signal: AbortSignal.timeout(8000) });
    if (rs.ok) { const rows = await rs.json(); remote = (rows[0] && rows[0].data) || null; }
  } catch (e) {}
  let D = M.D, FL = M.FL;
  if (remote) { if (remote.D) D = remote.D; if (remote.flavors && remote.flavors.length) FL = remote.flavors; }
  const sold = (remote && remote.sold) || {}, tx = v => String(v || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const html = D.map(([t0, n, items, st], i) => {
    const t = t0.replace(' ★ Bestseller', ''), star = !!st || t !== t0;
    return '<section id="s' + i + '"' + (star ? ' class="star"' : '') + '><h2>' + t + (star ? ' <span class="bs">★ Bestseller</span>' : '') + '</h2>' + (n ? '<p class="note">' + n + '</p>' : '') + '<ul>' + items.map(x => {
      const sub = typeof x[1] === 'string', p = sub ? x[2] : x[1], fl = !sub && x[2], cl = [sold[x[0]] ? 'sold' : '', fl ? 'hasfl' : ''].filter(Boolean).join(' ');
      return '<li' + (cl ? ' class="' + cl + '"' : '') + '><span class="n">' + x[0] + (sub ? ' <small>' + x[1] + '</small>' : '') + (fl ? '<small class="fl">Choose from: ' + FL.map(tx).join(', ') + '</small>' : '') + '</span><i></i><b>' + (sold[x[0]] ? 'Sold out' : '₱' + p) + '</b></li>';
    }).join('') + '</ul></section>';
  }).join('\n');
  let h = fs.readFileSync('index.html', 'utf8');
  const block = '<!--PRERENDER:START-->\n' + html + '\n<!--PRERENDER:END-->';
  if (h.includes('<!--PRERENDER:START-->')) h = h.replace(/<!--PRERENDER:START-->[\s\S]*?<!--PRERENDER:END-->/, () => block);
  else h = h.replace('<main id="m"></main>', () => '<main id="m">' + block + '</main>');
  fs.writeFileSync('index.html', h);
  console.log('Pre-rendered ' + D.length + ' categories from ' + (remote ? 'live Supabase data' : 'menu-default.js (offline)') + '.');
})();
