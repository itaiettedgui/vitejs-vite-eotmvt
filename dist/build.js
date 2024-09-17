(function () {
  'use strict';
  try {
    if (typeof document < 'u') {
      var e = document.createElement('style');
      e.appendChild(
        document.createTextNode(
          ':root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}img{width:100%}p{margin:0;font-size:.75rem}#overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:2147483647;visibility:hidden}#popup{display:grid;overflow-y:scroll;background-color:#fff;padding:20px;border-radius:5px;box-shadow:0 2px 10px #0000001a;text-align:center;max-width:50%;max-height:50%;gap:1rem;grid-template-columns:200px 200px}'
        )
      ),
        document.head.appendChild(e);
    }
  } catch (t) {
    console.error('vite-plugin-css-injected-by-js', t);
  }
})();
(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) d(e);
  new MutationObserver((e) => {
    for (const o of e)
      if (o.type === 'childList')
        for (const i of o.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && d(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const o = {};
    return (
      e.integrity && (o.integrity = e.integrity),
      e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function d(e) {
    if (e.ep) return;
    e.ep = !0;
    const o = n(e);
    fetch(e.href, o);
  }
})();
const u =
    'https://gist.githubusercontent.com/amoskueez/bcf90893c955e694dfc7bc54d0f3677a/raw/029c0f032debb02b859a34bee037908343fe552d/recommendations.json',
  l = async () => {
    try {
      const t = await fetch(u);
      if (!t.ok) throw new Error(`Response status: ${t.status}`);
      return await t.json();
    } catch (t) {
      console.log(t);
    }
    return [];
  },
  s = document.createElement('div'),
  c = document.createElement('div'),
  p = () => {
    l().then((t) => {
      let r = '';
      t.forEach((n) => {
        r += `<div>
                      <a href="${n.url}" target="_blank">
                        <img src="${n.thumbnail_url}"/ >  
                        <p>${n.title}</p>
                      </a>
                    </div>`;
      }),
        (c.innerHTML = r);
    });
  },
  a = () => {
    s.style.visibility = 'visible';
  },
  f = () => {
    (s.id = 'overlay'),
      (c.id = 'popup'),
      s.appendChild(c),
      document.body.appendChild(s),
      p();
  };
document.addEventListener('DOMContentLoaded', () => {
  f(),
    document.addEventListener('mouseleave', () => {
      a();
    });
});
window.onpopstate = (t) => {
  a(), (window.onpopstate = null), t && t.preventDefault();
};
