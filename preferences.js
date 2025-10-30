const { Parser } = require('nearley');
const grammar = require('./parser');

/* Like listPreferences(), but first parses the string. */
export function parseAndListPreferences(input, alreadyTaken=[]) {
    const parser = new Parser(grammar);
    parser.feed(input);

    if (!parser.results[0]) {
        throw new Error('Parser error');
    } else if (parser.results.length !== 1) {
        throw new Error('Ambiguous grammar');
    }

    const preferences = parser.results[0];
    return listPreferences(preferences, alreadyTaken);
}

/*
 * Taking a list of preference objects from the parser,
 * generate a list of acceptable slots based on the given rules.
 *
 * "preferences" is a list, where each item is one of the following:
 *   - an integer
 *   - a pattern object, { order: 'highest' | 'lowest', fixed: bool, pattern: [ 0..9 | null ] }
 *
 * For a pattern object, the order determines whether you count from 0 -> 9, or 9 -> 0.
 * A pattern is a list of digits, so "9X00" (numbers divisible by 100) would be [9, null, 0, 0].
 * Such lists are guaranteed to have at least one null.
 *
 * The "fixed" flag means that all digits share the same value.
 * So [9, null, null, 0] can produce 9110, 9220, 9330, etc.
 * But if the flag is false, then it goes numerically, 9010, 9020, 9030, etc.
 */
export function listPreferences(preferences, alreadyTaken=[]) {
    const used = new Set(alreadyTaken);
    const output = [];

    function emit(number) {
        if (!used.has(number)) {
            used.add(number);
            output.push(number);
        }
    }

    function runPattern(order, fixed, pattern) {
        let max;
        if (fixed) {
            // If fixed, then there are only 10 possible digits (0 through 9)
            max = 10;
        } else {
            // Otherwise, we need to consider all the empty places in the pattern.
            //
            // First, determine what value we need to count up to.
            // Since each X is a decimal digit, the number is 10^count,
            // where count is the number of Xs.
            const count = pattern.filter(n => n === null).length;
            max = Math.pow(10, count);
        }

        let reverse;
        if (order === 'highest') {
            // This is our way of going from biggest to smallest.
            // Do normal 0...max-1, and then apply max-n-1 each time
            // to get the *highest* number first instead.
            reverse = true;
        } else if (order === 'lowest') {
            reverse = false;
        } else {
            throw new Error('Unknown order: ' + order);
        }

        function fillPattern(fill) {
            function nextFillDigit() {
                if (fixed) {
                    // If fixed, then it's always the same digit
                    return fill;
                } else {
                    // Otherwise, we need to get the next digit in line.
                    const digit = fill % 10;
                    fill = Math.trunc(fill / 10);
                    return digit;
                }
            }

            // We go in reverse order in the pattern so we get
            // the least significant digits of 'fill' first.
            // (Only relevant if not fixed)
            let number = 0;
            for (let i = pattern.length - 1; i >= 0; i--) {
                let digit = pattern[i];
                if (digit === null) {
                    digit = nextFillDigit();
                }

                // Index 0 of the pattern array is the *most* significant digit.
                const place = pattern.length - i - 1;
                number += digit * Math.pow(10, place);
            }

            return number;
        }

        for (let i = 0; i < max; i++) {
            const fill = reverse ? max - i - 1 : i;
            const value = fillPattern(fill);
            emit(value);
        }
    }

    for (const preference of preferences) {
        if (typeof preference === 'number') {
            // fixed value
            emit(preference);
        } else {
            // pattern
            runPattern(preference.order, preference.fixed, preference.pattern);
        }
    }

    return output;
}
