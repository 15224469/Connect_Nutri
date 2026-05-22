document.addEventListener('DOMContentLoaded', function () {

    const calendarEl = document.getElementById('calendar');

    let previouslyClickedDateCell = null;

    let selectedTimeSlot = null;

    /* ===============================
    CALENDÁRIO
    =============================== */

    const calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',

        locale: 'pt-br',

        headerToolbar: {

            left: 'prev,next',

            center: 'title',

            right: ''

        },

        dateClick: function (info) {

            const selectedDateSpan =
                document.getElementById('selected-date');

            const timeSlotsContainer =
                document.querySelector('.time-slots-container');

            const timeSlotsDiv =
                document.getElementById('time-slots');

            if (
                previouslyClickedDateCell === info.dayEl
            ) {

                info.dayEl.classList.remove(
                    'selected-day'
                );

                previouslyClickedDateCell = null;

                selectedDateSpan.textContent =
                    'Nenhuma';

                timeSlotsContainer.style.display =
                    'none';

                timeSlotsDiv.innerHTML = '';

            } else {

                if (previouslyClickedDateCell) {

                    previouslyClickedDateCell
                        .classList.remove(
                            'selected-day'
                        );

                }

                info.dayEl.classList.add(
                    'selected-day'
                );

                previouslyClickedDateCell =
                    info.dayEl;

                selectedDateSpan.textContent =
                    info.date
                        .toISOString()
                        .split('T')[0];

                timeSlotsContainer.style.display =
                    'flex';

                populateTimeSlots(
                    timeSlotsDiv
                );

            }

        }

    });

    calendar.render();

    /* ===============================
    HORÁRIOS
    =============================== */

    function populateTimeSlots(container) {

        container.innerHTML = '';

        const availableTimes = [

            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30'

        ];

        selectedTimeSlot = null;

        availableTimes.forEach(time => {

            const btn =
                document.createElement('button');

            btn.className = 'time-slot';

            btn.textContent = time;

            btn.addEventListener('click', () => {

                if (selectedTimeSlot === btn) {

                    btn.classList.remove(
                        'selected'
                    );

                    selectedTimeSlot = null;

                } else {

                    if (selectedTimeSlot) {

                        selectedTimeSlot
                            .classList.remove(
                                'selected'
                            );

                    }

                    btn.classList.add(
                        'selected'
                    );

                    selectedTimeSlot = btn;

                }

            });

            container.appendChild(btn);

        });

    }

    /* ===============================
    SALVAR AGENDAMENTO
    =============================== */

    window.salvarAgendamento = function () {

        const nomePaciente =
            document.getElementById(
                'nome-paciente'
            ).value.trim();

        const dataSelecionada =
            document.getElementById(
                'selected-date'
            ).textContent;

        const tipoAtendimento =
            document.getElementById(
                'appointment-type'
            ).value;

        const motivoConsulta =
            document.getElementById(
                'motivo-consulta'
            ).value.trim();

        const horarioSelecionado =
            selectedTimeSlot?.textContent;

        /* ===============================
        VALIDAÇÃO
        =============================== */

        if (

            nomePaciente === '' ||

            dataSelecionada === 'Nenhuma' ||

            !tipoAtendimento ||

            !motivoConsulta ||

            !horarioSelecionado

        ) {

            alert(
                'Preencha todos os campos obrigatórios.'
            );

            return;

        }

        /* ===============================
        OBJETO DO AGENDAMENTO
        =============================== */

        const novoAgendamento = {

            nome_paciente: nomePaciente,

            data: dataSelecionada,

            hora: horarioSelecionado,

            tipo_atendimento:
                tipoAtendimento,

            motivo_consulta:
                motivoConsulta

        };

        /* ===============================
        SALVAR TEMPORARIAMENTE
        =============================== */

        localStorage.setItem(

            'agendamentoPendente',

            JSON.stringify(
                novoAgendamento
            )

        );

        /* ===============================
        REDIRECIONAR
        =============================== */

        window.location.href =
            'telaprefinal.html';

    };

});