const handle = msg => console.log(msg);

function hasDownloaded (value) {
    const promise = new Promise(function (resolve, reject) {
        if (value === "true") {
            resolve("Now you can watch the video!");
        } else {
            reject("Oops! An error occurs");
        }
    });

    return promise.then(handle, handle);
}
