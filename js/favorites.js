import createHtml from "./common/createHtml.js";
import createNav from "./common/createNav.js";
import displayMessage from "./common/displayMessage.js";
import { articleKey } from "./settings/key.js";
import { getFromStorage, clearAllFavs } from "./utils/storage.js"

createNav();
const message = document.querySelector(".message-container");
const clearButton = document.querySelector(".clear-button");

// get existing favorites on page load
(async function() {
    const favorites = getFromStorage(articleKey);
    message.innerHTML = "";

    // display message if favs is empty
    if (favorites.length === 0) {
        clearButton.style.display = "none";
        displayMessage("warning", "No favorites added", ".message-container");
    } else {
        createHtml(favorites)
    }
    
})()


clearButton.addEventListener("click", () => {
    clearAllFavs(articleKey);
    document.querySelector(".article-container").innerHTML = "";
    displayMessage("success", "All favorites cleared", ".message-container");
    clearButton.style.display = "none";
})
