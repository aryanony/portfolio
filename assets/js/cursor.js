/* ─── CUSTOM CURSOR ─── */
(function(){
  if(window.matchMedia('(hover:none)').matches) return;
  var cx = document.querySelector('.cx');
  var ci = document.querySelector('.ci');
  if(!cx || !ci) return;
  var mx=0,my=0,rx=0,ry=0,raf;
  document.addEventListener('mousemove',function(e){ mx=e.clientX; my=e.clientY; });
  function lerp(a,b,t){ return a+(b-a)*t; }
  function tick(){
    cx.style.transform = 'translate('+(mx-4)+'px,'+(my-4)+'px)';
    rx = lerp(rx,mx,0.13); ry = lerp(ry,my,0.13);
    ci.style.transform = 'translate('+(rx-18)+'px,'+(ry-18)+'px)';
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  var hoverEls = 'a,button,.tilt-card,.service-card,.project-card,.faq-q,[data-cursor]';
  document.querySelectorAll(hoverEls).forEach(function(el){
    el.addEventListener('mouseenter',function(){ ci.classList.add('hovered'); });
    el.addEventListener('mouseleave',function(){ ci.classList.remove('hovered'); });
  });
  document.addEventListener('mouseleave',function(){ cx.style.opacity='0'; ci.style.opacity='0'; });
  document.addEventListener('mouseenter',function(){ cx.style.opacity='1'; ci.style.opacity=''; });
})();
