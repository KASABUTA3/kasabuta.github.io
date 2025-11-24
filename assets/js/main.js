// main.js — ナビゲーション、スクロールリビール、背景の軽量パーティクル。
// ビルド不要でGitHub Pagesにそのまま配置可能。
document.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------
     Navigation toggle
     ----------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('show');
      navToggle.classList.toggle('active');
    });
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => siteNav.classList.remove('show'));
    });
  }

  /* -----------------------------
     Intersection reveal
     ----------------------------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.16 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* -----------------------------
     Smooth anchor scroll
     ----------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* -----------------------------
     Ambient particles on canvas
     ----------------------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    const nodes = [];

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const rand = (min, max) => Math.random() * (max - min) + min;
    for (let i = 0; i < 48; i++) {
      nodes.push({
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        r: rand(0.8, 2.2),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.1, 0.1),
        glow: rand(0.04, 0.12),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const g = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      g.addColorStop(0, 'rgba(110,242,255,0.06)');
      g.addColorStop(1, 'rgba(182,123,255,0.08)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.lineWidth = 1;
      nodes.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -40) p.x = window.innerWidth + 40;
        if (p.x > window.innerWidth + 40) p.x = -40;
        if (p.y < -40) p.y = window.innerHeight + 40;
        if (p.y > window.innerHeight + 40) p.y = -40;

        ctx.beginPath();
        ctx.fillStyle = `rgba(211,180,111,${p.glow})`;
        ctx.shadowColor = 'rgba(182,123,255,0.35)';
        ctx.shadowBlur = 16;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // light lines to near nodes
        for (let j = idx + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 140) {
            const alpha = (140 - dist) / 260;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(110,242,255,${alpha * 0.5})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    draw();
  }
});
