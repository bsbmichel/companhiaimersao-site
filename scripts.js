// scripts.js atualizado com base no novo estilo

// 1️⃣ Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  });
});

// 2️⃣ Animação "fade-in" com interseção ao rolar a página
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
  element.classList.add('hidden');
  observer.observe(element);
});

// 3️⃣ Menu mobile com botão "hambúrguer"
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Confirmação visual do envio do formulário "Contato"
const contatoForm = document.getElementById('contato-form');
const iframe = document.getElementById('hidden_iframe');
let submitted = false;

if (contatoForm && iframe) {
  contatoForm.addEventListener('submit', function(e) {
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

// 5️⃣ Animação nas imagens da galeria (zoom on scroll)
const galeriaImgs = document.querySelectorAll('.gallery img');
const galeriaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('zoom-in');
    } else {
      entry.target.classList.remove('zoom-in');
    }
  });
}, { threshold: 0.3 });

galeriaImgs.forEach(img => galeriaObserver.observe(img));

// 6️⃣ ScrollReveal animações
ScrollReveal().reveal('.fade-in-on-scroll', {
  delay: 200,
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
  origin: 'bottom',
  reset: false
});

