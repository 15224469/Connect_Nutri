document.addEventListener('DOMContentLoaded', () => {

    const listaConsultas =
        document.querySelector(
            '.lista-consultas'
        );

    let consultas =
        JSON.parse(
            localStorage.getItem(
                'consultas'
            )
        ) || [];

    renderizarConsultas();

    /* ===============================
    RENDERIZAR CONSULTAS
    =============================== */

    function renderizarConsultas() {

        listaConsultas.innerHTML = '';

        if (consultas.length === 0) {

            listaConsultas.innerHTML = `

                <div class="consulta-item">

                    <h2>
                        Nenhuma consulta agendada
                    </h2>

                </div>

            `;

            return;

        }

        consultas.forEach((consulta, index) => {

            const consultaHTML = `

                <div class="consulta-item">

                    <h2>

                        Consulta ${index + 1}

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

                        <b>Motivo:</b>

                        ${consulta.motivo_consulta}

                    </p>

                    <button
                        class="cancelar-btn"
                        data-index="${index}">

                        Cancelar Consulta

                    </button>

                </div>

            `;

            listaConsultas.innerHTML +=
                consultaHTML;

        });

        adicionarEventosCancelar();

    }

    /* ===============================
    CANCELAR CONSULTA
    =============================== */

    function adicionarEventosCancelar() {

        const botoesCancelar =
            document.querySelectorAll(
                '.cancelar-btn'
            );

        botoesCancelar.forEach(botao => {

            botao.addEventListener(
                'click',
                () => {

                    const index =
                        botao.dataset.index;

                    const motivo =
                        prompt(
                            'Informe o motivo do cancelamento:'
                        );

                    if (!motivo) {

                        alert(
                            'Cancelamento não realizado.'
                        );

                        return;

                    }

                    // consulta cancelada
                    const consultaCancelada =
                        consultas[index];

                    // adiciona motivo
                    consultaCancelada.motivo_cancelamento =
                        motivo;

                    // pega lista de cancelamentos
                    let canceladas =
                        JSON.parse(
                            localStorage.getItem(
                                'consultasCanceladas'
                            )
                        ) || [];

                    // adiciona cancelada
                    canceladas.push(
                        consultaCancelada
                    );

                    // salva canceladas
                    localStorage.setItem(

                        'consultasCanceladas',

                        JSON.stringify(
                            canceladas
                        )

                    );

                    // remove das consultas normais
                    consultas.splice(
                        index,
                        1
                    );

                    // salva consultas restantes
                    localStorage.setItem(

                        'consultas',

                        JSON.stringify(
                            consultas
                        )

                    );

                    alert(
                        'Consulta cancelada com sucesso!'
                    );

                    renderizarConsultas();

                }
            );

        });

    }

});