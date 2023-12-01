const RANDOM_IMG_URL = "https://dog.ceo/api/breeds/image/random";
const BREED_RANDOM_IMG = breed => `https://dog.ceo/api/breed/${breed}/images/random`;
const BREED_NOT_FOUND_P = document.createElement("p");
BREED_NOT_FOUND_P.textContent = "Breed not found!";
BREED_NOT_FOUND_P.id = "breed-warning";

function main() {
    addClickListener("button-random-dog", putRandomImage)
    addClickListener("button-show-breed", putBreedImage)
}

function addClickListener(elemId, func) {
    let elem = document.getElementById(elemId);
    elem && elem.addEventListener("click", func);
}

function putRandomImage() {
    putImage(RANDOM_IMG_URL)
}

function putBreedImage() {
    const breed = document.getElementById("input-breed").value.toLowerCase();
    putImage(BREED_RANDOM_IMG(breed), true)
}

/**
 *
 * @param {string} url - The url to fetch an image from
 * @param {boolean} showWarning - A flag, whether to show a warning if the fetch method fails
 */
function putImage(url, showWarning = false) {
    fetch(url)
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error("The response failed")
        })
        .then(json => {
            const img = document.createElement("img");
            img.src = json['message'];
            addExclNode("content", img)
        })
        .catch(_ => showWarning && addExclNode("content", BREED_NOT_FOUND_P))
}

/**
 * Add a node exclusively into an element.
 * @param {string} elemId The element id
 * @param {Node} node The node to be added
 */
function addExclNode(elemId, node) {
    const content = document.getElementById(elemId);
    content.innerHTML = "";
    content.append(node)
}

main()