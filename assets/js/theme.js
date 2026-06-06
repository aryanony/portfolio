/* ─── THEME TOGGLE ─── */
(function(){
  var root = document.documentElement;
  var BTN  = document.getElementById('theme-toggle');
  function setTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('portfolio-theme', t);
  }
  if(BTN){
    BTN.addEventListener('click', function(){
      setTheme(root.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
    });
  }
})();
