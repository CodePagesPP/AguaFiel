document.querySelectorAll('.expandable .card-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        card.classList.toggle('open');
    });
});