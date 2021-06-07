function addOptions(options, parent) {
    const selectAllOption = document.createElement('option');
    selectAllOption.innerHTML = 'Select All';
    selectAllOption.value = 'SELECT_ALL';
    selectAllOption.selected = true;
    parent.appendChild(selectAllOption);

    options.forEach((item) => {
        const option = document.createElement('option');
        option.innerHTML = `${item.name}`;
        option.value = `${item.id}`;
        parent.appendChild(option);
    });
}

export default addOptions;
