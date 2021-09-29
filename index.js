module.exports = apply;
module.exports.create = create;
module.exports.validate = validate;
module.exports.formatType = formatType;

const AllFormatType = {
    8: 'GTIN-8',
    12: 'GTIN-12',
    13: 'GTIN-13',
    14: 'GTIN-14',
    17: 'GSIN',
    18: 'SSCC'
};

/**
 * Same as create() but return GS1 key with check digit. 
 * @param {String} str GS1 key without check digit.
 * @returns GS1 Key with check digit. Return 'INVALID' if the str is not GS1 format.
 */
function apply(str) {
    if (!isGs1Format(str.length + 1)) return 'INVALID';
    return str + create(str);
}

/**
 * Calulate the check digit.
 * 
 * @param {String} str GS1 key without check digit
 * @returns A number within or equal to -1 to 9. If the str is not GS1 format returns -1.
 */
function create(str) {
    var multiplyBy3 = true;
    var sum = 0;

    // make sure the str is GS1 format
    if (!isGs1Format(str.length + 1)) return -1;

    // Looping from the last number of str to calculate the sum.
    for (let index = str.length - 1; index >= 0; index--) {
        var val = parseInt(str.charAt(index), 10);
        if (multiplyBy3) {
            sum += val * 3;
        } else {
            sum += val;
        }
        multiplyBy3 = !multiplyBy3;
    }
    return (10 - (sum % 10)) % 10;
}

/**
 * Validate GS1 Key
 * @param {String} str GS1 Key with check digit
 * @returns Boolean
 */
function validate(str) {
    if (!isGs1Format(str.length)) return false;
    var val = str.substr(0, str.length - 1);
    return apply(val) === str;
}

/**
 * Validate and get GS1 format type of str
 * @param {String} str GS1 key
 * @returns GTIN-8 | GTIN-12 | GTIN-13 | GTIN-14 | GSIN | SSCC | INVALID
 */
function formatType(str) {
    return validate(str) ? AllFormatType[str.length] : 'INVALID';
}

/**
 * Make sure the str is in GS1 format
 * @param {String} str GS1 Key
 * @returns Boolean
 */
function isGs1Format(length) {
    val = AllFormatType[length];
    return val !== undefined;
}
