import { baseUrl, urlKey } from "../settings/baseUrl.js";
import { tokenKey } from "../settings/key.js";
import { getFromStorage, updateStorage } from "./storage.js";
import displayMessage from "../common/displayMessage.js";

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");

const url = baseUrl + urlKey + id;
const token = getFromStorage(tokenKey);

export default async function updateBook(e, title, summary, author) {
    let method = "PUT";
    let data = JSON.stringify({ title: title, summary: summary, author: author });
    let buttonPressed = "edited";  

    // check if del btn is clicked and change method
    if (e.submitter.id === "delete") {
        method = "DELETE";
        data = "";
        buttonPressed = "deleted";
    }

    const options = {
        "method": method,
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await fetch(url, options);
        const details = await response.json();
        updateStorage(id)
        displayMessage("success", `Book details successfully ${buttonPressed}`, ".message-container")
    }
    catch(error) {
        displayMessage("error", "Opps, something went wrong.</br> Error: " + error, ".message-container")
    }

}