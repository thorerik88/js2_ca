import createHtml from "./common/createHtml.js";
import displayMessage from "./common/displayMessage.js";
import { getFromStorage } from "./utils/storage.js"

const message = document.querySelector(".message-container");

// get existing favorites on page load
(async function() {
    const favorites = getFromStorage();
    message.innerHTML = "";

    // display message if favs is empty
    if (favorites.length === 0) {
        displayMessage("warning", "No favorites added", ".message-container");
    } else {
        createHtml(favorites)
    }
    
})()




