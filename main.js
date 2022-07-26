const { addCommitToDate } = require('./git-util');
const { stringToDates } = require ('./date-encode');

const path = '/home/ahoydave/projects/github-secret-message/test2'
const startDate = '2014-01-12T12:00:00';

const dates = stringToDates(new Date(startDate), 'HI THERE');
dates.forEach(x => console.log(x));

async function datesToCommits(path, dates) {
    for (const date of dates) {
        await addCommitToDate(path, date, '1', '1');
    }
}

datesToCommits(path, dates).then(() => {
    console.log('Done!');
});