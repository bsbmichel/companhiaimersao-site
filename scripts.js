// 1️⃣ Rolagem suave para as seções ao clicar nos links do menu
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    destino.scrollIntoView({ behavior: 'smooth' });
  });
});

// 2️⃣ Animação de entrada "fade-in" conforme a seção aparece na tela
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // só anima uma vez
    }
  });
}, { threshold: 0.1 });

// Aplica classe oculta inicialmente e ativa o observer
document.querySelectorAll('section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

// 3️⃣ Menu responsivo (mobile)
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Lógica de envio do formulário de contato (via Google Apps Script com iframe invisível)
const contatoForm = document.getElementById('contato-form');
const iframe = document.getElementById('hidden_iframe');
let submitted = false;

if (contatoForm) {
  contatoForm.addEventListener('submit', function (e) {
    const nome = contatoForm.nome.value.trim();
    const email = contatoForm.email.value.trim();
    const telefone = contatoForm.telefone.value.trim();
    const mensagem = contatoForm.mensagem.value.trim();

    // Expressões regulares para validação
    const nomeValido = /^[A-Za-zÀ-ú\s]+$/;
    const telefoneValido = /^[0-9]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação dos campos
    if (!nomeValido.test(nome)) {
      alert("Digite apenas letras no campo Nome.");
      e.preventDefault();
      return;
    }
    if (!telefoneValido.test(telefone)) {
      alert("Digite apenas números no campo Telefone.");
      e.preventDefault();
      return;
    }
    if (!emailValido.test(email)) {
      alert("Digite um e‑mail válido.");
      e.preventDefault();
      return;
    }

    submitted = true;
  });

  iframe.addEventListener('load', () => {
    if (submitted) {
      document.getElementById('mensagem-sucesso').style.display = 'block';
      contatoForm.reset();
      submitted = false;
    }
  });
}

// 5️⃣ Fade-in para títulos de seções com banners parallax (caso desejado)
// Esse trecho é opcional e pode ser usado se quiser efeitos adicionais em textos de banners
document.querySelectorAll('.parallax h2').forEach(titulo => {
  titulo.style.opacity = '0';
  titulo.style.transform = 'translateY(30px)';
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax h2').forEach(titulo => {
    const rect = titulo.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      titulo.style.opacity = '1';
      titulo.style.transform = 'translateY(0)';
      titulo.style.transition = 'all 0.8s ease';
    }
  });
});
