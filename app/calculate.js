
export default function (data) {
    const calculated = {};

    data.forEach((elem) => {
        if (elem.Betrag > 0) { return; }

        const recipient = elem['Beguenstigter/Zahlungspflichtiger'];
        if (calculated[recipient]) {
            calculated[recipient] = {
                total: calculated[recipient].total + elem.Betrag,
            };
        } else {
            calculated[recipient] = {
                ...calculated[recipient],
                total: elem.Betrag,
            };
        }
    });
    return calculated;
}
