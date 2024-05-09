function openModal(link) {
    const modal = document.querySelector('.modal');
    const cofirmButton = modal.querySelector('.modal-confirm');
    const cancelButton = modal.querySelector('.modal-cancel');
    modal.style.display = 'flex';

    setTimeout(() => {
        modal.classList.add('modal--active');
    }, 10)

    cancelButton.addEventListener('click', () => {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200)
    })

    cofirmButton.addEventListener('click', () => {
        location.href = link;
    })
}

export {openModal}