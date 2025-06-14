
// JavaScript com rolagem suave, animações e menu responsivo

// Rolagem suave nos links do menu
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animação de fade-in ao rolar a página
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

// Menu Mobile com botão hambúrguer
const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});