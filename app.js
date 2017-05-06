import fs from 'fs';
import csv from 'csvtojson';

const args = process.argv;
const filepath = args[2];

csvToJson(filepath).then((jsonData) => {
    console.info(jsonData);
});

function csvToJson(filepath) {
    const rows = [];
    return new Promise((resolve, reject) => {
        csv()
            .fromFile(filepath)
            .on('json', (json) => {
                rows.push(json);
            })
            .on('done', (error) => {
                console.log('end')
                resolve(rows);
            })
    })
}
