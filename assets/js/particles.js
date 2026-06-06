/* ─── CANVAS PARTICLES (hero bg) ─── */
(function(){
  var canvas = document.getElementById('hero-particles');
  if(!canvas){ return; }
  var ctx = canvas.getContext('2d');
  var W, H, pts = [], raf = null;

  function resize(){
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  function mkPt(){
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.4 + 0.4,
      a:  Math.random() * 0.35 + 0.08
    };
  }
  function init(){
    var n = Math.min(55, Math.floor(W * H / 16000));
    pts = [];
    for(var i = 0; i < n; i++){ pts.push(mkPt()); }
  }
  function isDark(){
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }
  function rgba(r, g, b, a){
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  function frame(){
    ctx.clearRect(0, 0, W, H);
    var dark = isDark();
    var pr = dark ? 0 : 0;
    var pg = dark ? 200 : 107;
    var pb = dark ? 150 : 82;
    var i, j, p, dx, dy, d, s;

    for(i = 0; i < pts.length; i++){
      p = pts[i];
      p.x += p.vx;  p.y += p.vy;
      if(p.x < 0 || p.x > W){ p.vx *= -1; }
      if(p.y < 0 || p.y > H){ p.vy *= -1; }
      s = p.r * 2.2;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - s);
      ctx.lineTo(p.x + s, p.y);
      ctx.lineTo(p.x, p.y + s);
      ctx.lineTo(p.x - s, p.y);
      ctx.closePath();
      ctx.fillStyle = rgba(pr, pg, pb, p.a);
      ctx.fill();
    }
    for(i = 0; i < pts.length; i++){
      for(j = i + 1; j < pts.length; j++){
        dx = pts[i].x - pts[j].x;
        dy = pts[i].y - pts[j].y;
        d  = Math.sqrt(dx * dx + dy * dy);
        if(d < 115){
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = rgba(pr, pg, pb, (1 - d / 115) * 0.1);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  var hero = document.getElementById('hero');
  if(hero){
    canvas.style.cssText = [
      'position:absolute', 'inset:0', 'width:100%',
      'height:100%', 'pointer-events:none'
    ].join(';') + ';';
    new ResizeObserver(function(){ resize(); init(); }).observe(hero);
  }
  resize();
  init();
  frame();

  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){
      if(!raf){ raf = requestAnimationFrame(frame); }
    } else {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }).observe(canvas);
})();
