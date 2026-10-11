const { parsePreferencesString: parse } = require('./preferences');

function testWhitespace(input, output) {
  expect(parse(input)).toStrictEqual(output);
  expect(parse(` ${input}`)).toStrictEqual(output);
  expect(parse(`${input} `)).toStrictEqual(output);
  expect(parse(` ${input} `)).toStrictEqual(output);
}

test('whitespace is ignored in 1-item lists', () => {
  testWhitespace('5000', [5000]);
});

test('trailing commas are ignored in 1-item lists', () => {
  testWhitespace('5000,', [5000]);
  testWhitespace('5000 ,', [5000]);
});

test('whitespace is ignored for 2-item lists', () => {
  testWhitespace('5000,5001', [5000, 5001]);
  testWhitespace('5000, 5001', [5000, 5001]);
  testWhitespace('5000 ,5001', [5000, 5001]);
  testWhitespace('5000 , 5001', [5000, 5001]);
});

test('trailing commas are ignored for 2-item lists', () => {
  testWhitespace('5000,5001,', [5000, 5001]);
  testWhitespace('5000, 5001,', [5000, 5001]);
  testWhitespace('5000 ,5001,', [5000, 5001]);
  testWhitespace('5000 , 5001,', [5000, 5001]);

  testWhitespace('5000,5001 ,', [5000, 5001]);
  testWhitespace('5000, 5001 ,', [5000, 5001]);
  testWhitespace('5000 ,5001 ,', [5000, 5001]);
  testWhitespace('5000 , 5001 ,', [5000, 5001]);
});
