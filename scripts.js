// ✅ 1️⃣ Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }

    // Fecha o menu mobile após clicar (caso esteja aberto)
    document.querySelector('nav').classList.remove('open');
  });
});

// ✅ 2️⃣ ScrollReveal - animações ao rolar a página
ScrollReveal().reveal('.fade-in-on-scroll', {
  delay: 200,
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
  origin: 'bottom',
  reset: false
});

// ✅ 3️⃣ Glide.js - Carrossel automático da galeria (se usar Glide futuramente)
if (document.querySelector('.glide')) {
  new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    autoplay: 5000,
    hoverpause: true,
    animationDuration: 800
  }).mount();
}

// ✅ 4️⃣ Lightbox2 - já funciona com data-lightbox nos <a>

// ✅ 5️⃣ Botão "Voltar ao Topo" com legenda
const botaoTopo = document.getElementById("voltar-topo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    botaoTopo.style.display = "flex"; // flex para alinhar ícone e legenda
  } else {
    botaoTopo.style.display = "none";
  }
});

if (botaoTopo) {
  botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ✅ 6️⃣ Animação fade-in alternativa com IntersectionObserver (opcional)
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

// ✅ 7️⃣ Menu mobile com botão "hambúrguer"
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('open');
  });
}

// ✅ 8️⃣ Validação de formulário de contato + sucesso
const contatoForm = document.getElementById('contato-form');
const iframe = document.getElementById('hidden_iframe');
let submitted = false;

if (contatoForm && iframe) {
  contatoForm.addEventListener('submit', function (e) {
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
