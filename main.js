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

const { drawAll, drawChar } = require('./font');
// drawAll();
drawChar(65);
console.log('A'.charCodeAt(0));