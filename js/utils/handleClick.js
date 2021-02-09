export default function handleClick(element) {
    if (element.classList != "fa fa-star") {
        element.classList = "fa fa-star";
    } else {
        element.classList = "fa fa-star-o";
    }
}