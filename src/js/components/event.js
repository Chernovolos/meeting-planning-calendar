const daysMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
};

function createEvent(tableEvent) {
    const eventWrapper = document.createElement('div');
    eventWrapper.className = 'event-wrapper';
    eventWrapper.setAttribute('id', `${tableEvent.id}`);

    const eventDescription = document.createElement('div');
    eventDescription.className = 'event-name';
    eventDescription.innerHTML = `${tableEvent.name}`;

    const buttonWrapper = document.createElement('div');

    const eventButton = document.createElement('button');
    eventButton.className = 'event-button';
    eventButton.setAttribute('type', 'button');
    eventButton.setAttribute('id', 'buttonClose');

    const span = document.createElement('span');

    const i = document.createElement('i');
    i.className = 'fas fa-times event-icon';
    span.appendChild(i);

    eventWrapper.appendChild(eventDescription);
    eventWrapper.appendChild(buttonWrapper);
    buttonWrapper.appendChild(eventButton);
    eventButton.appendChild(span);
    return eventWrapper;
}

export default function renderEvents(tableEvents) {
    const tableCells = document.querySelectorAll('[data-cell-day]');
    // eslint-disable-next-line no-param-reassign
    tableCells.forEach((tableCell) => { tableCell.innerHTML = ''; });

    tableEvents.forEach((tableEvent) => {
        const eventDate = tableEvent && tableEvent.date ? new Date(tableEvent.date) : null;
        if (eventDate != null) {
            const day = eventDate.getDay();
            const time = eventDate.getHours();
            const stringDay = daysMapping[day];
            const cell = document.querySelector(`[data-cell-day="${stringDay}"][data-cell-time="${time}"]`);
            const eventCard = createEvent(tableEvent);
            if (cell) {
                cell.appendChild(eventCard);
            } else {
                console.error();
            }
        } else {
            console.warn('Can\'t render event without date!', tableEvent);
        }
    });
}
