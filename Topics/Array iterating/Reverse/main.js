function reverse(arr) {
    let res = [];
    for (let item of arr) {
        res.unshift(item)
    }
    return res;
}