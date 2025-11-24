// main.js — ナビ・スクロールアニメーション・背景パーティクル（軽量）
document.addEventListener('DOMContentLoaded',function(){
  // ナビトグル
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle && navToggle.addEventListener('click',()=>{
    siteNav.classList.toggle('show');
  });

  // IntersectionObserver for reveal
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el=document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Background canvas: gentle flowing particles
  const canvas = document.getElementById('bg-canvas');
  if(canvas){
    const ctx=canvas.getContext('2d');
    let w,h,dpr;
    const particles=[];
    function resize(){
      dpr = Math.max(1, window.devicePixelRatio || 1);
      w = canvas.width = Math.floor(innerWidth * dpr);
      h = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.scale(dpr,dpr);
    }
    window.addEventListener('resize',resize);
    resize();

    function rand(min,max){return Math.random()*(max-min)+min}
    for(let i=0;i<28;i++){
      particles.push({x:rand(0,innerWidth),y:rand(0,innerHeight),r:rand(0.6,2.4),vx:rand(-0.12,0.12),vy:rand(-0.06,0.06),hue:rand(200,300)});
    }

    function draw(){
      ctx.clearRect(0,0,innerWidth,innerHeight);
      // slight gradient overlay
      const g = ctx.createLinearGradient(0,0,innerWidth,innerHeight);
      g.addColorStop(0,'rgba(6,8,20,0.12)');
      g.addColorStop(1,'rgba(2,4,10,0.18)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,innerWidth,innerHeight);

      particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < -50) p.x = innerWidth+50;
        if(p.x > innerWidth+50) p.x = -50;
        if(p.y < -50) p.y = innerHeight+50;
        if(p.y > innerHeight+50) p.y = -50;

        ctx.beginPath();
        ctx.fillStyle = `rgba(180,140,90,${0.08 + p.r*0.02})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
});
