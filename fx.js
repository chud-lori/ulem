/* ===================================================================
   SHARED OPENING EFFECTS  (lightweight CSS/JS — no media files)
   Include in any template:  <script src="../fx.js"></script>
   Then call from the template, e.g.:
     FX.particles({ chars:["✿","❀","♥"], color:"#e8889c", count:14 });
     FX.stagger("#titleScreen > *");
     FX.type(document.querySelector("#tagline"), "A love story", 45);
   =================================================================== */
(function(){
  "use strict";
  // inject keyframes once
  if(!document.getElementById("fx-css")){
    const s=document.createElement("style"); s.id="fx-css";
    s.textContent=`
      @keyframes fxfloat{
        0%{transform:translateY(108vh) translateX(0) rotate(0);opacity:0}
        12%{opacity:var(--op,.5)} 88%{opacity:var(--op,.5)}
        100%{transform:translateY(-14vh) translateX(var(--sway,0)) rotate(220deg);opacity:0}}
      @keyframes fxrise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      .fx-particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;}
      .fx-particles.inlayer{position:absolute;}
      .fx-rise{animation:fxrise .7s cubic-bezier(.2,.7,.3,1) both;}`;
    document.head.appendChild(s);
  }
  window.FX = {
    /* drifting petals / hearts / dust behind the content */
    particles(o){ o=o||{};
      const chars=o.chars||["✿","❀","♥"], n=o.count||14, layer=o.layer||document.body;
      const wrap=document.createElement("div"); wrap.className="fx-particles"+(o.layer?" inlayer":"");
      wrap.style.zIndex=(o.z!=null?o.z:0);
      for(let i=0;i<n;i++){ const sp=document.createElement("span");
        sp.textContent=chars[i%chars.length];
        const dur=(o.minDur||9)+Math.random()*(o.varDur||10), delay=-Math.random()*dur, op=.25+Math.random()*.45;
        sp.style.cssText=`position:absolute;left:${Math.random()*100}vw;font-size:${(o.min||12)+Math.random()*(o.var||20)}px;`+
          `color:${o.color||"#e8889c"};--sway:${Math.random()*60-30}px;--op:${op};`+
          `animation:fxfloat ${dur}s linear ${delay}s infinite;will-change:transform,opacity;`;
        wrap.appendChild(sp);
      }
      layer.appendChild(wrap); return wrap;
    },
    /* one-shot staggered entrance for matching elements */
    stagger(sel,o){ o=o||{}; const els=[...document.querySelectorAll(sel)];
      els.forEach((el,i)=>{ el.style.animation=`fxrise .7s cubic-bezier(.2,.7,.3,1) both`;
        el.style.animationDelay=((o.base||0)+i*(o.step||110))+"ms"; }); },
    /* typewriter */
    type(el,text,speed){ if(!el)return; speed=speed||45; el.textContent=""; let i=0;
      (function tk(){ if(i<=text.length){ el.textContent=text.slice(0,i++); setTimeout(tk,speed); } })(); },
  };
})();
