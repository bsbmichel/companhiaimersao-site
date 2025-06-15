// 1️⃣ Rolagem suave ao clicar nos links do menu
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// 2️⃣ Animação "fade-in" das seções ao rolar a página
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

// 3️⃣ Menu mobile com botão "hambúrguer" para abrir/fechar
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Validação do formulário e envio via iframe

// Seleciona o formulário e o iframe escondido
const contatoForm = document.getElementById('contato-form');
const iframe = document.getElementById('hidden_iframe');

// Flags para controle de submissão
let submitted = false;

// Adiciona evento ao formulário para validar os campos antes do envio
contatoForm.addEventListener('submit', function(e) {
  const nome = contatoForm.nome.value.trim();
  const email = contatoForm.email.value.trim();
  const telefone = contatoForm.telefone.value.trim();
  const mensagem = contatoForm.mensagem.value.trim();

  // Expressões regulares para validação
  const nomeValido = /^[A-Za-zÀ-ú\s]+$/;
  const telefoneValido = /^[0-9]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validações com alertas específicos
  if (!nomeValido.test(nome)) {
    alert("Digite apenas letras no campo Nome.");
    e.preventDefault(); // impede envio se inválido
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

  // Se passou nas validações, define flag para futura exibição do feedback
  submitted = true;
});

// Evento de load disparado quando o iframe recebe resposta do servidor
iframe.addEventListener('load', () => {
  if (submitted) {
    // Exibe mensagem de sucesso
    document.getElementById('mensagem-sucesso').style.display = 'block';
    // Reseta o formulário para envio futuro
    contatoForm.reset();
    // Redefine flag
    submitted = false;
  }
});
