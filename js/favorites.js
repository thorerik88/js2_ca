import createHtml from "./common/createHtml.js";
import createNav from "./common/createNav.js";
import displayMessage from "./common/displayMessage.js";
import { articleKey } from "./settings/key.js";
import { getFromStorage } from "./utils/storage.js"


createNav();
const message = document.querySelector(".message-container");

// get existing favorites on page load
(async function() {
    const favorites = getFromStorage(articleKey);
    message.innerHTML = "";
    // display message if favs is empty
    if (favorites.length === 0) {
        displayMessage("warning", "No favorites added", ".message-container");
    } else {
        createHtml(favorites)
    }
    
})()




