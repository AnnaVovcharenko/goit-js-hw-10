import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_xXyxH7n0HRCMVww7nKHL2lCzKa6dsMy194dkkAsWmEKyLUzHYXni5y8gi2WBXi1W";

const API_KEY = 'live_xXyxH7n0HRCMVww7nKHL2lCzKa6dsMy194dkkAsWmEKyLUzHYXni5y8gi2WBXi1W';
const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlCat = 'https://api.thecatapi.com/v1/images';


//Функцію, яка виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту.
function fetchBreeds() {
    return fetch(`${urlBreeds}?api_key=${API_KEY}`).then(response =>{
        if (!response.ok) {
           throw new Error (response.status);
        }
        return response.json();
    });
};

//Функцію, яка очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота - результатом запиту

function fetchCatByBreed(breedId) {
    return fetch(`${urlCat}/${breedId}?api_key=${API_KEY}`).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};
//Іменований експорт функцій
export {fetchBreeds, fetchCatByBreed};