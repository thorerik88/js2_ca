import { handleStorage, getFromStorage } from "../utils/storage.js";
import handleClick from "../utils/handleClick.js";

const container = document.querySelector(".article-container");
const message = document.querySelector(".message-container");
const input = document.querySelector("#search-box");

export default function createHtml(json) {

    container.innerHTML = "";

    json.forEach((article) => {
        const fav = getFromStorage();
        let favClass = "fa-star-o";
        if (fav !== null) {
            fav.forEach((item) => {
                if (item.id === article.id) {
                    favClass = "fa-star";
                }
            }) 
        }
        container.innerHTML += `
            <div class="col-4 article">
                <h1>Title: ${article.title}</h1>
                <span class="fav-icon"><i class="fa ${favClass}" data-id="${article.id}"></i></span>
                <h2>Summary:</h2>
                <p>${article.summary}</p>
                <h2>Author:</h2>
                <p>${article.author}</p>
            </div>
        `;
    })   
        
    const favButton = document.querySelectorAll(".fav-icon");
    favButton.forEach((button) => {
        button.addEventListener("click", function(e) {
            handleClick(e.target);
            handleStorage(e.target.dataset.id)
        })
    })            
}