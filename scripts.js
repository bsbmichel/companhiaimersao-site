// 1️⃣ Rolagem suave nos links
const links = document.querySelectorAll('nav a');
links.forEach(link => link.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
}));

// 2️⃣ Fade-in nas seções
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

// 3️⃣ Menu hamburguer mobile
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

// 4️⃣ Validação + envio via iframe + feedback instantâneo
const contatoForm = document.getElementById('contato-form');
const iframe = document.getElementById('hidden_iframe');
let submitted = false;
contatoForm?.addEventListener('submit', e => {
  const nome = contatoForm.nome.value.trim();
  const email = contatoForm.email.value.trim();
  const telefone = contatoForm.telefone.value.trim();

  const nomeValido = /^[A-Za-zÀ-ú\s]+$/;
  const telefoneValido = /^[0-9]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nomeValido.test(nome)) { alert("Digite apenas letras no nome."); e.preventDefault(); return; }
  if (!telefoneValido.test(telefone)) { alert("Digite apenas números no telefone."); e.preventDefault(); return; }
  if (!emailValido.test(email)) { alert("Digite um e-mail válido."); e.preventDefault(); return; }

  submitted = true;
});

iframe?.addEventListener('load', () => {
  if (submitted) {
    document.getElementById('mensagem-sucesso').style.display = 'block';
    contatoForm.reset();
    submitted = false;
  }
});
