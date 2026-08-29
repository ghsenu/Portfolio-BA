// year
document.getElementById('yr').textContent = new Date().getFullYear();

// nav scroll state
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

// mobile menu
const burger = document.getElementById('burger'), links = document.getElementById('navlinks');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .18 });
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

// skill bars
const skillIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.querySelectorAll('.bar span').forEach(s => s.style.width = s.dataset.w + '%');
      skillIO.unobserve(e.target);
    }
  });
}, { threshold: .3 });
const skillsSec = document.getElementById('skills');
if (skillsSec) skillIO.observe(skillsSec);

// count-up stats
function countUp(el){
  const to = +el.dataset.to, dur = 1200, start = performance.now();
  const sink = el.querySelector('span:first-child') || el;
  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    sink.textContent = (p < 1) ? Math.round(p * to) : to;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.querySelectorAll('[data-to]').forEach(countUp);
      statIO.unobserve(e.target);
    }
  });
}, { threshold: .4 });
const statsSec = document.getElementById('stats');
if (statsSec) statIO.observe(statsSec);

// active nav link
const sections = [...document.querySelectorAll('section[id],header[id]')];
const navMap = {};
document.querySelectorAll('.navlinks a').forEach(a => { const id = a.getAttribute('href').slice(1); navMap[id] = a; });
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      document.querySelectorAll('.navlinks a').forEach(a => a.classList.remove('active'));
      const link = navMap[e.target.id];
      if (link && !link.classList.contains('nav-cta')) link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// contact form -> mailto
document.getElementById('cform').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const n = document.getElementById('nm').value, em = document.getElementById('em').value, m = document.getElementById('ms').value;
  const body = encodeURIComponent(m + "\n\n— " + n + " (" + em + ")");
  window.location.href = "mailto:gihansa.work@gmail.com?subject=" + encodeURIComponent("Portfolio enquiry from " + n) + "&body=" + body;
});

// ----- added polish -----
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// scroll progress bar
const bar = document.getElementById('progress');
const setProgress = () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
  bar.style.width = (scrolled * 100) + '%';
};
addEventListener('scroll', setProgress, { passive: true });
addEventListener('resize', setProgress);
setProgress();

// back to top
const toTop = document.getElementById('toTop');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 600), { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

// 3D tilt on cards (skipped when reduced motion or on touch)
const canTilt = !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canTilt) {
  const MAX = 6; // degrees
  document.querySelectorAll('.card, .pcard').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('tilting'));
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `perspective(820px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('tilting');
      card.style.transform = '';
    });
  });
}

// hero cursor-follow glow
const heroEl = document.getElementById('top');
const cursorGlow = document.getElementById('cursorGlow');
if (heroEl && cursorGlow && canTilt) {
  heroEl.addEventListener('mousemove', (e) => {
    const r = heroEl.getBoundingClientRect();
    cursorGlow.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px) translate(-50%,-50%)`;
  });
}
