import createHtml from "../common/createHtml.js";
import displayMessage from "../common/displayMessage.js";
import { baseUrl, urlKey } from "../settings/url.js";
import { articleKey, tokenKey, userKey } from "../settings/key.js";

let favorites = getFromStorage(articleKey);

// get API id's and handle storage functions
export async function handleStorage(id) {
    const url = baseUrl + urlKey + id;
    
    try {
        const response = await fetch(url);
        const article = await response.json();

        // check if favs is empty and blindly add to storage
        if (favorites.length === 0) {
            favorites.push(article);
            saveToStorage(articleKey, favorites);
        } else {

            // return id and push article to array
            const doesExist = favorites.find(function(fav) {
                return fav.id.toString() === id;
            })
            
            if (doesExist === undefined) {
                favorites.push(article)
                saveToStorage(articleKey, favorites);

            } else {

                // remove article from local storage and make sure html is rendered again only in favorites
                updateStorage(id)
                const existingList = getFromStorage(articleKey);
                const pathname = "/favorites.html";

                if (existingList.length === 0 && location.pathname === pathname) {
                    displayMessage("warning", "You have removed all favorites", ".message-container");
                    document.querySelector(".clear-button").style.display = "none";
                }
                if (location.pathname === pathname) {
                    createHtml(existingList);
                }
            }
        }
    } 
    catch(error){
        displayMessage("error", "Opps, something went wrong. Error: " + error + "<br>Please reload page", ".message-container")
    }
};


// gets all data from localStorage
export function getFromStorage(key) {

    const value = JSON.parse(localStorage.getItem(key));
    if (value) {
        return value;
    }
    return [];
}

// removes data from localStorage
export function updateStorage(id) {
    const filteredList = favorites.filter((item) => item.id.toString() !== id)
    favorites = filteredList;
    saveToStorage(articleKey, favorites);
}

export function removeFromStorage(key) {
    localStorage.removeItem(key);
}

export function saveToken(value) {
    saveToStorage(tokenKey, value)
}

export function saveUser(value) {
    saveToStorage(userKey, value);
}

// saves data to localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// clear all data
export function clearAllFavs(key) {
    localStorage.removeItem(key);
}

