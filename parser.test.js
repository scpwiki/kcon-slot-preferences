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

test('supports highest incremental patterns', () => {
  expect(parse('highest incremental 5XXX')).toStrictEqual([
    { order: 'highest', fixed: false, pattern: [5, null, null, null] }
  ]);

  expect(parse('highest incr 50XX')).toStrictEqual([
    { order: 'highest', fixed: false, pattern: [5, 0, null, null] }
  ]);

  expect(parse('high incr 5X2X')).toStrictEqual([
    { order: 'highest', fixed: false, pattern: [5, null, 2, null] }
  ]);

  expect(parse('biggest incremental 50XX')).toStrictEqual([
    { order: 'highest', fixed: false, pattern: [5, 0, null, null] }
  ]);

  expect(parse('big incr 500X')).toStrictEqual([
    { order: 'highest', fixed: false, pattern: [5, 0, 0, null] }
  ]);
});
