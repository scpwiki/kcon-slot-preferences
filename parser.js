// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo');

const lexer = moo.compile({
    space: {match: /\s+/, lineBreaks: true},
    number: /[0-9]{4}/,
    pattern: /[xX0-9]{4}/,
    highest: /high(?:est)?|big(?:gest)?|large(?:st)?/,
    lowest: /low(?:est)?|small(?:est)?/,
    fixed: /fixed|same/,
    incr: /incremental|incr|sequential|seq/,
    '(': '(',
    ')': ')',
    '[': '[',
    ']': ']',
    ',': ',',
});




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

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["expr"], "postprocess": id},
    {"name": "main", "symbols": ["list"], "postprocess": id},
    {"name": "expr", "symbols": ["number"], "postprocess": list},
    {"name": "expr", "symbols": ["highest"], "postprocess": list},
    {"name": "expr", "symbols": ["lowest"], "postprocess": list},
    {"name": "expr", "symbols": [{"literal":"("}, "_", "list", "_", {"literal":")"}], "postprocess": nth(2)},
    {"name": "expr", "symbols": [{"literal":"["}, "_", "list", "_", {"literal":"]"}], "postprocess": nth(2)},
    {"name": "expr", "symbols": [{"literal":"("}, "_", "expr", "_", {"literal":")"}], "postprocess": nth(2)},
    {"name": "expr", "symbols": [{"literal":"["}, "_", "expr", "_", {"literal":"]"}], "postprocess": nth(2)},
    {"name": "list$ebnf$1", "symbols": ["list_item"]},
    {"name": "list$ebnf$1", "symbols": ["list$ebnf$1", "list_item"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "list$ebnf$2", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "list$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "list", "symbols": ["expr", "list$ebnf$1", "_", "list$ebnf$2"], "postprocess": extractList},
    {"name": "list_item", "symbols": ["_", {"literal":","}, "_", "expr"], "postprocess": nth(3)},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => parseInt(d[0].value)},
    {"name": "pattern", "symbols": [(lexer.has("pattern") ? {type: "pattern"} : pattern)], "postprocess": extractRawPattern},
    {"name": "highest", "symbols": [(lexer.has("highest") ? {type: "highest"} : highest), "_", (lexer.has("fixed") ? {type: "fixed"} : fixed), "_", "pattern"], "postprocess": extractPattern('highest', true)},
    {"name": "highest", "symbols": [(lexer.has("highest") ? {type: "highest"} : highest), "_", (lexer.has("incr") ? {type: "incr"} : incr), "_", "pattern"], "postprocess": extractPattern('highest', false)},
    {"name": "lowest", "symbols": [(lexer.has("lowest") ? {type: "lowest"} : lowest), "_", (lexer.has("fixed") ? {type: "fixed"} : fixed), "_", "pattern"], "postprocess": extractPattern('lowest', true)},
    {"name": "lowest", "symbols": [(lexer.has("lowest") ? {type: "lowest"} : lowest), "_", (lexer.has("incr") ? {type: "incr"} : incr), "_", "pattern"], "postprocess": extractPattern('lowest', false)},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": empty}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
