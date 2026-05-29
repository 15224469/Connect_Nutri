document.addEventListener("DOMContentLoaded", () => {

    const whatsappBox =
        document.getElementById("whatsapp-box");

    const emailBox =
        document.querySelector(".option-box");

    /* ===============================
    DADOS DO AGENDAMENTO
    =============================== */

    const agendamentoPendente = JSON.parse(

        localStorage.getItem(
            "agendamentoPendente"
        )

    );

    /* ===============================
    WHATSAPP
    =============================== */

    if (whatsappBox) {

        whatsappBox.addEventListener("click", () => {

            if (!agendamentoPendente) {

                alert(
                    "Nenhum agendamento encontrado."
                );

                return;

            }

            /* ===============================
            SALVAR AGENDAMENTO DEFINITIVO
            =============================== */

            let agendamentos = JSON.parse(

                localStorage.getItem(
                    "agendamentos"
                )

            ) || [];

            agendamentos.push(
                agendamentoPendente
            );

            localStorage.setItem(

                "agendamentos",

                JSON.stringify(agendamentos)

            );

            /* ===============================
            LIMPAR TEMPORÁRIO
            =============================== */

            localStorage.removeItem(
                "agendamentoPendente"
            );

            /* ===============================
            WHATSAPP
            =============================== */

            const numeroWhatsApp =
                "558185667737";

            const mensagem =

`Olá ${agendamentoPendente.nome_paciente}!

Seu agendamento foi confirmado com sucesso.

Data:
${agendamentoPendente.data}

Horário:
${agendamentoPendente.hora}

Tipo de atendimento:
${agendamentoPendente.tipo_atendimento}

Acompanhe também no nosso site!`;

            const url =

`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

            window.open(url, "_blank");

            alert(
                "Agendamento confirmado com sucesso!"
            );

        });

    }

    /* ===============================
    EMAIL
    =============================== */

    if (emailBox) {

        emailBox.addEventListener("click", () => {

            if (!agendamentoPendente) {

                alert(
                    "Nenhum agendamento encontrado."
                );

                return;

            }

            let agendamentos = JSON.parse(

                localStorage.getItem(
                    "agendamentos"
                )

            ) || [];

            agendamentos.push(
                agendamentoPendente
            );

            localStorage.setItem(

                "agendamentos",

                JSON.stringify(agendamentos)

            );

            localStorage.removeItem(
                "agendamentoPendente"
            );

            alert(
                "Confirmação enviada por e-mail!"
            );

        });

    }

});