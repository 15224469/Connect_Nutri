document.addEventListener('DOMContentLoaded', () => {

    const lista =
        document.getElementById(
            'lista-agendamentos'
        );

    const consultas =
        JSON.parse(
            localStorage.getItem(
                'consultas'
            )
        ) || [];

    const canceladas =
        JSON.parse(
            localStorage.getItem(
                'consultasCanceladas'
            )
        ) || [];

    lista.innerHTML = '';

    /* ===============================
    CONSULTAS NORMAIS
    =============================== */

    consultas.forEach((consulta) => {

        let prioridade = '';

        if (

            consulta.tipo_atendimento
            .toLowerCase()
            .includes('gestante')

            ||

            consulta.tipo_atendimento
            .toLowerCase()
            .includes('idoso')

            ||

            consulta.tipo_atendimento
            .toLowerCase()
            .includes('comorbidade')

        ) {

            prioridade = `

                <div class="prioridade">

                    PRIORIDADE

                </div>

            `;

        }

        lista.innerHTML += `

            <div class="agendamento-card">

                ${prioridade}

                <h2>

                    ${consulta.nome_paciente}

                </h2>

                <p>

                    <b>Tipo:</b>

                    ${consulta.tipo_atendimento}

                </p>

                <p>

                    <b>Data:</b>

                    ${consulta.data}

                </p>

                <p>

                    <b>Horário:</b>

                    ${consulta.hora}

                </p>

                <p>

                    <b>Motivo:</b>

                    ${consulta.motivo_consulta}

                </p>

            </div>

        `;

    });

    /* ===============================
    CANCELADAS
    =============================== */

    canceladas.forEach((consulta, index) => {

        lista.innerHTML += `

            <div class="agendamento-card cancelada">

                <h2>

                    CONSULTA CANCELADA

                </h2>

                <p>

                    <b>Paciente:</b>

                    ${consulta.nome_paciente}

                </p>

                <p>

                    <b>Tipo:</b>

                    ${consulta.tipo_atendimento}

                </p>

                <p>

                    <b>Data:</b>

                    ${consulta.data}

                </p>

                <p>

                    <b>Horário:</b>

                    ${consulta.hora}

                </p>

                <p>

                    <b>Motivo do cancelamento:</b>

                    ${consulta.motivo_cancelamento}

                </p>

                <button
                    class="ok-btn"
                    data-index="${index}">

                    OK

                </button>

            </div>

        `;

    });

    /* ===============================
    BOTÃO OK
    =============================== */

    const botoesOk =
        document.querySelectorAll(
            '.ok-btn'
        );

    botoesOk.forEach(botao => {

        botao.addEventListener(
            'click',
            () => {

                const index =
                    botao.dataset.index;

                canceladas.splice(
                    index,
                    1
                );

                localStorage.setItem(

                    'consultasCanceladas',

                    JSON.stringify(
                        canceladas
                    )

                );

                location.reload();

            }
        );

    });

});