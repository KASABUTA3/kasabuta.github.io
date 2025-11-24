(function () {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');

  const closeNav = () => nav.classList.add('closed');
  const openNav = () => nav.classList.remove('closed');

  toggle?.addEventListener('click', () => {
    if (nav.classList.contains('closed')) {
      openNav();
    } else {
      closeNav();
    }
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
