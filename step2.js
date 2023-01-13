const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path} ${err}`);
            process.exit(1);
        }
        console.log(data); 
    });
}

function webCat(url) {
    const res = axios.get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(`Error fetching ${url} ${err}`));
}

if (process.argv[2]) {
    if (process.argv[2].indexOf('.txt') == -1) {
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    }
}
