/* ===================================================================
   SHARED MUSIC WIDGET  (YouTube background music + guest playlist)
   Reads window.MUSIC from data.js. Include in any template with:
       <script src="../music.js" defer></script>
   - Plays a hidden YouTube player (audio only) on the first user tap.
   - Injects a floating ♪ button (top-left) + a slide-down playlist panel
     guests can open, see, and pick tracks from.
   - Does nothing if window.MUSIC has no youtube track and no playlist.
   =================================================================== */
(function(){
  "use strict";
  const M = window.MUSIC || {};
  const ytId = u => { if(!u) return ""; const s=String(u).trim();
    const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(s) ? s : ""); };

  // Build the track list: background track first, then playlist (deduped).
  const tracks = [];
  if(M.youtube) tracks.push({ id:ytId(M.youtube), title:M.title||"Our song", by:M.by||"" });
  (M.playlist||[]).forEach(t=>{ const id=ytId(t.youtube); if(id && !tracks.some(x=>x.id===id))
    tracks.push({ id, title:t.title||"Untitled", by:t.by||"" }); });
  const valid = tracks.filter(t=>t.id);
  if(!valid.length) return;                       // no music configured → no widget

  const hasList = valid.length>1 || (M.playlist&&M.playlist.length);

  /* ---- styles (self-contained, themeable via the page's --rose if set) ---- */
  const css = `
  #ytm-btn{position:fixed;top:12px;left:12px;z-index:60;width:46px;height:46px;border-radius:50%;
    border:2px solid #c75d75;background:#fffaf2;color:#c75d75;font-size:18px;cursor:pointer;
    box-shadow:0 3px 8px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;}
  #ytm-btn.playing{animation:ytmspin 4s linear infinite;}
  @keyframes ytmspin{to{transform:rotate(360deg)}}
  #ytm-panel{position:fixed;top:64px;left:12px;z-index:60;width:min(82vw,300px);background:#fffaf2;
    border:2px solid #c75d75;border-radius:14px;box-shadow:0 10px 26px rgba(0,0,0,.28);padding:12px;
    font-family:inherit;display:none;max-height:70vh;overflow:auto;}
  #ytm-panel.open{display:block;}
  #ytm-panel h4{font-size:13px;color:#c75d75;margin:0 0 4px;}
  #ytm-now{font-size:11px;color:#5a4334;opacity:.8;margin-bottom:10px;line-height:1.5;}
  .ytm-ctl{display:flex;gap:8px;justify-content:center;margin-bottom:10px;}
  .ytm-ctl button{width:40px;height:36px;border-radius:8px;border:2px solid #e6c9bf;background:#fff;
    color:#c75d75;font-size:15px;cursor:pointer;}
  .ytm-ctl .pp{background:#e8889c;color:#fff;border-color:#c75d75;}
  .ytm-track{display:flex;gap:8px;align-items:center;padding:8px 9px;border-radius:9px;cursor:pointer;
    font-size:12px;line-height:1.4;}
  .ytm-track:hover{background:#fbe3ea;}
  .ytm-track.on{background:#fbe3ea;}
  .ytm-track .n{flex:1;color:#5a4334;} .ytm-track .n b{color:#c75d75;display:block;font-size:12px;}
  .ytm-track .n span{font-size:10px;opacity:.7;}
  .ytm-track .ic{font-size:13px;color:#c75d75;}
  #ytm-host{position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;}`;
  const style=document.createElement("style"); style.textContent=css; document.head.appendChild(style);

  /* ---- DOM ---- */
  const host=document.createElement("div"); host.id="ytm-host"; host.innerHTML='<div id="ytm-yt"></div>';
  document.body.appendChild(host);
  const btn=document.createElement("button"); btn.id="ytm-btn"; btn.title="Music"; btn.textContent="♪";
  document.body.appendChild(btn);
  const panel=document.createElement("div"); panel.id="ytm-panel";
  panel.innerHTML =
    `<h4>♫ Our Music</h4><div id="ytm-now">Tap a song to play</div>
     <div class="ytm-ctl"><button id="ytm-prev">⏮</button><button class="pp" id="ytm-pp">▶</button><button id="ytm-next">⏭</button></div>`+
    (hasList ? `<div id="ytm-list">`+valid.map((t,i)=>
        `<div class="ytm-track" data-i="${i}"><span class="ic">♪</span><span class="n"><b>${esc(t.title)}</b>${t.by?`<span>${esc(t.by)}</span>`:""}</span></div>`).join("")+`</div>` : ``);
  document.body.appendChild(panel);
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

  /* ---- YouTube IFrame API ---- */
  let player=null, ready=false, cur=0, playing=false, started=false;
  const prev=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=function(){ if(typeof prev==="function") try{prev();}catch(e){}
    player=new YT.Player("ytm-yt",{ height:"1",width:"1", videoId:valid[0].id,
      playerVars:{ autoplay:0, controls:0, playsinline:1 },
      events:{ onReady:()=>{ready=true;}, onStateChange:e=>{
        if(e.data===YT.PlayerState.PLAYING){ playing=true; }
        else if(e.data===YT.PlayerState.PAUSED){ playing=false; }
        else if(e.data===YT.PlayerState.ENDED){
          if(valid.length>1) loadTrack((cur+1)%valid.length, true);
          else if(M.loop!==false){ player.seekTo(0); player.playVideo(); }
        }
        sync(); }}}); };
  (function(){ if(window.YT&&window.YT.Player){ window.onYouTubeIframeAPIReady(); return; }
    if(![...document.scripts].some(s=>/iframe_api/.test(s.src))){
      const t=document.createElement("script"); t.src="https://www.youtube.com/iframe_api"; document.head.appendChild(t); } })();

  function loadTrack(i,autoplay){ cur=(i+valid.length)%valid.length;
    if(ready){ player.loadVideoById(valid[cur].id); if(!autoplay) player.pauseVideo(); }
    started=true; sync(); }
  function play(){ if(!ready) return; if(!started){ started=true; player.playVideo(); }
    else player.playVideo(); }
  function pause(){ if(ready) player.pauseVideo(); }
  function sync(){ btn.classList.toggle("playing",playing); document.getElementById("ytm-pp").textContent=playing?"⏸":"▶";
    const now=document.getElementById("ytm-now"); const t=valid[cur];
    now.innerHTML = `${playing?"Now playing":"Paused"}: <b style="color:#c75d75">${esc(t.title)}</b>${t.by?" · "+esc(t.by):""}`;
    panel.querySelectorAll(".ytm-track").forEach(el=>el.classList.toggle("on",+el.dataset.i===cur)); }

  /* ---- controls ---- */
  btn.onclick=()=>{ if(hasList){ panel.classList.toggle("open"); }
    if(!started) play(); else if(playing) pause(); else play(); };
  document.getElementById("ytm-pp").onclick=e=>{ e.stopPropagation(); playing?pause():play(); };
  document.getElementById("ytm-prev").onclick=e=>{ e.stopPropagation(); loadTrack(cur-1,true); };
  document.getElementById("ytm-next").onclick=e=>{ e.stopPropagation(); loadTrack(cur+1,true); };
  panel.querySelectorAll(".ytm-track").forEach(el=> el.onclick=()=> loadTrack(+el.dataset.i,true));

  // start on the first user gesture anywhere (so the bg track begins with sound)
  function firstGesture(){ if(!started && ready){ play(); }
    removeEventListener("pointerdown",firstGesture); removeEventListener("keydown",firstGesture); }
  addEventListener("pointerdown",firstGesture); addEventListener("keydown",firstGesture);
})();
