/* ─── MAGNETIC BUTTONS ─── */
(function(){
  if(window.matchMedia('(hover:none)').matches) return;
  function apply(){
    document.querySelectorAll('.magnetic:not([data-mag-ready])').forEach(function(el){
      el.setAttribute('data-mag-ready','1');
      el.addEventListener('mousemove',function(e){
        var r  = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width/2);
        var dy = e.clientY - (r.top  + r.height/2);
        el.style.transform = 'translate('+(dx*.22)+'px,'+(dy*.22)+'px)';
      });
      el.addEventListener('mouseleave',function(){
        el.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
        el.style.transform  = 'translate(0,0)';
        setTimeout(function(){ el.style.transition=''; },420);
      });
    });
  }
  apply();
  document.addEventListener('ag:content-ready', apply);
  setTimeout(apply, 1600);
})();
