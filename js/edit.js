import createNav from "./common/createNav.js";
import updateBook from "./utils/updateBook.js";
import displayMessage from "./common/displayMessage.js";
import { baseUrl, urlKey } from "./settings/baseUrl.js";

createNav();

// get article id
const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");

if (!id) {
    location.href = "/index.html";
}

const url = baseUrl + urlKey + id;
const message = document.querySelector(".message-container");
const articleId = document.querySelector("#id");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const form = document.querySelector("form");




(async function() {
    articleId.value = id;
    try {
        const response = await fetch(url);
        const json = await response.json();

        title.value = json.title;
        summary.value = json.summary;
        author.value = json.author;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (e.submitter.id === "delete") {
                const confirmIt = confirm("Are you sure?");

                if (confirmIt) {
                    updateBook(e, title.value, summary.value, author.value)
    
                    title.value = "";
                    summary.value = "";
                    author.value = "";
                }
                
            } else {
                updateBook(e, title.value, summary.value, author.value)
            }
            

            
        })
    }
    catch(error) {
        console.log(error)
    }
    

})()



