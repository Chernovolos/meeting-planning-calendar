export default function renderTable(tableDates, tableTimes) {
    const tableContainer = document.querySelector('[id=tableContainer]');

    const container = document.createElement('div');
    container.className = 'container';

    const table = document.createElement('table');
    table.className = 'table table-bordered table-planned table-meeting';

    const thead = document.createElement('thead');
    thead.setAttribute('id', 'calendarHead');

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'calendarBody');

    const tr = document.createElement('tr');

    ['Time/Date', ...tableDates].forEach((date) => {
        const th = document.createElement('th');
        th.innerHTML = `${date}`;
        th.setAttribute('scope', 'col');
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
    });

    tableTimes.forEach((time) => {
        const row = document.createElement('tr');
        row.className = 'table-headline';
        const timeTh = document.createElement('th');
        timeTh.innerHTML = `${time}:00`;
        row.appendChild(timeTh);

        tableDates.forEach((date) => {
            const timeTd = document.createElement('td');
            timeTd.setAttribute('data-cell-day', `${date}`);
            timeTd.setAttribute('data-cell-time', `${time}`);
            row.appendChild(timeTd);
            tbody.appendChild(row);
            table.appendChild(tbody);
        });
    });
    container.appendChild(table);
    if (tableContainer) {
        tableContainer.appendChild(container);
    } else {
        console.error();
    }
}
