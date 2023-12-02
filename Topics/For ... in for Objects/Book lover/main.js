let library = {
    books: {
        "first": "Brothers Karamazov",
        "second": "The Catcher in the Rye"
    }
};
for (let object in library) {
    for (let name in library[object]) {
        console.log(library[object][name])
    }
}