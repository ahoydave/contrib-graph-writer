const { addCommitToDate } = require('./git-util');
const { stringToDates } = require ('./date-encode');

if (process.argv.length != 6) {
    console.log("Wrong number of args. Usage is\nnode main.js <path> <startDate> <message> <numCommitsPerDate>\n");
    process.exit(1);
}

const [ , , path, startDateStr, message, numCommitsPerDateStr] = process.argv;

const numCommitsPerDate = Number.parseInt(numCommitsPerDateStr);

if (startDateStr.match(/^\d{4}-\d{2}-\d{2}$/) == null) {
    console.log('Date format wrong. E.g. 2014-01-12\n');
    process.exit(1);
}
const startDate = new Date(startDateStr + 'T12:00:00');

const dates = stringToDates(startDate, message);

console.log('Adding commits for the following dates');
dates.forEach(x => console.log(x));

async function makeCommitsOnDates(path, dates) {
    for (const date of dates) {
        for (let i=0; i<numCommitsPerDate; i++) {
            await addCommitToDate(path, date, i, i);
        }
    }
}

makeCommitsOnDates(path, dates).then(() => {
    console.log('Commits done! Now just push that repo to github and hope for the best!');
});