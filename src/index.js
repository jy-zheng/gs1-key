export default function isUPC(code) {
    MAX_UPC = 999999999999;
    if (code > MAX_UPC) return false;

    inputCheckDigit = code % 10;
    code = Math.floor(code / 10);
    oddSum = 0;
    evenSum = 0;
    for (let index = 11; index >= 1; index--) {
        index % 2 === 0 ? evenSum += Math.round(code % 10) : oddSum += Math.round(code % 10);
        code = Math.floor(code / 10);
    }

    calcCheckDigit = (10 - ((evenSum + 3 * oddSum) % 10)) % 10;

    return inputCheckDigit === calcCheckDigit;
}