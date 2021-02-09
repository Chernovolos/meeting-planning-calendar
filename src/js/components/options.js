const membersSelectAdditionalOptions = [
    { id: 'SELECT_ALL', name: 'Select All' },
];

function addOptions(options, parent) {
    [...membersSelectAdditionalOptions, ...options].forEach((item) => {
        const option = document.createElement('option');
        option.innerHTML = `${item.name}`;
        option.value = `${item.id}`;
        parent.appendChild(option);
    });
}
export default addOptions;
