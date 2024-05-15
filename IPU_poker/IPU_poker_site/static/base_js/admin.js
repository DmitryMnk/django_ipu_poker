import { openModal } from "./functons.js";

const deleteRowButtons = document.querySelectorAll('.list-item-delete-link');
const addInputButton = document.querySelectorAll('.auth__form-add-button');
const deleteInputButton = document.querySelectorAll('.auth__form-delete-button');

deleteRowButtons.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(e.target.href);
}))

addInputButton.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault();

    const addBlock = elem.parentNode.querySelector('.auth__form-block');
    const oldInput = addBlock.querySelector('.first-block-input');
    const newInput = document.createElement('input');

    newInput.name = oldInput.name;
    newInput.classList.add('auth__form-block-input');
    addBlock.append(newInput);
}))

deleteInputButton.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault();
    
    const addBlock = elem.parentNode.querySelector('.auth__form-block');
    const inputsList = addBlock.querySelectorAll('.auth__form-block-input');

    if (inputsList.length > 1) {
        addBlock.removeChild(inputsList[inputsList.length - 1]);
    }

}))