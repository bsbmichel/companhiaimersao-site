// 1️⃣ Rolagem suave para os links do menu (scroll smooth)
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// 2️⃣ Animação fade-in nas seções ao rolar
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

// 3️⃣ Menu mobile com ícone hambúrguer para abrir/fechar
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Validação e envio do formulário com feedback
const contatoForm = document.getElementById('contato-form');
contatoForm.addEventListener('submit', function(e) {
  // Validação antes do envio
  const nome = contatoForm.nome.value.trim();
  const email = contatoForm.email.value.trim();
  const telefone = contatoForm.telefone.value.trim();
  const mensagem = contatoForm.mensagem.value.trim();

  const nomeValido = /^[A-Za-zÀ-ú\s]+$/;
  const telefoneValido = /^[0-9]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    alert("Digite um e-mail válido.");
    e.preventDefault();
    return;
  }

  // Se a validação passou, o formulário será submetido pelo navegador
  // A resposta do script no iframe será processada abaixo
  submitted = true;
});

// Controla quando mostrar feedback após envio via iframe
let submitted = false;
window.onfocus = function() {
  if (submitted) {
    document.getElementById('mensagem-sucesso').style.display = 'block';
    contatoForm.reset();
    submitted = false;
  }
};
