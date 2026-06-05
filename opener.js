(function(){
  const T=window.TEMPLATE||{}, W=window.WEDDING||{};
  if(!T.opener || localStorage.getItem((T.theme||"template")+"OpenerSeen")==="1") return;
  const style=document.createElement("style");
  style.textContent=`
    .wb-opener{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:var(--opener-bg,#17120f);color:var(--opener-ink,#fff7e8);transition:opacity .45s ease,visibility .45s}
    .wb-opener.hide{opacity:0;visibility:hidden;pointer-events:none}
    .wb-stage{width:min(560px,94vw);display:grid;justify-items:center;gap:18px}
    .wb-object{width:min(460px,92vw);min-height:285px;position:relative;display:grid;place-items:center;text-align:center;color:var(--opener-text,#322518);box-shadow:0 28px 70px #0008;overflow:hidden}
    .wb-copy{position:relative;z-index:2;padding:22px;display:grid;gap:10px}
    .wb-copy .k{font:700 11px/1.4 ui-monospace,monospace;letter-spacing:2px;text-transform:uppercase;color:var(--opener-accent,#9b4c3d)}
    .wb-copy h2{font:700 clamp(28px,9vw,52px)/.95 Georgia,serif;margin:0;color:var(--opener-title,#2f251d)}
    .wb-copy p{margin:0;font:500 14px/1.6 system-ui,sans-serif;color:#6b5a48}
    .wb-open-btn{position:relative;margin-top:18px;border:0;background:var(--opener-accent,#9b4c3d);color:#fff;padding:13px 18px;border-radius:999px;font:800 12px/1 system-ui,sans-serif;text-transform:uppercase;letter-spacing:1px;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.24)}
    .wb-open-btn:active{transform:translateY(4px);box-shadow:0 2px 0 rgba(0,0,0,.24)}
    .wb-map{background:#efe1c3;border:2px solid #8b6840;border-radius:14px;transform:rotate(-2deg)}
    .wb-map:before{content:"";position:absolute;inset:24px;border:3px dashed #9a7650;border-radius:47% 53% 45% 55%;transform:rotate(10deg)}
    .wb-map:after{content:"";position:absolute;left:18%;top:28%;width:18px;height:18px;background:var(--opener-accent);border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:210px 80px 0 var(--opener-accent),110px 150px 0 var(--opener-accent)}
    .wb-opener.open .wb-map{animation:mapOpen .55s ease both}@keyframes mapOpen{to{transform:rotate(0) scale(1.08);opacity:0}}
    .wb-book{background:linear-gradient(90deg,#34131d 0 49%,#240d14 50%);border:2px solid #d0a33f;border-radius:10px;color:#f3e4c0}
    .wb-book:before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:2px solid #d0a33f55}
    .wb-book .wb-copy h2,.wb-book .wb-copy p{color:#f3e4c0}.wb-opener.open .wb-book{animation:bookOpen .6s ease both}@keyframes bookOpen{to{transform:perspective(800px) rotateY(-36deg) translateX(-22px);opacity:0}}
    .wb-album{background:#fff4df;border:2px solid #8f3e32;border-radius:12px;transform:rotate(-2deg)}
    .wb-album:before{content:"";position:absolute;left:28px;top:0;bottom:0;border-left:8px solid #d59a91}
    .wb-album:after{content:"";position:absolute;right:22px;top:22px;width:100px;height:80px;background:#fff;border:8px solid #fff;box-shadow:0 0 0 1px #d8c3a6;transform:rotate(7deg)}
    .wb-opener.open .wb-album{animation:albumOpen .55s ease both}@keyframes albumOpen{to{transform:rotate(4deg) translateY(-40px);opacity:0}}
    .wb-scroll{background:#f8eedc;border-left:18px solid #caa36a;border-right:18px solid #caa36a;border-radius:30px;min-height:330px}
    .wb-scroll:before,.wb-scroll:after{content:"";position:absolute;left:-30px;right:-30px;height:34px;background:#c28b37;border-radius:99px}
    .wb-scroll:before{top:0}.wb-scroll:after{bottom:0}
    .wb-opener.open .wb-scroll{animation:scrollOpen .6s ease both}@keyframes scrollOpen{to{transform:scaleY(.2);opacity:0}}
    .wb-cover{background:#111516;color:#fbf7ef;border:1px solid #9f6a4d;border-radius:10px}
    .wb-cover .wb-copy h2,.wb-cover .wb-copy p{color:#fbf7ef}.wb-cover:before{content:"";position:absolute;inset:18px;border:1px solid #9f6a4d55;border-radius:6px}
    .wb-opener.open .wb-cover{animation:coverOpen .6s ease both}@keyframes coverOpen{to{transform:translateY(-30px) scale(.96);opacity:0}}
    @media(min-width:820px){.wb-object{width:min(520px,54vw)}.wb-copy{padding:28px}.wb-copy p{font-size:15px}}
  `;
  document.head.appendChild(style);
  const el=document.createElement("div");
  el.className="wb-opener";
  el.style.setProperty("--opener-bg",T.opener.bg||"#17120f");
  el.style.setProperty("--opener-accent",T.opener.accent||"#9b4c3d");
  const variant=T.opener.variant||"cover";
  const cls={map:"wb-map",book:"wb-book",album:"wb-album",scroll:"wb-scroll",cover:"wb-cover"}[variant]||"wb-cover";
  el.innerHTML=`<div class="wb-stage"><div class="wb-object ${cls}"><div class="wb-copy"><div class="k">${T.opener.kicker||"Wedding Invitation"}</div><h2>${T.opener.title||`${W.bride||""} & ${W.groom||""}`}</h2><p>${T.opener.body||"Open the invitation"}</p></div></div><button class="wb-open-btn">${T.opener.button||"Open Invitation"}</button></div>`;
  document.body.appendChild(el);
  const close=()=>{el.classList.add("open");localStorage.setItem((T.theme||"template")+"OpenerSeen","1");setTimeout(()=>el.classList.add("hide"),520);};
  el.querySelector("button").addEventListener("click",close);
})();
