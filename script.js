// Navigation scroll effect
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = navLinks.querySelectorAll('a');

const observerNav = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => observerNav.observe(section));

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');

const observerReveal = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerReveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => observerReveal.observe(el));

// Stagger card animations
document.querySelectorAll('.cards-grid, .expertise-grid, .awards-grid, .edu-grid, .portfolio-grid').forEach(grid => {
  grid.querySelectorAll('.card, .expertise-category, .award-card, .edu-card, .portfolio-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
});

// WeChat QR modal
const WECHAT_ID = 'wxid_vimmlxl6oy9n22';
const wechatBtn = document.getElementById('wechatBtn');
const wechatModal = document.getElementById('wechatModal');
const wechatModalClose = document.getElementById('wechatModalClose');
const wechatModalBackdrop = document.getElementById('wechatModalBackdrop');
const wechatQr = document.getElementById('wechatQr');
const wechatCopyBtn = document.getElementById('wechatCopyBtn');
let wechatQrInstance = null;

function openWechatModal() {
  wechatModal.hidden = false;
  document.body.style.overflow = 'hidden';

  if (!wechatQrInstance && typeof QRCode !== 'undefined') {
    wechatQr.innerHTML = '';
    wechatQrInstance = new QRCode(wechatQr, {
      text: WECHAT_ID,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}

function closeWechatModal() {
  wechatModal.hidden = true;
  document.body.style.overflow = '';
}

wechatBtn?.addEventListener('click', openWechatModal);
wechatModalClose?.addEventListener('click', closeWechatModal);
wechatModalBackdrop?.addEventListener('click', closeWechatModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !wechatModal.hidden) {
    closeWechatModal();
  }
});

wechatCopyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(WECHAT_ID);
    wechatCopyBtn.textContent = 'Copied!';
    setTimeout(() => {
      wechatCopyBtn.textContent = 'Copy ID';
    }, 2000);
  } catch {
    wechatCopyBtn.textContent = 'Copy failed';
    setTimeout(() => {
      wechatCopyBtn.textContent = 'Copy ID';
    }, 2000);
  }
});
