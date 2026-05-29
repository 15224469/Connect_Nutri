import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://asorsiryghfeaaacurai.supabase.co";
const supabaseKey = "sb_publishable_3Kqws8GOkvFPeTdN7vk5Mw_PPk2UppT";
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
    setTimeout(() => togglePassword.classList.remove("animate-eye"), 300);
});

/* ===============================
LEMBRAR EMAIL
=============================== */

window.addEventListener("load", () => {
    const emailSalvo = localStorage.getItem("email");
    if (emailSalvo) {
        emailInput.value = emailSalvo;
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

    // Salva só o email (nunca a senha!)
    if (lembrarSenha.checked) {
        localStorage.setItem("email", email);
    } else {
        localStorage.removeItem("email");
    }

    /* ===============================
    AUTENTICAR NO SUPABASE
    =============================== */

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: senha
    });

    if (signInError) {
        alert("Email ou senha incorretos.");
        return;
    }

    /* ===============================
    VERIFICAR SE É ADMINISTRADOR
    =============================== */

    const { data: adminData } = await supabase
        .from("administradores")
        .select("email, cargo")
        .eq("email", email)
        .single();

    if (adminData) {
        localStorage.setItem("tipoUsuario", "administrador");
        localStorage.setItem("cargoAdmin", adminData.cargo);
        window.location.href = "nutricionista.html";
        return;
    }

    /* ===============================
    REDIRECIONAR PACIENTE
    =============================== */

    localStorage.setItem("tipoUsuario", "paciente");
    window.location.href = "agendamento.html";

});

esqueceuSenha.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "senha.html";
});