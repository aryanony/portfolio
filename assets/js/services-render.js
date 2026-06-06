/* ─── SERVICES RENDER ─── */
(function(){
  var container = document.getElementById('services-container');
  if(!container) return;

  var services = [
    {
      icon: '#ico-briefcase',
      name: 'Technical Project Management',
      desc: 'End-to-end delivery ownership from requirements through deployment. Agile sprint governance, stakeholder reporting, QA oversight, and milestone-based delivery for web, app, and AI products.',
      tags: ['Agile','Scrum','Jira','QA','Delivery'],
      link: '#contact',
      featured: true
    },
    {
      icon: '#ico-heartbeat',
      name: 'Health-Tech Consulting',
      desc: 'Clinical workflow digitization for doctors, clinics, and health-tech startups. Scope, coordinate, and deliver digital health products that fit how medicine actually works.',
      tags: ['Clinics','Hospitals','EMR','Jaipur'],
      link: '#contact'
    },
    {
      icon: '#ico-robot',
      name: 'AI Automation',
      desc: 'WhatsApp bots, AI lead qualification, customer support agents, and workflow automation using n8n, Make, Botpress, and OpenAI API. One-time setup on your infrastructure.',
      tags: ['WhatsApp','LLM','n8n','Botpress'],
      link: '#contact'
    },
    {
      icon: '#ico-blueprint',
      name: 'Micro-SaaS Software',
      desc: 'Ready-made software systems for Indian SMBs — clinic queues, lab tracking, prescriptions, coaching management, and B2B quotation tools. One-time purchase, deployed on your server.',
      tags: ['One-Time','Self-Hosted','SMB','Clinics'],
      link: '#contact'
    },
    {
      icon: '#ico-wrench',
      name: 'Website Maintenance',
      desc: 'Monthly retainer for clinics, businesses, and startups. Bug fixes, security updates, performance monitoring, content updates, and technical support. Peace of mind from ₹2,000/month.',
      tags: ['Monthly','Security','Support','Updates'],
      link: '#contact'
    },
    {
      icon: '#ico-globe',
      name: 'Dev Team Coordination',
      desc: 'Manage and coordinate distributed developer teams on behalf of founders. Sprint planning, task assignment, standups, blocker resolution, and client communication — handled end-to-end.',
      tags: ['Remote','Distributed','Agile','Async'],
      link: '#contact'
    }
  ];

  var html = services.map(function(s){
    var tags = s.tags.map(function(t){ return '<span class="service-tag">'+t+'</span>'; }).join('');
    return '<div class="service-card reveal'+(s.featured?' service-featured':'')+'">'+
      '<div class="service-icon"><svg width="24" height="24" aria-hidden="true"><use href="'+s.icon+'"/></svg></div>'+
      '<h3 class="service-name">'+s.name+'</h3>'+
      '<p class="service-desc">'+s.desc+'</p>'+
      '<div class="service-tags">'+tags+'</div>'+
      '<a href="'+s.link+'" class="service-link">'+
        'Get Started <svg width="14" height="14"><use href="#ico-arrow-right"/></svg>'+
      '</a>'+
    '</div>';
  }).join('');

  container.innerHTML = html;
  document.dispatchEvent(new Event('ag:content-ready'));
})();
