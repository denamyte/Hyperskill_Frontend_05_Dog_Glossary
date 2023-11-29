// You can experiment here, it won’t be checked
async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}

async function main() {
    try {
        const data = await getData('https://example.com/api/data');
        console.log(data);
    } catch (error) {
        console.error('Data retrieval failed: ', error);
    }
}

main();
