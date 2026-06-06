/* ─── CONTACT FORM ─── */
(function(){
  var form = document.getElementById('contact-form');
  var btn  = document.getElementById('form-submit');
  if(!form || !btn) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function(f){
      if(!f.value.trim()){ f.classList.add('error'); valid=false; }
      else { f.classList.remove('error'); }
    });
    var emailEl = form.querySelector('[type="email"]');
    if(emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)){
      emailEl.classList.add('error'); valid=false;
    }
    if(!valid) return;

    var orig = btn.innerHTML;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Build mailto as fallback (no backend needed)
    var name    = form.querySelector('[name="name"]').value;
    var email   = form.querySelector('[name="email"]').value;
    var service = form.querySelector('[name="service"]').value;
    var message = form.querySelector('[name="message"]').value;
    var subject = encodeURIComponent('Portfolio Enquiry from '+name);
    var body    = encodeURIComponent(
      'Name: '+name+'\nEmail: '+email+'\nService: '+service+'\n\nMessage:\n'+message
    );
    window.location.href = 'mailto:aryanrajk63@gmail.com?subject='+subject+'&body='+body;

    setTimeout(function(){
      btn.innerHTML = '<svg width="16" height="16"><use href="#ico-check"/></svg> Message Prepared';
      btn.style.background = 'var(--neon-primary)';
      form.reset();
      setTimeout(function(){ btn.innerHTML=orig; btn.disabled=false; btn.style.background=''; }, 3500);
    }, 800);
  });

  // Real-time validation
  form.querySelectorAll('input,textarea').forEach(function(f){
    f.addEventListener('input', function(){ this.classList.remove('error'); });
  });
})();
