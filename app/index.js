import parseCsv from './csvParser';
import calculate from './calculate';

const args = process.argv;
const filepath = args[2];

const data = calculate(parseCsv(filepath));
console.log(data);
