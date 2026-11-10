// ===== Funcionalidade 1: mostrar/ocultar a linha do tempo =====
const btnLinhaTempo = document.getElementById("btn-linha-tempo");
const linhaTempo = document.getElementById("linha-tempo");

btnLinhaTempo.addEventListener("click", function () {
  const oculta = linhaTempo.classList.toggle("oculto");
  btnLinhaTempo.textContent = oculta ? "Mostrar linha do tempo" : "Ocultar linha do tempo";
  btnLinhaTempo.setAttribute("aria-expanded", String(!oculta));
});

// ===== Funcionalidade 2: validação do formulário + saudação personalizada =====
const form = document.getElementById("form-contato");
const campoNome = document.getElementById("txtnomecompleto");
const campoEmail = document.getElementById("txtemail");
const campoTel = document.getElementById("tel");
const mensagem = document.getElementById("mensagem-form");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// Máscara automática do telefone: (27) 99999-9999
campoTel.addEventListener("input", function () {
  let n = campoTel.value.replace(/\D/g, "").slice(0, 11);
  if (n.length > 6) {
    const meio = n.length > 10 ? 7 : 6;
    n = "(" + n.slice(0, 2) + ") " + n.slice(2, meio) + "-" + n.slice(meio);
  } else if (n.length > 2) {
    n = "(" + n.slice(0, 2) + ") " + n.slice(2);
  }
  campoTel.value = n;
});

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const telefone = campoTel.value.replace(/\D/g, "");

  if (nome.split(/\s+/).length < 2) {
    mostrarMensagem("Informe seu nome completo (nome e sobrenome).", "erro");
    campoNome.focus();
  } else if (!email.includes("@") || !email.includes(".")) {
    mostrarMensagem("Informe um e-mail válido, como nome@exemplo.com.", "erro");
    campoEmail.focus();
  } else if (telefone.length < 10) {
    mostrarMensagem("Informe o telefone com DDD, como (27) 99999-9999.", "erro");
    campoTel.focus();
  } else {
    const primeiroNome = nome.split(/\s+/)[0];
    mostrarMensagem("Obrigado, " + primeiroNome + "! Recebi suas informações e entrarei em contato em breve.", "sucesso");
    form.reset();
  }
});
