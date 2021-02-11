import { baseUrl } from "./settings/baseUrl.js";

import createNav from "./common/createNav.js";
import createHtml from "./common/createHtml.js";
import searchCards from "./common/searchCards.js";
import displayMessage from "./common/displayMessage.js";

createNav();

const message = document.querySelector(".message-container");
const input = document.querySelector("#search-box");

// load all articles upon page load
(async function() {

    const url = baseUrl + "articles/";
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        message.innerHTML = "";
        createHtml(json)

        // filter search term with article items
        input.addEventListener("keyup", (e) => {
            message.innerHTML = "";
            searchCards(json, e);
        })
    }
    catch(error) {
        displayMessage("error", "Opps, something went wrong. Error: " + error, ".message-container")
    }
})()










