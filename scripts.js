document.addEventListener("DOMContentLoaded", () => {
  // Rolagem suave ao clicar nos links do menu
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const destino = document.querySelector(link.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }

      // Fecha o menu mobile após clicar
      const navLinks = document.getElementById("nav-links");
      navLinks.classList.remove("active");
    });
  });

  // Toggle do menu mobile (hamburguer)
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Fade-in com ScrollReveal
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal('.fade-in-on-scroll', {
      delay: 200,
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: false
    });
  }

  // Animação fade-in alternativa (caso ScrollReveal falhe)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    if (!element.classList.contains('visible')) {
      observer.observe(element);
    }
  });

  // Validação de formulário + feedback visual
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

  // Glide.js (opcional - se ativar carrossel futuramente)
  if (typeof Glide !== "undefined" && document.querySelector('.glide')) {
    new Glide('.glide', {
      type: 'carousel',
      perView: 1,
      autoplay: 5000,
      hoverpause: true,
      animationDuration: 800
    }).mount();
  }
});
