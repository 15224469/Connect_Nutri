import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://asorsiryghfeaaacurai.supabase.co";
const supabaseKey = "sb_publishable_3Kqws8GOkvFPeTdN7vk5Mw_PPk2UppT";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {

    const whatsappBox = document.getElementById("whatsapp-box");
    const emailBox = document.querySelector(".option-box");

    /* ===============================
    DADOS DO AGENDAMENTO
    =============================== */

    const agendamentoPendente = JSON.parse(
        localStorage.getItem("agendamentoPendente")
    );

    /* ===============================
    FUNÇÃO PRINCIPAL - SALVAR NO SUPABASE
    =============================== */

    async function salvarNoSupabase() {

        if (!agendamentoPendente) {
            alert("Nenhum agendamento encontrado.");
            return false;
        }

        // Verifica se o paciente está logado
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            alert("Você precisa estar logado para agendar.");
            window.location.href = "index.html";
            return false;
        }

        // Salva na tabela consultas
        const { error } = await supabase
            .from("consultas")
            .insert([{
                paciente_id: user.id,
                nome_paciente: agendamentoPendente.nome_paciente,
                data_consulta: agendamentoPendente.data,
                horario: agendamentoPendente.hora,
                tipo_atendimento: agendamentoPendente.tipo_atendimento,
                motivo: agendamentoPendente.motivo_consulta,
                status: "pendente"
            }]);

        if (error) {
            console.error("Erro ao salvar consulta:", error);
            alert("Erro ao confirmar agendamento: " + error.message);
            return false;
        }

        // Limpa o localStorage
        localStorage.removeItem("agendamentoPendente");

        return true;
    }

    /* ===============================
    WHATSAPP
    =============================== */

    if (whatsappBox) {

        whatsappBox.addEventListener("click", async () => {

            const sucesso = await salvarNoSupabase();

            if (!sucesso) return;

            const numeroWhatsApp = "558185667737";

            const mensagem =
`Olá ${agendamentoPendente.nome_paciente}!

Seu agendamento foi confirmado com sucesso.

Data: ${agendamentoPendente.data}
Horário: ${agendamentoPendente.hora}
Tipo de atendimento: ${agendamentoPendente.tipo_atendimento}

Acompanhe também no nosso site!`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

            window.open(url, "_blank");

            alert("Agendamento confirmado com sucesso!");

        });
    }

    /* ===============================
    EMAIL
    =============================== */

    if (emailBox) {

        emailBox.addEventListener("click", async () => {

            const sucesso = await salvarNoSupabase();

            if (!sucesso) return;

            alert("Confirmação enviada por e-mail!");

        });
    }

});