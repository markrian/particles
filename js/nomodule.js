document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('browser-not-supported').cloneNode(true);
    el.className = 'error-header';

    document.body.innerHTML = '';
    document.body.appendChild(el);
});
