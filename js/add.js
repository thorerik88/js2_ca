import createNav from "./common/createNav.js";
import displayMessage from "./common/displayMessage.js";
import { baseUrl } from "./settings/baseUrl.js";
import { tokenKey } from "./settings/key.js";
import { getFromStorage } from "./utils/storage.js";

const token = getFromStorage(tokenKey);
if (token.length === 0) {
    location.href = "/index.html";
}

createNav();

const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const form = document.querySelector("form");

const url = baseUrl + "cats";

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const summaryValue = summary.value.trim();
    const authorValue = author.value.trim();
    
    if (titleValue.length === 0 || summaryValue.length === 0 || authorValue.length === 0) {
        return displayMessage("warning", "All fields must be filled out", ".message-container");
    }

    addBook(titleValue, summaryValue, authorValue)

}

async function addBook(title, summary, author) {

    const data = JSON.stringify({ title: title, summary: summary, author: author })
    
    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    try {
        const response = await fetch (url, options);
        const results = await response.json();

        if (results.created_at) {
            displayMessage("success", "Book added", ".message-container");
        } else {
            displayMessage("warning", "Oops, something went wrong", ".message-container");
        }
    }

    catch(error) {
        displayMessage("error", "Opps, something went wrong.</br> Error: " + error, ".message-container")
    }
}