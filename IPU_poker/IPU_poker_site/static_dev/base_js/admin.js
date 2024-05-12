import { openModal } from "./functons.js";

const deleteRowButtons = document.querySelectorAll('.list-item-delete-link')


deleteRowButtons.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(e.target.href);
}))