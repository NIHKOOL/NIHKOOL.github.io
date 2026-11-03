// Mobile menu
const nav = document.querySelector('.nav');
document.querySelector('.menu-btn')?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Nav border on scroll
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Highlight current page
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
      // Drop the stagger delay so hover effects stay instant
      setTimeout(() => (e.target.style.transitionDelay = ''), 800);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  io.observe(el);
});

// Tabs filter
document.querySelectorAll('.tabs').forEach(tabs => {
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    tabs.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    const filter = btn.dataset.filter;
    document.querySelectorAll('[data-group]').forEach(el => {
      const show = filter === 'all' || el.dataset.group === filter;
      el.classList.toggle('hidden', !show);
      if (show) [el, ...el.querySelectorAll('.reveal')].forEach(r => r.classList.add('in'));
    });
  });
});

document.querySelectorAll('.year').forEach(el => (el.textContent = new Date().getFullYear()));
