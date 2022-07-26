const { drawAll, drawChar, pixelAtPos } = require('./font');

function writeEncoded(arr) {
    let line = '';
    for (let i = 0; i < arr.length; i++) {
        if (i % 7 == 0) {
            console.log(line);
            line = '';
        }
        line += (arr[i] ? 'X' : '-');
    }
    console.log(line);
}

function charToEncoded(c) {
    const encoded = [];
    for (let x = 0; x < 5; x++) {
        encoded.push(false);
        for (let y = 0; y < 5; y++) {
            encoded.push(pixelAtPos(c, x, y));
        }
        encoded.push(false);
    }
    return encoded;
}

function stringToEncoded(s) {
    const encoded = [];
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        encoded.push(...charToEncoded(c))
        encoded.push(...Array(7).fill(false));
    }
    return encoded;
}

// writeEncoded(charToEncoded(65));
// console.log('Zs'.charCodeAt(0));
// writeEncoded(stringToEncoded('all your base'));

const addDate = require('date-fns/add');
let d = new Date();

function encodedToDates(firstDate, encoded) {
    const dates = [];
    let currDate = firstDate;
    for (draw of encoded) {
        if (draw) {
            dates.push(currDate);
        }
        currDate = addDate(currDate, { days: 1 });
    }
    return dates;
}

function stringToDates(firstDate, str) {
    return encodedToDates(firstDate, stringToEncoded(str));
}

exports.stringToDates = stringToDates;