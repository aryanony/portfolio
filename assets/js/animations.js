/* ─── SCROLL REVEAL via IntersectionObserver ─── */
(function(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    });
  },{threshold:.1, rootMargin:'0px 0px -40px 0px'});
  function observe(){
    document.querySelectorAll('.reveal,.reveal-scale').forEach(function(el){ io.observe(el); });
  }
  // run initially and again after dynamic content loads
  observe();
  document.addEventListener('ag:content-ready', observe);
  // fallback: re-run after 1.5s for JS-rendered sections
  setTimeout(observe, 1500);
})();
