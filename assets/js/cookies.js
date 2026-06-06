/* ─── COOKIE CONSENT ─── */
(function(){
  var banner = document.getElementById('cookie-banner');
  if(!banner) return;
  if(localStorage.getItem('ag-cookies')){ banner.remove(); return; }
  setTimeout(function(){ banner.style.display='block'; }, 2500);
  document.getElementById('cookie-accept').addEventListener('click', function(){
    localStorage.setItem('ag-cookies','1');
    banner.remove();
  });
  document.getElementById('cookie-decline').addEventListener('click', function(){
    localStorage.setItem('ag-cookies','0');
    banner.remove();
  });
})();
