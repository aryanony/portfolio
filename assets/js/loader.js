/* ─── PAGE LOADER ─── */
(function(){
  var ldr = document.getElementById('ldr');
  if(!ldr) return;
  function hide(){
    document.body.classList.remove('loading');
    ldr.classList.add('hidden');
    setTimeout(function(){ ldr.remove(); }, 700);
  }
  if(document.readyState === 'complete'){ setTimeout(hide, 900); }
  else { window.addEventListener('load', function(){ setTimeout(hide, 900); }); }
})();
