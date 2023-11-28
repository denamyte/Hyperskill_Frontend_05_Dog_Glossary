const isCorrectText = true;
const checkingText = new Promise((resolve, reject) =>
    isCorrectText && resolve("Your text is correct") || reject(false))