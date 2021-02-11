export default function displayMessage(classType, message, targetElement) {
    const output = document.querySelector(targetElement);
    output.innerHTML = `<div class="message ${classType}">${message}</div>`;
}