import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://asorsiryghfeaaacurai.supabase.co";
const supabaseKey = "sb_publishable_3Kqws8GOkvFPeTdN7vk5Mw_PPk2UppT";
const supabase = createClient(supabaseUrl, supabaseKey);

/* ===============================
MOSTRAR/OCULTAR SENHA
=============================== */

function toggleSenha(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bxs-hide");
            icon.classList.add("bxs-show");
        } else {
            input.type = "password";
            icon.classList.remove("bxs-show");
            icon.classList.add("bxs-hide");
        }
    });
}

toggleSenha("nova-senha", "toggle-nova-senha");
toggleSenha("confirmar-senha", "toggle-confirmar-senha");

/* ===============================
REDEFINIR SENHA
=============================== */

document.getElementById("btn-redefinir").addEventListener("click", async () => {

    const novaSenha = document.getElementById("nova-senha").value.trim();
    const confirmarSenha = document.getElementById("confirmar-senha").value.trim();

    // VALIDAÇÕES
    if (!novaSenha || !confirmarSenha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (novaSenha.length < 6) {
        alert("A senha precisa ter pelo menos 6 caracteres.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // FEEDBACK VISUAL
    const botao = document.getElementById("btn-redefinir");
    botao.disabled = true;
    botao.querySelector("span").textContent = "Salvando...";

    // ATUALIZAR SENHA NO SUPABASE
    const { error } = await supabase.auth.updateUser({
        password: novaSenha
    });

    if (error) {
        console.error("Erro ao redefinir senha:", error);
        alert("Erro ao redefinir senha. O link pode ter expirado.");
        botao.disabled = false;
        botao.querySelector("span").textContent = "CONFIRMAR";
        return;
    }

    alert("Senha redefinida com sucesso!");
    window.location.href = "index.html";

});