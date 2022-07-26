const util = require('util');
exec = util.promisify(require('child_process').exec);

async function execAndPrint(cmd) {
    const { stderr, stdout } = await exec(cmd);
    console.log(stdout);
    console.error(stderr);
}

async function addCommitToDate(path, date, content, commitMessage) {
    const dateStr = date.toISOString();

    const editCmd = `cd ${path} && echo "${content}" >> content.txt`;
    const commitCmd = `cd ${path} && git add . && git commit -am "${commitMessage}"`
    const commitUpdateCmd = `GIT_COMMITTER_DATE='${dateStr}' cd ${path} && git commit --amend --date='${dateStr}' --no-edit`

    await execAndPrint(editCmd);
    await execAndPrint(commitCmd);
    await execAndPrint(commitUpdateCmd);
}

exports.addCommitToDate = addCommitToDate;