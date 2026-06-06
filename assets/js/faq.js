/* ─── FAQ ACCORDION ─── */
(function(){
  var container = document.getElementById('faq-container');
  if(!container) return;

  var faqs = [
    {
      q: 'What does a Technical Project Manager actually do?',
      a: 'A Technical Project Manager bridges engineering teams and business stakeholders — owning the full delivery lifecycle from requirement gathering through deployment. Unlike traditional PMs, a TPM has hands-on technical literacy: reading code, reviewing architecture decisions, identifying technical debt, and communicating development complexity in clear business language.'
    },
    {
      q: 'Can you help doctors and clinics in Jaipur or Ahmedabad?',
      a: 'Yes — health-tech is my primary focus. I work with doctors, clinic owners, and hospital administrators to digitize practice management, including patient queue systems, digital prescription tools, appointment automation, WhatsApp follow-up systems, and diagnostic lab management. All software is one-time purchase, deployed on your own infrastructure, with no ongoing monthly fees for me.'
    },
    {
      q: 'How much do your services cost?',
      a: 'Technical PM services: ₹25,000–₹50,000 per project. Development team management: ₹40,000–₹80,000/month. Micro-SaaS products: ₹5,999–₹35,000 (one-time). AI automation setups: ₹3,999–₹15,000. Website maintenance retainers: ₹2,000–₹8,000/month. Book a free 30-minute call to get an exact quote for your specific requirement.'
    },
    {
      q: 'Are you available for remote or international projects?',
      a: 'Yes. I currently manage projects remotely across 70+ countries at Oblinex Pvt. Ltd. My workflow is built for distributed teams — async-first documentation, structured ticketing, milestone-based reporting, and timezone-transparent communication. International clients are welcome; pricing in USD available ($500–$1,500/month depending on scope).'
    },
    {
      q: 'What happens in the free 30-minute call?',
      a: 'No sales pitch. In 30 minutes we cover: what you are trying to build or fix, your current team and technology setup, a realistic timeline and budget range, and what success looks like. You leave with a clear action plan — whether you hire me or not. Book via the button on this page or email aryanrajk63@gmail.com.'
    },
    {
      q: 'Do you offer ongoing maintenance after delivery?',
      a: 'Yes. After every project delivery you can opt into a monthly maintenance contract: Basic (₹2,000/month — bug fixes, 5 hours support), Standard (₹4,000/month — 10 hours + minor updates), or Premium (₹8,000/month — 24/7 support + unlimited minor changes + monthly updates). AI automation maintenance is ₹3,000/month for model updates and API monitoring.'
    },
    {
      q: 'What tech stack do you use for micro-SaaS products?',
      a: 'React.js + Node.js + Express.js + MySQL/MongoDB for most web products. Flutter/Dart for mobile apps. Firebase for auth and real-time features. All products are self-hosted on your own Hostinger/cPanel/VPS server — you own the code, data, and infrastructure. No lock-in, no recurring SaaS fees to me.'
    }
  ];

  container.innerHTML = faqs.map(function(f, i){
    return '<div class="faq-item">'+
      '<button class="faq-q" aria-expanded="false">'+
        f.q+
        '<svg class="faq-icon" width="22" height="22"><use href="#ico-blueprint"/></svg>'+
      '</button>'+
      '<div class="faq-a"><div class="faq-a-inner">'+f.a+'</div></div>'+
    '</div>';
  }).join('');

  // Accordion logic
  container.querySelectorAll('.faq-item').forEach(function(item){
    item.querySelector('.faq-q').addEventListener('click', function(){
      var open = item.classList.contains('open');
      container.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!open){
        item.classList.add('open');
        this.setAttribute('aria-expanded','true');
      }
    });
  });

  document.dispatchEvent(new Event('ag:content-ready'));
})();
