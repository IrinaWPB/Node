const fs = require('fs');
const axios = require('axios');
const args = process.argv;

async function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path} ${err}`);
        }
        console.log("data:", data);  
    });
}


async function webCat(url) {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.log(`Error fetching ${url} ${e}`);
    }
}

function catWrite(path, file) {
    fs.writeFile(path, file, 'utf8', err => {
        if (err) {
            console.log(err);
        }
    });
}


async function runProgram() {
    if (args.length == 3) {
        if (args[2].indexOf('.txt') == -1) {
            webCat(args[2]);
        } else {
            cat(args[2]);
        }
    } else if (args.length === 5) {
        if (args[4].indexOf('.txt') == -1) {
            catWrite(args[3], await webCat(args[4]));
        } else {  
            catWrite(args[3], await cat(args[4]));
        }  
    } else {
        console.log('Wrong amount of arguments');
    } 
}

runProgram();

    










