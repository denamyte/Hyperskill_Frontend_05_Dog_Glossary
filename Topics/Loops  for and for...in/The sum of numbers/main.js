function* seq(cap) {
    let counter = 1;
    while (counter <= cap) yield counter++;
}

const sum = (...args) => args.reduce((a, b) => a + b);

const seq100 = seq(100);

console.log(sum(...seq100));