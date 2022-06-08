const parseCsv = require("./csvParser");
const calculate = require("./calculate");

const args = process.argv;
const filepath = args[2];

const data = calculate(parseCsv(filepath));
console.log(data);
