/* ─── ANIMATED COUNTERS ─── */
(function(){
  function animateCounter(el, target, dur){
    var num = parseFloat(target.replace(/[^0-9.]/g,''));
    var suf = target.replace(/[0-9.]/g,'');
    var start = null;
    function step(ts){
      if(!start) start=ts;
      var p = Math.min((ts-start)/dur,1);
      var ease = 1-Math.pow(1-p,3);
      el.textContent = Math.round(num*ease) + suf;
      if(p<1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el  = e.target;
      var val = el.getAttribute('data-counter');
      if(val) animateCounter(el, val, 1600);
      io.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-counter]').forEach(function(el){ io.observe(el); });
})();
