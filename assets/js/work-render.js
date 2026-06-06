/* ─── WORK / PROJECTS RENDER ─── */
(function(){
  var container = document.getElementById('work-container');
  if(!container) return;

  var projects = [
    {
      label: 'ProjectPort',
      badge: 'LIVE PRODUCT',
      badgeColor: 'var(--neon-primary)',
      tech: ['React.js','Node.js','MongoDB','Express.js','Tailwind'],
      name: 'ProjectPort',
      desc: 'Full-stack client project automation platform solving a real agency workflow gap — automating onboarding, dynamic quotation, lead management, and real-time project tracking with role-based dashboards.',
      links: [
        { href:'https://projectsport.vercel.app/', label:'View Live' },
        { href:'https://github.com/aryanony/ProjectPort', label:'GitHub' }
      ]
    },
    {
      label: 'UiBrium',
      badge: 'NPM PUBLISHED',
      badgeColor: 'var(--neon-cyan)',
      tech: ['React.js','TypeScript','Tailwind CSS','Radix UI','Turborepo'],
      name: 'UiBrium',
      desc: 'Open-source React UI component library published on NPM. Production-ready components with accessible primitives, scalable theming, and animation systems. Full lifecycle ownership — architecture through open-source governance.',
      links: [
        { href:'https://uibrium.vercel.app/', label:'Live Docs' },
        { href:'https://www.npmjs.com/package/uibrium', label:'NPM' },
        { href:'https://github.com/aryanony/uibrium', label:'GitHub' }
      ]
    },
    {
      label: 'AI Bot',
      badge: 'DEPLOYED',
      badgeColor: 'var(--neon-blue)',
      tech: ['Botpress','OpenAI API','LLM','Prompt Eng.'],
      name: 'Aryanony AI Assistant',
      desc: 'Custom LLM-integrated conversational AI assistant for real-time information retrieval and task automation. Complete lifecycle ownership from prompt architecture through live production deployment.',
      links: [
        { href:'https://aryanony.github.io/portfolio', label:'View Demo' }
      ]
    }
  ];

  var html = projects.map(function(p){
    var tech  = p.tech.map(function(t){ return '<span class="tech-pill">'+t+'</span>'; }).join('');
    var links = p.links.map(function(l){
      return '<a href="'+l.href+'" target="_blank" rel="noopener" class="proj-link">'+
        '<svg width="13" height="13"><use href="#ico-arrow-right"/></svg>'+l.label+'</a>';
    }).join('');
    return '<div class="project-card reveal">'+
      '<div class="project-thumb">'+
        '<div class="project-thumb-grid"></div>'+
        '<div class="project-thumb-label">'+
          '<div class="project-thumb-name">'+p.label+'</div>'+
          '<div class="project-thumb-badge" style="color:'+p.badgeColor+'">'+p.badge+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="project-body">'+
        '<div class="project-tech-row">'+tech+'</div>'+
        '<h3 class="project-name">'+p.name+'</h3>'+
        '<p class="project-desc">'+p.desc+'</p>'+
        '<div class="project-links">'+links+'</div>'+
      '</div>'+
    '</div>';
  }).join('');

  container.innerHTML = html;
  document.dispatchEvent(new Event('ag:content-ready'));
})();
