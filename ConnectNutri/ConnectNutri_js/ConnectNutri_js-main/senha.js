import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://asorsiryghfeaaacurai.supabase.co";
const supabaseKey = "sb_publishable_3Kqws8GOkvFPeTdN7vk5Mw_PPk2UppT";
const supabase = createClient(supabaseUrl, supabaseKey);

/* ===============================
BOTÃO PRÓXIMO
=============================== */

document.getElementById("confirmar-formulario").addEventListener("click", async () => {

    const email = document.getElementById("email-recuperacao").value.trim();

    /* ===============================
    VALIDAÇÃO
    =============================== */

    if (!email) {
        alert("Por favor, digite seu e-mail.");
        return;
    }

    // Verifica se o formato do email é válido
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        alert("Por favor, digite um e-mail válido.");
        return;
    }

    /* ===============================
    FEEDBACK VISUAL
    =============================== */

    const botao = document.getElementById("confirmar-formulario");
    botao.disabled = true;
    botao.querySelector("span").textContent = "Enviando...";

    /* ===============================
    ENVIAR EMAIL DE RECUPERAÇÃO
    =============================== */

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://127.0.0.1:5500/Connect_Nutri/ConnectNutri/ConnectNutri_js/ConnectNutri_js-main/redefsenha.html"
    });

    /* ===============================
    RESULTADO
    =============================== */

    if (error) {

        console.error("Erro ao enviar email:", error);
        alert("Erro ao enviar o e-mail. Verifique o endereço e tente novamente.");

        // Reativa o botão
        botao.disabled = false;
        botao.querySelector("span").textContent = "PRÓXIMO";

        return;

    }

    alert("E-mail enviado com sucesso! Verifique sua caixa de entrada.");

    // Redireciona para o login
    window.location.href = "index.html";

});