import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../style/index.scss';

import API from './services/api';
import members from './mocks/members';
import events from './mocks/events';
import renderTable from './components/table';
import addOptions from './components/options';
import renderEvents from './components/event';

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
    const api = new API(members, events);

    const membersSelect = document.querySelector('[data-control-name=teamMembers]');

    // SETTING UP LISTENERS
    membersSelect.addEventListener('change', ({ target }) => {
        if (target.value === 'SELECT_ALL') {
            // call some function and rerender table with all members (call function with no args)
        } else {
            // call some function and rerender table for single member (send id to function)
        }
    });

    return {
        membersSelect,
        api,
    };
}

function main() {
    const dates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = [10, 11, 12, 13, 14, 14, 16, 17, 18];
    const { membersSelect, api } = initialize();

    api.getMembers()
        .then((date) => {
            addOptions(date, membersSelect);
        })
        .catch((error) => {
            console.log(error);
        });

    api.getEvents()
        .then((date) => {
            renderEvents(date);
        });

    renderTable(dates, times);
}

docReady(main);
