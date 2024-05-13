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

function openModalLink() {
    const langButton = document.querySelector('.header__language-button')
    const modal = document.createElement('div');
    const modalWrapper = document.createElement('div');
    const modalTitle = document.createElement('h3');
    const linkList = document.createElement('ul');
    const listItemWhatsApp = document.createElement('li');
    const listItemSkype = document.createElement('li');
    const listItemTelegram = document.createElement('li');
    const linkWhatsApp = document.createElement('a');
    const linkSkype = document.createElement('a');
    const linkTelegram = document.createElement('a');
    const closeButton = document.createElement('button');
    const closeButtonFLine = document.createElement('span');
    const closeButtonSLine = document.createElement('span');

    modal.classList.add('modal');
    modalWrapper.classList.add('modal-wrapper');
    modalTitle.classList.add('reset-list', 'modal-title');
    linkList.classList.add('modal-link-list', 'reset-list');
    listItemWhatsApp.classList.add('modal-link-list-item');
    listItemSkype.classList.add('modal-link-list-item');
    listItemTelegram.classList.add('modal-link-list-item');
    linkTelegram.classList.add('modal-link-social', 'modal-link-telegram');
    linkWhatsApp.classList.add('modal-link-social', 'modal-link-whatsapp');
    linkSkype.classList.add('modal-link-social', 'modal-link-skype');
    closeButton.classList.add('modal-close-button');
    closeButtonFLine.classList.add('modal-close-button-line', 'modal-close-button-first-line');
    closeButtonSLine.classList.add('modal-close-button-line', 'modal-close-button-second-line');

    if (langButton.textContent == 'en') {
        modalTitle.textContent = 'Cвяжитесь с нами по этому вопросу'
    } else {
        modalTitle.textContent = 'Contact us about this issue'
    }
    
    linkTelegram.href = 'https://t.me/IPU_Manager'
    linkSkype.href = 'https://msng.link/o?live:.cid.d12352a5bb62721=sk'

    closeButton.append(closeButtonFLine, closeButtonSLine);
    linkList.append(listItemTelegram, listItemSkype, listItemWhatsApp);
    listItemTelegram.append(linkTelegram);
    listItemWhatsApp.append(linkWhatsApp);
    listItemSkype.append(linkSkype);
    modalWrapper.append(modalTitle, linkList, closeButton);
    modal.append(modalWrapper);
    document.body.append(modal);

    const modalLink = document.querySelectorAll('.modal-link-social');

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('modal--active');
    }, 10)

    closeButton.addEventListener('click', () => {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }, 200)
    })

    modalLink.forEach(elem => elem.addEventListener('click', () => {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }, 200)
    }))

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('modal--active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            }, 200)
        }
        
    })

}

export {openModal, openModalLink}