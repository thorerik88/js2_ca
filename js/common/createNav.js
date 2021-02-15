import { getFromStorage, removeFromStorage } from "../utils/storage.js";
import { tokenKey, userKey } from "../settings/key.js";



export default function createNav() {

    const home = "/index.html";

    let searchInput = "";

    // display search input if location = index.html
    if (location.pathname === home) {
        searchInput = `
        <div class="search nav-item col-1">
            <input id="search-box" placeholder="search title">
        </div>
        `;
    }

    // display "logged in" menu
    const getToken = getFromStorage(tokenKey);
    let login = "Login";
    let logoutClass = "";
    let logHref = "login";
    let addMenu = "";
    let editMenu = "";
    let welcome = "";
    const user = getFromStorage(userKey).username;

    if (getToken.length !== 0) {
        login = "Log out"
        logoutClass = "logout";
        logHref = "index";

        // create, edit and delete as logged in
        addMenu = `<a href="/add.html" class="nav-link ${location.pathname === "/add.html" ? "active" : ""}">Add</a>`;
        editMenu = `<a href="/edit.html" class="nav-link ${location.pathname === "/edit.html" ? "active" : ""}">Edit</a>`;
        welcome = `<a class="nav-link welcome">Welcome ${user}</a>`;
    }

    const container = document.querySelector(".nav");
    container.innerHTML = `
    <li class="nav-item col-1">
        <a class="nav-link ${location.pathname === home ? "active" : ""}" href="index.html">Home</a>
    </li>
    <li class="nav-item col-1">
        <a class="nav-link ${location.pathname === "/favorites.html" ? "active" : ""}" href="favorites.html">Favorites</a>
    </li>
    
    
    <!-- login menu -->
    <div class="login col-10">
            <a href="/${logHref}.html" class="nav-link ${logoutClass}${location.pathname === "/login.html" ? "active" : ""}">${login}</a>
            
            ${addMenu}
            ${welcome}
    </div>
    `;

    const logoutButton = document.querySelector(".logout");
    if (logoutButton) {
        document.querySelector(".login").classList += " reverse-order";
        logoutButton.addEventListener("click", () => {
            removeFromStorage(tokenKey);
            removeFromStorage(userKey);
        });
    }
}

