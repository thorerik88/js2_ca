import createNav from "./common/createNav.js";
import displayMessage from "./common/displayMessage.js";
import { baseUrl, urlKey } from "./settings/baseUrl.js";
import { tokenKey } from "./settings/key.js";
import { getFromStorage } from "./utils/storage.js";

const token = getFromStorage(tokenKey);

createNav();

// get article id
const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");

const message = document.querySelector(".message-container");
const articleId = document.querySelector("#id");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const form = document.querySelector("form");

const url = baseUrl + urlKey;

(async function() {
    articleId.value = id;

    
})()
