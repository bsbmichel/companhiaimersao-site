// 1️⃣ Rolagem suave nos links do menu
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  });
});

// 2️⃣ Animação de fade-in nas seções ao rolar
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('hidden');
  sectionObserver.observe(section);
});

// 3️⃣ Menu mobile com botão hambúrguer
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Validação e envio do formulário de contato via iframe
const contatoForm = document.getElementById('contato-form');
const iframe = document.getElementById('hidden_iframe');
let submitted = false;

contatoForm.addEventListener('submit', function (e) {
  const nome = contatoForm.nome.value.trim();
  const email = contatoForm.email.value.trim();
  const telefone = contatoForm.telefone.value.trim();
  const mensagem = contatoForm.mensagem.value.trim();

  const nomeValido = /^[A-Za-zÀ-ú\\s]+$/;
  const telefoneValido = /^[0-9]+$/;
  const emailValido = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

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

// 5️⃣ Animação de entrada das imagens da galeria ao rolar
const galeriaImgs = document.querySelectorAll('.gallery img');

const galeriaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    } else {
      entry.target.classList.remove('fade-in');
    }
  });
}, { threshold: 0.3 });

galeriaImgs.forEach(img => {
  galeriaObserver.observe(img);
});
