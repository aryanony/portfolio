/* ─── TYPEWRITER ─── */
(function(){
  var el = document.getElementById('typewriter');
  if(!el) return;
  var phrases = [
    'Health-Tech & SaaS Teams',
    'Doctors & Clinics in Jaipur',
    'AI Product Startups',
    'International SaaS Companies',
    'HealthTech Founders'
  ];
  var pi=0, ci=0, deleting=false;
  function tick(){
    var phrase = phrases[pi];
    if(!deleting){
      el.textContent = phrase.slice(0,++ci);
      if(ci===phrase.length){ deleting=true; setTimeout(tick,2200); return; }
      setTimeout(tick, 62);
    } else {
      el.textContent = phrase.slice(0,--ci);
      if(ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(tick,320); return; }
      setTimeout(tick, 40);
    }
  }
  setTimeout(tick, 1200);
})();
