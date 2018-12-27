// eslint-disable-next-line prefer-arrow-callback
document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('browser-not-supported').cloneNode(true);
    el.className = 'error-header';

    document.body.innerHTML = '';
    document.body.appendChild(el);
});
