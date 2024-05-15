class Preloader {

    constructor() {
        this.back =  document.createElement('div');
        this.circle = document.createElement('div');

        this.back.classList.add('preloader-back');
        this.circle.classList.add('preloader-circle');
        this.back.append(this.circle);
    }

    addTo(parentBlock) {
        console.log('asd')
        this.parent = parentBlock
        this.parent.append(this.back);
        this.back.classList.add('preloader--active');
    }

    remove() {
        this.back.classList.remove('preloader--active');
        setTimeout(() => {
            this.parent.removeChild(this.back);
        }, 200)
    }   
}

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

function preloader(parBlock) {
    const back =  document.createElement('div');
    const circle = document.createElement('div');


}

function openModalLink() {
    const langButton = document.querySelector('.header__language-button')
    const modalLink = document.querySelectorAll('.modal-link-social');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-title')
    const closeButton = document.querySelector('.modal-close-button')

    if (langButton.textContent == 'en') {
        modalTitle.textContent = 'Cвяжитесь с нами по этому вопросу'
    } else {
        modalTitle.textContent = 'Contact us about this issue'
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('modal--active');
    }, 10)

    closeButton.addEventListener('click', () => {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200)
    })

    modalLink.forEach(elem => elem.addEventListener('click', () => {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200)
    }))

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('modal--active');
            setTimeout(() => {
                modal.style.display = 'none';

            }, 200)
        }
        
    })

}

export {openModal, openModalLink, Preloader}