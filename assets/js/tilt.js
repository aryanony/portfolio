/* ─── 3D TILT EFFECT ─── */
(function(){
  if(window.matchMedia('(hover:none)').matches) return;
  function initTilt(card){
    card.addEventListener('mousemove',function(e){
      var r  = card.getBoundingClientRect();
      var cx = r.left + r.width/2;
      var cy = r.top  + r.height/2;
      var dx = (e.clientX - cx)/(r.width/2);
      var dy = (e.clientY - cy)/(r.height/2);
      var max = 7;
      card.style.transform = 'perspective(900px) rotateX('+(-dy*max)+'deg) rotateY('+(dx*max)+'deg) translateZ(4px)';
      card.style.transition = 'transform .08s linear';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
      card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    });
  }
  function apply(){
    document.querySelectorAll('.tilt-card:not([data-tilt-ready])').forEach(function(el){
      el.setAttribute('data-tilt-ready','1');
      initTilt(el);
    });
  }
  apply();
  document.addEventListener('ag:content-ready', apply);
  setTimeout(apply, 1600);
})();
