import fs from 'fs';

export default function parseCsv(filepath) {
    let keys = [];
    const data = [];

    fs.readFileSync(filepath).toString().split('\n').forEach((line, i) => {
        const entriesForLine = line.split(';').map((entry) => entry.replace(/['"]+/g, '', ''));
        if (i === 0) {
            keys = entriesForLine;
        } else {
            data.push(rowToObject(entriesForLine, keys))
        }
    });
    return data;
}

function rowToObject(row, keys) {
    const rowObject = {};
    row.forEach((entry, i) => {
        rowObject[keys[i]] = entry
    });
    return rowObject;
}