@{%

const moo = require('moo');

// __DIGITS__ is replaced with 4 or 5 depending to make the two parser variants
const lexer = moo.compile({
    space: {match: /\s+/, lineBreaks: true},
    number: /[0-9]{__DIGITS__}/,
    pattern: /[xX0-9]{__DIGITS__}/,
    // moo does not support /i, so we have to implement it in this annoying way
    // original code:
    //  highest: /high(?:est)?|big(?:gest)?|large(?:st)?/,
    //  lowest: /low(?:est)?|small(?:est)?/,
    //  fixed: /fixed|same/,
    //  incr: /incr(?:emental)?|seq(?:uential)?/,
    highest: /[hH][iI][gG][hH](?:[eE][sS][tT])?|[bB][iI][gG](?:[gG][eE][sS][tT])?|[lL][aA][rR][gG][eE](?:[sS][tT])?/,
    lowest: /[lL][oO][wW](?:[eE][sS][tT])?|[sS][mM][aA][lL][lL](?:[eE][sS][tT])?/,
    fixed: /[fF][iI][xX][eE][dD]|[sS][aA][mM][eE]/,
    incr: /[iI][nN][cC][rR](?:[eE][mM][eE][nN][tT][aA][lL])?|[sS][eE][qQ](?:[uU][eE][nN][tT][iI][aA][lL])?/,
    '(': '(',
    ')': ')',
    '[': '[',
    ']': ']',
    ',': ',',
});

%}

@lexer lexer

main -> _ list _ {% nth(1) %}
      | _ "(" _ list _ ")" _ {% nth(3) %}
      | _ "[" _ list _ "]" _ {% nth(3) %}

list -> list_item:* expr           {% extractList %}  # no trailing comma
      | list_item:* last_list_item {% extractList %}  # has trailing comma

list_item      -> expr _ "," _ {% nth(0) %}
last_list_item -> expr _ ","   {% nth(0) %}

expr -> number {% id %}
      | highest {% id %}
      | lowest {% id %}

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

function wrapList(d) {
    return [d[0]];
}

function extractList(d) {
    // copy list to avoid mutability issues
    const list = [...d[0]];
    if (d[1]) {
        list.push(d[1]);
    }
    return list;
}

%}
