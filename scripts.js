
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


// Envio do formulário para Google Sheets via Apps Script
const contatoForm = document.getElementById('contato-form');
contatoForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(contatoForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzTVqej6HfzmPQlke-948sN8_uvjW55H09baZtYNhkdynenOfCtvXQw1JK2fGI-nKvD/exec', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      document.getElementById('mensagem-sucesso').style.display = 'block';
      contatoForm.reset();
    } else {
      alert('Erro ao enviar. Tente novamente.');
    }
  } catch (err) {
    alert('Falha na conexão.');
  }
});
