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

// Envio do formulário para Google Sheets via Apps Script + Validações + Feedback
const contatoForm = document.getElementById('contato-form');
contatoForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Coleta os dados
  const nome = contatoForm.nome.value.trim();
  const email = contatoForm.email.value.trim();
  const telefone = contatoForm.telefone.value.trim();
  const mensagem = contatoForm.mensagem.value.trim();

  // Validações com expressões regulares
  const nomeValido = /^[A-Za-zÀ-ú\s]+$/;
  const telefoneValido = /^[0-9]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nomeValido.test(nome)) {
    alert("Digite apenas letras no campo Nome.");
    return;
  }

  if (!telefoneValido.test(telefone)) {
    alert("Digite apenas números no campo Telefone.");
    return;
  }

  if (!emailValido.test(email)) {
    alert("Digite um e-mail válido.");
    return;
  }

  const data = {
    nome: nome,
    email: email,
    telefone: telefone,
    mensagem: mensagem
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw0lf9w9d5s7tQOQJ-MJE7KqQPwdSJw4sKPM/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
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
