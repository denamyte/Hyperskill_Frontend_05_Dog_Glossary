function loader(value) {
    const promise = new Promise(function(resolve, reject){
        if (value === "true"){
            resolve();
        } else {
            reject();
        }
    });

    return promise
        .then(() => console.log("The info has loaded."))
        .catch(() => console.log("Please, try again later."))
        .finally(() => console.log("Hello, Mr. Smith!"));
}