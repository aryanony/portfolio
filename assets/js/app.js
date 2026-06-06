/* ─── APP INIT: hamburger, nav cursor hover, footer year ─── */
(function(){
  // Hamburger
  var ham  = document.getElementById('nav-hamburger');
  var menu = document.getElementById('mobile-menu');
  if(ham && menu){
    ham.addEventListener('click', function(){
      var open = ham.classList.toggle('open');
      menu.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', open.toString());
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Add cursor hover to dynamically rendered elements
  document.addEventListener('ag:content-ready', function(){
    if(window.matchMedia('(hover:none)').matches) return;
    var ci = document.querySelector('.ci');
    if(!ci) return;
    var sel = '.service-card,.project-card,.tilt-card,.faq-q,a,button';
    document.querySelectorAll(sel+':not([data-ch])').forEach(function(el){
      el.setAttribute('data-ch','1');
      el.addEventListener('mouseenter', function(){ ci.classList.add('hovered'); });
      el.addEventListener('mouseleave', function(){ ci.classList.remove('hovered'); });
    });
  });

  // Footer year
  var fy = document.getElementById('footer-year');
  if(fy) fy.textContent = new Date().getFullYear();

  // Offline banner
  var ob = document.createElement('div');
  ob.id='offline-bar';
  ob.style.cssText='position:fixed;bottom:0;left:0;right:0;background:#1A6EFF;color:#fff;text-align:center;padding:8px;font-size:.8rem;z-index:9000;display:none';
  ob.textContent='You are currently offline. Some features may be unavailable.';
  document.body.appendChild(ob);
  window.addEventListener('offline',  function(){ ob.style.display='block'; });
  window.addEventListener('online',   function(){ ob.style.display='none';  });

  // Service worker
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }
})();
