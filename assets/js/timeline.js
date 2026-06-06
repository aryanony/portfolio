/* ─── EXPERIENCE TIMELINE ─── */
(function(){
  var list   = document.getElementById('timeline-list');
  var detail = document.getElementById('timeline-detail');
  if(!list || !detail) return;

  var jobs = [
    {
      date: 'May 2026 — Present',
      role: 'Associate Project Manager',
      company: 'Oblinex Pvt. Ltd.',
      location: 'Patna, India · Full-time',
      active: true,
      points: [
        'Managing end-to-end technical delivery across <strong>70+ international markets</strong> — from client onboarding through VPS provisioning, sprint governance, QA validation, and Play Store / App Store releases.',
        'Coordinating cross-functional developer teams via structured ticketing; resolving blockers, tracking sprint progress, and enforcing milestone-based delivery across concurrent live projects.',
        'Driving post-delivery account expansion — identifying customisation opportunities and negotiating scope additions, contributing directly to upsell revenue and client retention.'
      ]
    },
    {
      date: 'April 2025 — February 2026',
      role: 'Frontend Web3 Developer Intern',
      company: 'MyDigiShell',
      location: 'Kolkata, India · Remote',
      points: [
        'Coordinated multi-project Web3 frontend delivery over <strong>11 months</strong> — aligning backend developers, design stakeholders, and sprint timelines to consistently meet client release commitments.',
        'Integrated blockchain wallet features using React.js, Tailwind CSS, and Web3 libraries; enforced QA and mobile-first standards across every release cycle.',
        'Identified and resolved interface performance bottlenecks pre-release, improving load efficiency and UX across all delivered decentralised applications.'
      ]
    },
    {
      date: 'November 2021 — March 2022',
      role: 'Digital Marketer & E-Commerce Strategist',
      company: 'Elipact Enterprises',
      location: 'Patna, Bihar · Full-time',
      points: [
        'Planned and executed SEO and content marketing roadmaps for Shopify and WordPress e-commerce platforms — managing timelines, content calendars, and channel KPIs end-to-end.',
        'Coordinated landing page builds and branding projects, translating business briefs into measurable outcomes: improved search visibility, conversion rates, and customer engagement.'
      ]
    },
    {
      date: 'August 2021 — November 2021',
      role: 'Web Developer & WordPress Specialist',
      company: 'Ipistis Technologies + Startup Support',
      location: 'Patna / Remote',
      points: [
        'Delivered responsive, SEO-optimised WordPress websites for multiple clients — managing full brief-to-launch cycle: requirements, UI design, speed optimisation, and security hardening independently.',
        'Built custom layouts using Elementor and Yoast SEO, improving usability and performance for e-commerce and service businesses.'
      ]
    }
  ];

  // Build sidebar items
  list.innerHTML = jobs.map(function(j, i){
    return '<div class="timeline-item'+(j.active?' active':'')+'" data-idx="'+i+'" role="tab" tabindex="0" aria-selected="'+(j.active?'true':'false')+'">'+
      '<div class="timeline-date">'+j.date+(j.active?' <span style="color:var(--neon-primary);font-size:.6rem;margin-left:.5rem">● NOW</span>':'')+'</div>'+
      '<div class="timeline-role">'+j.role+'</div>'+
      '<div class="timeline-company">'+j.company+'</div>'+
    '</div>';
  }).join('');

  function showDetail(idx){
    var j = jobs[idx];
    var pts = j.points.map(function(p){
      return '<div class="detail-point">'+
        '<svg width="16" height="16"><use href="#ico-check"/></svg>'+
        '<span>'+p+'</span></div>';
    }).join('');
    detail.innerHTML =
      '<div class="detail-role">'+j.role+'</div>'+
      '<div class="detail-company">'+j.company+'</div>'+
      '<div class="detail-period">'+j.date+' · '+j.location+'</div>'+
      '<div class="detail-points">'+pts+'</div>';
    detail.classList.add('visible');
  }

  // default: show first
  showDetail(0);

  list.querySelectorAll('.timeline-item').forEach(function(item){
    function activate(){
      list.querySelectorAll('.timeline-item').forEach(function(i){ i.classList.remove('active'); });
      item.classList.add('active');
      showDetail(parseInt(item.getAttribute('data-idx')));
    }
    item.addEventListener('click', activate);
    item.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); activate(); } });
  });

  document.dispatchEvent(new Event('ag:content-ready'));
})();
