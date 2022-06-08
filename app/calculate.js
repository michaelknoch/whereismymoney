function calculate(data) {
    const groupedData = groupDataByCategory(data);
    return {
        groupedData,
        total: sumTotal(groupedData),
    };
}

function sumTotal(data) {
    let sum = 0;
    Object.keys(data).forEach((elem) => {
        sum += data[elem].total;
    });
    return sum;
}

function groupDataByCategory(data) {
    const groupedData = {};

    data.forEach((object) => {
        if (!object || !object["Beguenstigter/Zahlungspflichtiger"] || object.Betrag > 0) {
            return;
        }

        const group =
            getCategoryByCompany(object["Verwendungszweck"]) ??
            getCategoryByCompany(object["Beguenstigter/Zahlungspflichtiger"]) ??
            object["Beguenstigter/Zahlungspflichtiger"];

        if (groupedData[group]) {
            groupedData[group] = {
                total: groupedData[group].total + object.Betrag,
                detail: [...groupedData[group].detail, object],
            };
        } else {
            groupedData[group] = {
                total: object.Betrag,
                detail: [object],
            };
        }
    });
    return groupedData;
}

const categories = {
    lebensmittel: ["edeka", "kaufland", "rewe", "lidl", "aldi"],
    wohnung: ["ikea", "depot", "butlers"],
    fix: ["Telefonica Germany", "BVG", "Michael Knoch", "Telekom"],
    outfit: ["KARSTADT", "H&M", "Pull&Bear", "zalando"],
    reisen: ["DB Vertrieb"],
    paypal: ["PayPal"],
    amazon: ["amazon"],
    sparkasse: ["sparkasse"],
    kreditkarte: ["KREDITKARTENABRECHNUNG"],
};

function getCategoryByCompany(string = "") {
    for (const key of Object.keys(categories)) {
        for (const brand of categories[key]) {
            if (string.toLowerCase().includes(brand.toLowerCase())) {
                return key;
            }
        }
    }
}

module.exports = calculate;
