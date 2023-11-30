const RANDOM_IMG_URL = "https://dog.ceo/api/breeds/image/random";

function main() {
    addListeners();
}

function addListeners() {
    let btn = document.getElementById("button-random-dog");
    btn && btn.addEventListener("click", putRandomImage);
}

function putRandomImage() {
    fetch(RANDOM_IMG_URL)
        .then(response => response.json())
        .then(json => {
            const imageUrl = json['message']
            const img = document.querySelector("#content > img");
            img.setAttribute("src", imageUrl)
        })
        .catch(error => console.log(error))
}

main()