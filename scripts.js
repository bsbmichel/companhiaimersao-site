// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {

  // Rolagem suave ao clicar nos links do menu
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const destino = document.querySelector(link.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }

      // Fecha o menu mobile após clicar (caso esteja aberto)
      document.querySelector('nav').classList.remove('open');
      document.getElementById('nav-links').classList.remove('active');
    });
  });

  // Menu mobile com botão "hambúrguer"
  const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  }

  // ScrollReveal - animações ao rolar a página
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.fade-in-on-scroll', {
      delay: 200,
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: false
    });
  }

  // Lightbox2 já funciona por padrão com data-lightbox nos <a>

  // Validação de formulário de contato + sucesso
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

});
