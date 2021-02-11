import createHtml from "../common/createHtml.js";
import displayMessage from "../common/displayMessage.js";
import { baseUrl } from "../settings/baseUrl.js";

const key = "article";
let favorites = getFromStorage();

// get API id's and handle storage functions
export async function handleStorage(id) {
    const url = baseUrl + "articles/" + id;
    
    try {
        const response = await fetch(url);
        const article = await response.json();

        // check if favs is empty and blindly add to storage
        if (favorites.length === 0) {
            favorites.push(article);
            saveToStorage(favorites);
        } else {

            // return id and push article to array
            const doesExist = favorites.find(function(fav) {
                return fav.id.toString() === id;
            })
            
            if (doesExist === undefined) {
                favorites.push(article)
                saveToStorage(favorites);

            } else {
                removeFromStorage(id)
                const existingList = getFromStorage();
                if (existingList.length === 0) {
                    displayMessage("warning", "You have removed all favorites", ".message-container");
                }
                createHtml(existingList);
            }
        }
    } 
    catch(error){
        displayMessage("error", "Opps, something went wrong. Error: " + error + "<br>Please reload page", ".message-container")
    }
};

// gets all data from localStorage
export function getFromStorage() {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) {
        return value;
    }
    return [];
}

// removes data from localStorage
export function removeFromStorage(id) {
    const filteredList = favorites.filter((item) => item.id.toString() !== id)
    favorites = filteredList;
    saveToStorage(favorites);
}

// saves data to localStorage
function saveToStorage(article) {
    localStorage.setItem(key, JSON.stringify(article));
}

