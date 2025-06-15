// JavaScript com funcionalidades completas:

// 1️⃣ Rolagem suave nos links do menu (scroll smooth)
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section?.scrollIntoView({ behavior: 'smooth' });
  });
});

// 2️⃣ Animação de fade-in nas seções conforme o usuário rola a página
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

// 3️⃣ Menu mobile com botão “hambúrguer” para abrir/fechar
const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Envio do formulário para Google Sheets via Apps Script
// Inclui validação, gravação no sheet, envio de e-mail e exibição de feedback
const contatoForm = document.getElementById('contato-form');
contatoForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // 📝 Coleta dos dados
  const nome = contatoForm.nome.value.trim();
  const email = contatoForm.email.value.trim();
  const telefone = contatoForm.telefone.value.trim();
  const mensagem = contatoForm.mensagem.value.trim();

  // ✅ Validações
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

  const data = { nome, email, telefone, mensagem };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw0lf9w9d5s7tQOQJ-MJE7KqVOfhyqQPwdSJw4sKPM/exec",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const text = await response.text();
    if (response.ok && text.startsWith("OK")) {
      document.getElementById('mensagem-sucesso').style.display = 'block';
      contatoForm.reset();
    } else {
      console.error("Erro no script:", text);
      alert("O envio falhou. Tente novamente mais tarde.");
    }
  } catch (err) {
    console.error("Falha de conexão:", err);
    alert("Erro de conexão. Verifique sua internet.");
  }
});
