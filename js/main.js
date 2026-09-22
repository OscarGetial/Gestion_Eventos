const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.style.display = open ? '' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '68px';
    links.style.right = '16px';
    links.style.background = '#fff';
    links.style.padding = '16px';
    links.style.border = '1px solid #e7e9f0';
    links.style.borderRadius = '14px';
  });
}
