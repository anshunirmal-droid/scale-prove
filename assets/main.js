// Sticky header solid on scroll
const header = document.getElementById('siteHeader');
function updateHeaderSolid(){
  if(header) header.classList.toggle('solid', window.scrollY > 30);
}
window.addEventListener('scroll', updateHeaderSolid);
updateHeaderSolid();

// Mobile nav open/close
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
if(burger){
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Dropdown nav items (desktop: hover + click toggle; mobile: click/accordion)
document.querySelectorAll('.nav-item').forEach(item => {
  const btn = item.querySelector('button.nav-top');
  if(!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.nav-item.open').forEach(i => { if(i !== item) i.classList.remove('open'); });
    item.classList.toggle('open', !wasOpen);
  });
});
document.addEventListener('click', (e) => {
  if(!e.target.closest('.nav-item')){
    document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
  }
});
// Close mobile menu when a plain link is clicked
document.querySelectorAll('nav.links a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
}));

// Tabs (scoped per tabbar so multiple tab groups on one page work independently)
document.querySelectorAll('.tabbar').forEach(bar => {
  const buttons = bar.querySelectorAll('.tabbtn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.tab;
      const panels = bar.parentElement.querySelectorAll('.tabpanel');
      panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + key));
    });
  });
});

// Login modal
const modal = document.getElementById('loginModal');
if(modal){
  const modalClose = document.getElementById('modalClose');
  const loginView = document.getElementById('loginView');
  const dashView = document.getElementById('dashView');
  const loginForm = document.getElementById('loginForm');

  function openModal(){
    modal.classList.add('open');
    loginView.style.display = 'block';
    dashView.style.display = 'none';
  }
  function closeModal(){
    modal.classList.remove('open');
  }
  document.querySelectorAll('[data-login-trigger]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginView.style.display = 'none';
    dashView.style.display = 'block';
  });
}
