const util = require('util');
exec = util.promisify(require('child_process').exec);

async function execAndPrint(cmd) {
    const { stderr, stdout } = await exec(cmd);
    console.log(stdout);
    console.error(stderr);
}

async function addCommitToDate(path, dateStr) {

    const editCmd = `cd ${path} && echo "2" > content.txt`;
    const commitCmd = `cd ${path} && git commit -am "2"`
    const commitUpdateCmd = `GIT_COMMITTER_DATE='${dateStr}' cd ${path} && git commit --amend --date='${dateStr}' --no-edit`

    await execAndPrint(editCmd);
    await execAndPrint(commitCmd);
    await execAndPrint(commitUpdateCmd);
}

const path = '/home/ahoydave/projects/github-secret-message/test1'

// doStuff('2014-01-02T12:00:00').then(() => {
//     console.log('Done!');
// });

const { drawAll, drawChar, pixelAtPos } = require('./font');
// drawAll();
drawChar(65);

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

writeEncoded(charToEncoded(65));
console.log('Zs'.charCodeAt(0));
writeEncoded(stringToEncoded('hi mike'));