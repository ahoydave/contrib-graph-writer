const { addCommitToDate } = require('./commit');
const { drawAll, drawChar, pixelAtPos } = require('./font');

// drawAll();
// drawChar(65);

const path = '/home/ahoydave/projects/github-secret-message/test2'

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

const dates = encodedToDates(new Date('2014-01-12T12:00:00'), stringToEncoded('HI THERE'));
dates.forEach(x => console.log(x));

async function datesToCommits(path, dates) {
    for (const date of dates) {
        await addCommitToDate(path, date, '1', '1');
    }
}

datesToCommits(path, dates).then(() => {
    console.log('Done!');
});