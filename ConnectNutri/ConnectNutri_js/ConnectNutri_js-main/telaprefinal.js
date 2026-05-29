document.addEventListener("DOMContentLoaded", () => {

    const botao =
        document.getElementById(
            "confirmar-formulario"
        );

    botao.addEventListener("click", () => {

        // pega o agendamento temporário
        const agendamento =
            JSON.parse(
                localStorage.getItem(
                    "agendamentoPendente"
                )
            );

        if (!agendamento) {

            alert(
                "Nenhum agendamento encontrado."
            );

            return;

        }

        // pega lista atual
        let consultas =
            JSON.parse(
                localStorage.getItem(
                    "consultas"
                )
            ) || [];

        // adiciona nova consulta
        consultas.push(agendamento);

        // salva lista atualizada
        localStorage.setItem(
            "consultas",
            JSON.stringify(consultas)
        );

        // remove pendente
        localStorage.removeItem(
            "agendamentoPendente"
        );

        // vai para consultas
        window.location.href =
            "finalização.html";

    });

});