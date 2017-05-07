
export default function (data) {
    return groupDataByCategory(groupDataByCompany(data));
}

function groupDataByCompany(data) {
    const groupedData = {};

    data.forEach((elem) => {
        if (elem.Betrag > 0 || !elem['Beguenstigter/Zahlungspflichtiger']) { return; }

        const recipient = elem['Beguenstigter/Zahlungspflichtiger'];
        if (groupedData[recipient]) {
            groupedData[recipient] = {
                ...groupedData[recipient],
                total: groupedData[recipient].total + elem.Betrag,
            };
        } else {
            groupedData[recipient] = {
                ...elem,
                total: elem.Betrag,
            };
        }
    });
    return groupedData;
}

export function groupDataByCategory(data) {
    const groupedData = {};

    Object.keys(data).forEach((key) => {
        const object = data[key];
        const group = getCategoryByCompany(object['Beguenstigter/Zahlungspflichtiger']);
        if (groupedData[group]) {
            groupedData[group] = {
                total: groupedData[group].total + object.total,
                detail: [...groupedData[group].detail, object],
            };
        } else {
            groupedData[group] = {
                total: object.total,
                detail: [object],
            };
        }
    });
    return groupedData;
}


export function getCategoryByCompany(string = '') {
    const categories = {
        lebensmittel: ['edeka', 'kaufland', 'rewe', 'lidl', 'aldi'],
        wohnung: ['ikea, depot', 'butlers'],
        fix: ['Telefonica Germany', 'BVG', 'Michael Knoch'],
        outfit: ['KARSTADT', 'H&M', 'Pull&Bear', 'zalando'],
        paypal: ['PayPal'],
        amazon: ['amazon'],
        sparkasse: ['sparkasse'],
        kreditkarte: ['KREDITKARTENABRECHNUNG'],
    };

    const keys = Object.keys(categories);
    for (const key of keys) {
        for (const brand of categories[key]) {
            if (string.toLowerCase().includes(brand.toLowerCase())) return key;
        }
    }
    return string;
}
