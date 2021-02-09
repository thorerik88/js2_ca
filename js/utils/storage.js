import { baseUrl } from "../settings/baseUrl.js";

const key = "article";
let favorites = getFromStorage();

export async function handleStorage(id) {
    const url = baseUrl + "articles/" + id;
    
    try {
        const response = await fetch(url);
        const article = await response.json();

        if (favorites.length === 0) {
            favorites.push(article);
            saveToStorage(favorites);
        } else {
            const doesExist = favorites.find(function(fav) {
                return fav.id.toString() === id;
            })
            if (doesExist === undefined) {
                favorites.push(article)
                saveToStorage(favorites);
            } else {
                removeFromStorage(id)
            }
        }
    } 
    catch(error){
        console.log(error)
    }
};

export function getFromStorage() {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) {
        return value;
    }
    return [];
}

function saveToStorage(article) {
    localStorage.setItem(key, JSON.stringify(article));
}

function removeFromStorage(id) {
    const filteredList = favorites.filter((item) => item.id.toString() !== id)
    favorites = filteredList;
    saveToStorage(favorites);
}