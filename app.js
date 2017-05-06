import parseCsv from './csvParser';

const args = process.argv;
const filepath = args[2];

console.info(parseCsv(filepath));
