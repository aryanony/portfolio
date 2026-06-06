/* ─── SKILLS RENDER ─── */
(function(){
  var grid = document.getElementById('skills-grid');
  if(!grid) return;

  var groups = [
    { label:'PM & Agile',   skills:['Technical PM','Agile','Scrum','Kanban','Jira','Notion','Trello','Miro','Sprint Planning','Backlog Grooming','QA Governance','Risk Management'] },
    { label:'Frontend Dev', skills:['React.js','TypeScript','HTML5','CSS3','JavaScript ES6+','Tailwind CSS','Bootstrap','SASS/SCSS','Responsive Design','Web3 / dApp Frontend'] },
    { label:'Backend & DB', skills:['Node.js','Express.js','MongoDB','MySQL','Firebase','REST APIs','PHP (basics)','Laravel (basics)','JWT Auth'] },
    { label:'AI & Automation', skills:['Prompt Engineering','OpenAI API','Anthropic Claude API','Botpress','LLM Integration','n8n','Make / Zapier','WhatsApp Automation'] },
    { label:'DevOps & Tools', skills:['Git','GitHub','Vercel','Linux Debian','CI/CD Basics','Docker (concepts)','IPFS','cPanel','VPS Setup'] },
    { label:'Design & Marketing', skills:['Figma','UI/UX Design','Wireframing','Brand Strategy','SEO','SMO','Google Analytics 4','Google Search Console','WordPress','Shopify','Canva'] }
  ];

  grid.innerHTML = groups.map(function(g){
    var tags = g.skills.map(function(s){ return '<span class="skill-tag">'+s+'</span>'; }).join('');
    return '<div class="skill-group reveal">'+
      '<div class="skill-group-label">'+g.label+'</div>'+
      '<div class="skill-tags">'+tags+'</div>'+
    '</div>';
  }).join('');

  document.dispatchEvent(new Event('ag:content-ready'));
})();
