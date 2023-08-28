import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_xXyxH7n0HRCMVww7nKHL2lCzKa6dsMy194dkkAsWmEKyLUzHYXni5y8gi2WBXi1W";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { fetchBreeds,fetchCatByBreed } from "./cat-api";

// масив порід , індифікатор породи
const ref = {
    select : document.querySelector('.breed-select'),// breedSelect 
    loader : document.querySelector('.loader'),
    error : document.querySelector('.error'),
    catInfo : document.querySelector('.cat-info'),
    catPic : document.querySelector('.cat-info-pict'),
    catDesc : document.querySelector('.cat-info-desc')
}
ref.select.addEventListener('change', onChangeSelect);
//Функція, що генерує розмітку випадаючого списку
function renderSelect (breeds){
    const markup = breeds
    .map(breed => {
        return `<option value='${breed.reference_image_id}'>${breed.name}</option>`;
    })
    .join('');
    ref.select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
        select: '#single', //Ініціалізація бібліотеки
    });
};

//Функція, що отримує дані та на їх основі створює розмітку випадаючого списку

(function fetchBreedsRender () {
    ref.loader.classList.remove('unvisible')
    fetchBreeds()
    .then(breeds => renderSelect (breeds)) //Функція, що генерує розмітку випадаючого списку
    .catch(error => {
        console.log(error);
        Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'   
        );
    })
    .finally(() => {
        ref.loader.classList.add('unvisible');
        ref.select.classList.remove('unvisible');
    });
})();
//Функція, що генерує розмітку опису обраної породи кота (картинка та текст)
function renderDesc (breed) {
    const picture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
    const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
    ref.catPic.insertAdjacentHTML('beforeend', picture);
    ref.catDesc.insertAdjacentHTML('beforeend', descript);
};
//Функція, яка виконується 
//при виборі породи кота у списку (подія change на селекті)

function onChangeSelect(e) {
    ref.loader.classList.remove('unvisible');
    ref.catPic.innerHTML = '';
    ref.catDesc.innerHTML = '';
     const breedId = e.target.value;
     console.log('breedId: ', breedId);
     fetchCatByBreed (breedId)
     .then(breed => renderDesc(breed)) //Функція, що генерує розмітку опису обраної породи кота (картинка та текст)
     .catch (error => {
        console.log(error);
        Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'    
        );
     })
     .finally(() => ref.loader.classList.add ('unvisible'));
}







