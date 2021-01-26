import * as UI from './selectores.js';
import API from './api.js';

UI.formulario.addEventListener('submit', getData)


function getData(e){
    e.preventDefault();

    const category = document.querySelector('#categorias').value;
    const difficulty = document.querySelector('#dificultad').value;
    const type = document.querySelector('#type').value;

    if(category === '' || difficulty === '' || type === ''){
        alertaError('All the fields must be filled');
        return;
    }

    const dataAPI = new API(category, difficulty, type);
    dataAPI.runAPI();
}

export function alertaError(msj){
    const alertaError = document.createElement('div');
    alertaError.classList.add('container','text-center','my-4','text-danger', 'fw-bold','border-3', 'fs-4');
    
    alertaError.innerHTML =`
        <span>${msj}</span>
    `;

    UI.container.appendChild(alertaError)
    //(alertaError);

    setTimeout(() => {
        alertaError.remove();
    }, 2000);

}

/*
const categoria = document.querySelector('#categorias');
categoria.addEventListener('change', valorCat);

function valorCat(){
    console.log(categoria).value;
}*/