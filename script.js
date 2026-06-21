const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    const end = Number(target.dataset.count);
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1);
      target.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(target);
  });
}, { threshold: .6 });
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

document.querySelectorAll('.program').forEach((card) => card.style.setProperty('--hover', card.dataset.color));

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const closeMobileMenu = () => {
  menuButton.classList.remove('is-open');
  mobileMenu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
};
menuButton.addEventListener('click', () => {
  const open = menuButton.classList.toggle('is-open');
  mobileMenu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMobileMenu();
}));

const modal = document.querySelector('.video-modal');
document.querySelector('[data-open-video]').addEventListener('click', () => { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); });
modal.querySelector('button').addEventListener('click', () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); });

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-status').textContent = 'Mensagem preparada! Em breve conectaremos este formulário ao e-mail do Instituto.';
});

if (matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(event.clientX-r.left-r.width/2)*.12}px, ${(event.clientY-r.top-r.height/2)*.12}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}
