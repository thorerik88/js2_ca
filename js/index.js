import { baseUrl } from "./settings/baseUrl.js";

import createHtml from "./common/createHtml.js";
import displayMessage from "./common/displayMessage.js";

const message = document.querySelector(".message-container");
const input = document.querySelector("#search-box");

let newList = [];



(async function() {

    const url = baseUrl + "articles/";
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        message.innerHTML = "";
        createHtml(json)
        console.log(json)

        input.addEventListener("keyup", (e) => {
            newList = json;
            const searchValue = e.target.value.trim().toLowerCase();
            
            if (searchValue.length === 0) {
                createHtml(json)

            } else {
                const filteredArticle = newList.filter((article) => {
                    if (article.title.toLowerCase().startsWith(searchValue)) {
                        return true
                    }
                })
                newList = filteredArticle;
                if (newList.length === 0) {
                    displayMessage("warning", "No results", ".article-container");
                } else {
                    createHtml(newList)
                }
            }
   
        })
    }
    catch(error) {
        displayMessage("error", "Opps, something went wrong. Error: " + error, ".message-container")
    }
})()










