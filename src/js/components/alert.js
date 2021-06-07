export default function errorAlert(error) {
    const container = document.createElement('div');
    container.className = 'container';

    const div = document.createElement('div');
    div.className = 'alert alert-danger alert-dismissible fade show';
    div.setAttribute('role', 'alert');

    const span = document.createElement('span');
    console.log(span);
    span.id = 'errorDescription';
    span.innerHTML = `${error.status} ${error.message}`;

    const button = document.createElement('button');
    button.className = 'close';
    button.setAttribute('type', 'button');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('aria-label', 'Close');

    const spanButton = document.createElement('span');
    spanButton.setAttribute('aria-hidden', 'true');
    spanButton.innerHTML = '&times;';

    button.append(spanButton);
    div.append(span);
    div.append(button);
    container.append(div);

    return container;
}
