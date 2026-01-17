@{%

const moo = require('moo');

const lexer = moo.compile({
    space: {match: /\s+/, lineBreaks: true},
    number: /[0-9]{4}/,
    pattern: /[xX0-9]{4}/,
    highest: /high(?:est)?|big(?:gest)?|large(?:st)?/,
    lowest: /low(?:est)?|small(?:est)?/,
    fixed: /fixed|same/,
    incr: /incremental|incr|sequential|seq/,
    ',': ',',
});

%}

@lexer lexer

main -> expr {% id %}
      | list {% id %}

expr -> number {% list %}
      | highest {% list %}
      | lowest {% list %}

list -> expr list_item:+ _ ",":? {% extractList %}

list_item -> _ "," _ expr {% nth(3) %}

number -> %number {% (d) => parseInt(d[0].value) %}

pattern -> %pattern {% extractRawPattern %}

highest -> %highest _ %fixed _ pattern {% extractPattern('highest', true) %}
         | %highest _ %incr _ pattern {% extractPattern('highest', false) %}

lowest -> %lowest _ %fixed _ pattern {% extractPattern('lowest', true) %}
        | %lowest _ %incr _ pattern {% extractPattern('lowest', false) %}

_ -> null | %space {% empty %}

@{%

// helpers
function empty(d) {
    return null;
}

function list(d) {
    return [d[0]];
}

function nth(index) {
    return function (d) {
        return d[index];
    };
}

// extractors
function extractRawPattern(d) {
    const digits = [];
    for (const c of d[0].value) {
        if (c === 'x' || c === 'X') {
            digits.push(null);
        } else {
            digits.push(parseInt(c));
        }
    }
    return digits;
}

function extractPattern(order, fixed) {
    return function (d) {
        return { order, fixed, pattern: d[4] };
    };
}

function extractList(d) {
    let list = d[0];
    for (const nextList of d[1]) {
        list = list.concat(nextList);
    }
    return list;
}

%}
