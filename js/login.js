import { baseUrl } from "./settings/url.js";

import createNav from "./common/createNav.js";
import displayMessage from "./common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";

createNav();

const message = document.querySelector(".message-container");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

message.innerHTML = "";


form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;

    // simple email and pass val

    if (emailValue.length > 3 && passwordValue.length > 1) {
        loginRequest(emailValue, passwordValue);
    } else {
        displayMessage("warning", "Both fields must be filled out", ".message-container");
    }
}

async function loginRequest(email, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: email, password: password})

    const options = {
        "method": "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        }
    }

    try {
        const response = await fetch(url, options)
        const json = await response.json();

        // save credentials if response
        if (json.user) {
            saveToken(json.jwt);
            saveUser (json.user);
            location.href = "/index.html";
        } else {
            displayMessage("warning", "Invalid email and/or password", ".message-container");
        }
    }
    catch(error) {
        displayMessage("error", "Opps, something went wrong.</br> Error: " + error, ".message-container")
    }

}
