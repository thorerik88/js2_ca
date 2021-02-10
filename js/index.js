import { baseUrl } from "./settings/baseUrl.js";
import { handleStorage, getFromStorage } from "./utils/storage.js";
import handleClick from "./utils/handleClick.js";


const container = document.querySelector(".article-container");
const message = document.querySelector(".message-container");
const input = document.querySelector("#search-box");

let search = false;

// retrieve API on page load
(async function() {
    const url = baseUrl + "articles/";
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        message.innerHTML = "";

        json.forEach((article) => {

            createHtml(article, false);

            

            input.addEventListener("keyup", (e) => {
                const inputValue = e.target.value;

                if (inputValue.length === 0) {
                    createHtml(article, false)
                }

                if (inputValue.length > 0 && article.title.toLowerCase().startsWith(inputValue.trim().toLowerCase())) {
                    createHtml(article, true);
                } 
            })
        })
        
        const favButton = document.querySelectorAll(".fav-icon");
        favButton.forEach((button) => {
            button.addEventListener("click", function(e) {
                handleClick(e.target);
                handleStorage(e.target.dataset.id)
            })
        })
        

       

    }
    catch(error) {

    }
})();

function createHtml(article, search) {

    const fav = getFromStorage();
            let favClass = "fa fa-star-o";
            if (fav !== null) {
                fav.forEach((item) => {
                    if (item.id === article.id) {
                        favClass = "fa fa-star";
                    }
                }) 
            }
            
            if (search === false) {
                container.innerHTML += `
                    <div class="col-4 article">
                        <h1>Title: ${article.title}</h1>
                        <span class="fav-icon"><i class="${favClass}" data-id="${article.id}"></i></span>
                        <h2>Summary:</h2>
                        <p>${article.summary}</p>
                        <h2>Author:</h2>
                        <p>${article.author}</p>
                    </div>
                `;
            } 
            if (search === true) {
                container.innerHTML = `
                    <div class="col-4 article">
                        <h1>Title: ${article.title}</h1>
                        <span class="fav-icon"><i class="${favClass}" data-id="${article.id}"></i></span>
                        <h2>Summary:</h2>
                        <p>${article.summary}</p>
                        <h2>Author:</h2>
                        <p>${article.author}</p>
                    </div>
                `;
            }

            
}