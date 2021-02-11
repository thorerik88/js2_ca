import createHtml from "./createHtml.js";

import displayMessage from "./displayMessage.js";
let newList = [];

export default function searchCards(json, e) {
    newList = json;
    const searchValue = e.target.value.trim().toLowerCase();
    
    // make sure to reload articles if search term is empty
    if (searchValue.length === 0) {
        createHtml(json)

    } else {
        // compare search term with articles and return boolean
        const filteredArticle = newList.filter((article) => {
            if (article.title.toLowerCase().startsWith(searchValue)) {
                return true
            }
        })

        // create new list, based on filter
        newList = filteredArticle;
        if (newList.length === 0) {
            document.querySelector(".article-container").innerHTML = "";
            displayMessage("warning", "No results", ".message-container");
        } else {
            createHtml(newList)
        }
    }
}