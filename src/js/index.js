import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../style/index.scss';
import * as $ from 'jquery';

import API from './services/api';
import renderTable from './components/table';
import addOptions from './components/options';
import renderEvents from './components/event';
import { getCalendarMode } from './services/helper';
import initializeForm from './components/form';
import errorAlert from './components/alert';

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function initialize() {
    const api = new API();
    const membersSelect = document.querySelector('[data-control-name=teamMembers]');
    const participantsSelect = document.getElementById('participants');
    const nameSelect = document.getElementById('meetingName');
    const daySelect = document.getElementById('meetingDay');
    const timeSelect = document.getElementById('meetingTime');
    const importEvents = document.querySelector('#importEvents');
    const newEventButton = document.getElementById('newEvent');
    const tableContainer = document.getElementById('tableContainer');

    newEventButton.addEventListener('click', () => {
        $('#formModal').modal('show');
        $('.toast').toast('hide');
    });

    // SETTING UP LISTENERS
    membersSelect.addEventListener('change', (e) => {
        e.preventDefault();
        const member = membersSelect.value;
        if (member === 'SELECT_ALL') {
            api.getEvents()
                .then((data) => {
                    renderEvents(data);
                })
                .catch((error) => {
                    const errorDescription = errorAlert(error);
                    tableContainer.before(errorDescription);
                });
        } else {
            api.getEventsById(member)
                .then((data) => {
                    renderEvents(data);
                })
                .catch((error) => {
                    const errorDescription = errorAlert(error);
                    tableContainer.before(errorDescription);
                });
        }
    });

    importEvents.addEventListener('click', (event) => {
        event.preventDefault();
        api.importDefaultEvents()
            .then((data) => {
                api.getEvents()
                    .then((events) => {
                        renderEvents(events);
                    })
                    .catch((error) => {
                        const errorDescription = errorAlert(error);
                        tableContainer.before(errorDescription);
                    });
            });
    });

    const eventModalClose = document.querySelector('#btnEventClose');
    eventModalClose.addEventListener('click', () => {
        $('#modalEvent').modal('hide');
    });

    const eventModalButton = document.querySelector('#btnEventSuccess');
    eventModalButton.addEventListener('click', (eventModalEvent) => {
        const modalBody = document.querySelector('#modalContentEvent');
        // eslint-disable-next-line radix
        const eventId = modalBody.getAttribute('data-event-to-delete');
        const calendarMode = getCalendarMode();
        api.deleteEvent(eventId, calendarMode)
            .then((deleteResponse) => {
                if (calendarMode === 'SELECT_ALL') {
                    api.getEvents()
                        .then((getEventsResponse) => {
                            renderEvents(getEventsResponse);
                            $('#modalEvent').modal('hide');
                        })
                        .catch((error) => {
                            const errorDescription = errorAlert(error);
                            tableContainer.before(errorDescription);
                        });
                } else {
                    api.getEventsById(calendarMode)
                        .then((getEventsResponse) => {
                            renderEvents(getEventsResponse);
                            $('#modalEvent').modal('hide');
                        })
                        .catch((error) => {
                            const errorDescription = errorAlert(error);
                            tableContainer.before(errorDescription);
                        });
                }
            })
            .catch((error) => {
                const errorDescription = errorAlert(error);
                tableContainer.before(errorDescription);
            });
    });

    return {
        membersSelect,
        api,
        participantsSelect,
        nameSelect,
        daySelect,
        timeSelect,
        tableContainer,
    };
}

function main() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    const {
        membersSelect, api, participantsSelect, nameSelect, daySelect, timeSelect, tableContainer,
    } = initialize();

    renderTable(days, times);

    api.getMembers()
        .then((data) => {
            addOptions(data, membersSelect);
            // eslint-disable-next-line max-len
            initializeForm(data, days, times, participantsSelect, nameSelect, daySelect, timeSelect, api);
        })
        .catch((error) => {
            const errorDescription = errorAlert(error);
            tableContainer.before(errorDescription);
        });

    api.getEvents()
        .then((data) => {
            renderEvents(data);
        })
        .catch((error) => {
            const errorDescription = errorAlert(error);
            tableContainer.before(errorDescription);
        });
}

docReady(main);
