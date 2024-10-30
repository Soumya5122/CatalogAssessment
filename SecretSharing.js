const fs = require('fs');

function decodeValue(base, value) {
    return BigInt(parseInt(value, base));
}

function lagrangeInterpolation(points) {
    const n = points.length;
    let secret = BigInt(0);

    for (let i = 0; i < n; i++) {
        const xi = points[i].x;
        const yi = points[i].y;

        let li = BigInt(1);
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= BigInt(-points[j].x) / BigInt(xi - points[j].x);
            }
        }
        secret += li * yi;
    }

    return secret; 
}

function findSecrets(jsonInput) {
    const data = JSON.parse(jsonInput);
    const testcases = data.testcases;

    testcases.forEach((testcase, index) => {
        const n = testcase.keys.n;
        const k = testcase.keys.k;

        const points = [];

        for (let i = 1; i <= n; i++) {
            const root = testcase[i.toString()];
            const base = parseInt(root.base);
            const value = root.value;
            const x = BigInt(i); 
            const y = decodeValue(base, value); 
            points.push({ x, y });
        }


        const secret = lagrangeInterpolation(points.slice(0, k)); 
        console.log(`Secret (c) for Test Case ${index + 1}: ${secret}`);
    });
}


function readJsonFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function main() {
    const jsonInput = readJsonFromFile('input.json');
    findSecrets(jsonInput);
}

main();