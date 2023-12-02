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

const LISTENERS = {
    'button-random-dog': putRandomImage,
    'button-show-breed': putBreedImage,
    'button-show-sub-breed': showSubBreed,
    'button-show-all': showAllBreeds,
}

function main() {
    for (const id in LISTENERS)
        addClickListener(id, LISTENERS[id])
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
    fetchUrl(url)
        .then(src => {
            const img = document.createElement('img');
            img.src = src;
            addExclNode('content', img);
        })
        .catch(_ => showWarning && addExclNode('content', warningP(NO_BREED)))
}

async function showSubBreed() {
    let breeds = await fetchUrl(ALL_BREEDS_URL);
    const breed = getInputBreed();
    if (breed in breeds) {
        const subBreeds = breeds[breed];
        subBreeds.length && addExclNode('content', createList(subBreeds, "ol"))
            || addExclNode('content', warningP(NO_SUB_BREED))
    } else {
        addExclNode('content', warningP(NO_BREED))
    }
}

async function showAllBreeds() {
    let breeds = await fetchUrl(ALL_BREEDS_URL);
    const list = document.createElement('ol');
    for (const breed in breeds) {
        const breedEl = document.createElement('li');
        breedEl.textContent = breed;

        const subBreeds = breeds[breed];
        if (subBreeds.length) {
            breedEl.appendChild(createList(subBreeds, 'ul'));
        }
        list.appendChild(breedEl);
    }
    addExclNode('content', list)
}

/**
 * Add a node exclusively into an element.
 * @param {string} elemId The element id
 * @param {HTMLElement} node The node to be added
 */
function addExclNode(elemId, node) {
    const content = document.getElementById(elemId);
    content.innerHTML = "";
    content.append(node);
    return true;
}

async function fetchUrl(url) {
    let res = await fetch(url);
    if (res.ok) return (await res.json())['message'];
    throw new Error("The query failed");
}

function createList(arr, listTag) {
    const list = document.createElement(listTag);
    for (const item of arr) {
        list.insertAdjacentHTML('beforeend', `<li>${item}</li>`)
    }
    return list;
}

main()