import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://cdfoxaisfwzhyrmlfgiy.supabase.co";

const supabaseKey = "SUA_CHAVE_SUPABASE";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const togglePassword = document.getElementById("togglePassword");
const lembrarSenha = document.querySelector('input[type="checkbox"]');
const esqueceuSenha = document.querySelector(".remember-forgot a");

/* ===============================
VISUALIZAR SENHA
=============================== */

togglePassword.addEventListener("click", () => {

  if (senhaInput.type === "password") {

    senhaInput.type = "text";

    togglePassword.classList.remove("bxs-hide");
    togglePassword.classList.add("bxs-show");

  } else {

    senhaInput.type = "password";

    togglePassword.classList.remove("bxs-show");
    togglePassword.classList.add("bxs-hide");

  }

  togglePassword.classList.add("animate-eye");

  setTimeout(() => {

    togglePassword.classList.remove("animate-eye");

  }, 300);

});

/* ===============================
LEMBRAR SENHA
=============================== */

window.addEventListener("load", () => {

  const emailSalvo = localStorage.getItem("email");
  const senhaSalva = localStorage.getItem("senha");

  if (emailSalvo && senhaSalva) {

    emailInput.value = emailSalvo;
    senhaInput.value = senhaSalva;

    lembrarSenha.checked = true;

  }

});

/* ===============================
LOGIN
=============================== */

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();

  const senha = senhaInput.value.trim();

  /* ===============================
  LEMBRAR SENHA
  =============================== */

  if (lembrarSenha.checked) {

    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

  } else {

    localStorage.removeItem("email");
    localStorage.removeItem("senha");

  }

  /* ===============================
  LOGIN NUTRICIONISTA
  =============================== */

  if (

    email === "nutricionista@fafire.com" &&
    senha === "nutricao2026"

  ) {

    localStorage.setItem(
      "tipoUsuario",
      "nutricionista"
    );

    window.location.href =
      "nutricionista.html";

    return;

  }

  /* ===============================
  LOGIN PACIENTE
  =============================== */

  const {

    data: signInData,
    error: signInError

  } = await supabase.auth.signInWithPassword({

    email,
    password: senha

  });

  if (signInError) {

    console.error(
      "Erro detalhado do login:",
      signInError
    );

    alert("Email ou senha incorretos.");

    return;

  }

  /* ===============================
  BUSCAR DADOS DO USUÁRIO
  =============================== */

  const {

    data: dadosUsuario,
    error: usuariosError

  } = await supabase

    .from("usuarios")

    .select("*")

    .eq("id", signInData.user.id)

    .single();

  if (usuariosError) {

    console.error(
      "Erro ao buscar dados extras:",
      usuariosError
    );

    alert(
      "Erro ao buscar dados do usuário: " +
      usuariosError.message
    );

    return;

  }

  console.log(
    "Usuário logado:",
    dadosUsuario
  );

  /* ===============================
  REDIRECIONAR PACIENTE
  =============================== */

  window.location.href =
    "agendamento.html";

});

/* ===============================
ESQUECI A SENHA
=============================== */

esqueceuSenha.addEventListener(
  "click",
  async (e) => {

    e.preventDefault();

    const email = prompt(
      "Digite seu email para recuperar a senha:"
    );

    if (!email) return;

    const { error } =
      await supabase.auth.resetPasswordForEmail(

        email,

        {
          redirectTo:
            "http://127.0.0.1:5500/redefinirsenha.html"
        }

      );

    if (error) {

      alert(
        "Erro ao enviar email de recuperação."
      );

    } else {

      alert(
        "Email de recuperação enviado com sucesso!"
      );

    }

  }

);