const RANDOM_IMG_URL = "https://dog.ceo/api/breeds/image/random";
const ALL_BREEDS_URL = " https://dog.ceo/api/breeds/list/all";
const NO_BREED = "Breed not found!";
const NO_SUB_BREED = "No sub-breeds found!";
const warningP = text => {
    const p = document.createElement('p');
    p.id = 'breed-warning';
    p.textContent = text;
    return p;
}
const randomImgUrl = breed => `https://dog.ceo/api/breed/${breed}/images/random`;
const subBreedUrl = breed => `https://dog.ceo/api/breed/${breed}/list`;
const getInputBreed = () => document.getElementById('input-breed').value.toLowerCase();

function main() {
    addClickListener('button-random-dog', putRandomImage)
    addClickListener('button-show-breed', putBreedImage)
    addClickListener('button-show-sub-breed', showSubBreed)
}

function addClickListener(elemId, func) {
    let elem = document.getElementById(elemId);
    elem && elem.addEventListener('click', func);
}

function putRandomImage() {
    putImage(RANDOM_IMG_URL)
}

function putBreedImage() {
    const breed = getInputBreed();
    putImage(randomImgUrl(breed), true)
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
            else throw new Error("The response failed");
        })
        .then(json => {
            const img = document.createElement('img');
            img.src = json['message'];
            addExclNode('content', img);
        })
        .catch(_ => showWarning && addExclNode('content', warningP(NO_BREED)))
}

/**
 * Add a node exclusively into an element.
 * @param {string} elemId The element id
 * @param {Node} node The node to be added
 */
function addExclNode(elemId, node) {
    const content = document.getElementById(elemId);
    content.innerHTML = "";
    content.append(node);
    return true;
}

async function showSubBreed() {
    const res = await fetch(ALL_BREEDS_URL);
    const json = await res.json();
    const breeds = json['message'];
    const breed = getInputBreed();
    if (breed in breeds) {
        const subBreeds = breeds[breed];
        subBreeds.length && addExclNode('content', orderedList(subBreeds))
            || addExclNode('content', warningP(NO_SUB_BREED))
    } else {
        addExclNode('content', warningP(NO_BREED))
    }
}

function orderedList(arr) {
    const list = document.createElement('ol');
    for (const item of arr) {
        list.insertAdjacentHTML('beforeend', `<li>${item}</li>`)
    }
    return list;
}

main()