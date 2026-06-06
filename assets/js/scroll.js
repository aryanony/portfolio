/* ─── SCROLL: progress bar + nav state + smooth scroll ─── */
(function(){
  var bar  = document.getElementById('scroll-progress');
  var nav  = document.getElementById('nav-header');
  var html = document.documentElement;

  function onScroll(){
    var scrolled = html.scrollTop || document.body.scrollTop;
    var total    = html.scrollHeight - html.clientHeight;
    if(bar)  bar.style.width = (total > 0 ? (scrolled/total)*100 : 0) + '%';
    if(nav)  nav.classList.toggle('scrolled', scrolled > 48);
    // active nav link
    var links = document.querySelectorAll('.nav-links a[href^="#"]');
    links.forEach(function(a){
      var id  = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if(!sec) return;
      var rect = sec.getBoundingClientRect();
      a.classList.toggle('active', rect.top <= 100 && rect.bottom > 0);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth anchor scroll
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if(!a) return;
    var id = a.getAttribute('href').slice(1);
    if(!id) return;
    var target = document.getElementById(id);
    if(!target) return;
    e.preventDefault();
    var navH = 76;
    var top  = target.getBoundingClientRect().top + window.pageYOffset - navH;
    window.scrollTo({top: top, behavior:'smooth'});
    // close mobile menu if open
    var mm = document.getElementById('mobile-menu');
    var hm = document.getElementById('nav-hamburger');
    if(mm && mm.classList.contains('open')){
      mm.classList.remove('open');
      if(hm){ hm.classList.remove('open'); hm.setAttribute('aria-expanded','false'); }
      document.body.style.overflow = '';
    }
  });
})();
