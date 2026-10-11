const { parsePreferencesString: parse } = require('./preferences');

function testWhitespace(input, output) {
  expect(parse(input)).toStrictEqual(output);
  expect(parse(` ${input}`)).toStrictEqual(output);
  expect(parse(`${input} `)).toStrictEqual(output);
  expect(parse(` ${input} `)).toStrictEqual(output);
}

test('1-item lists ignore whitespace', () => {
  testWhitespace('5000', [5000]);
});

test('1-item lists ignore trailing commas', () => {
  testWhitespace('5000,', [5000]);
  testWhitespace('5000 ,', [5000]);
});

test('2-item lists ignore whitespace', () => {
  testWhitespace('5000,5001', [5000, 5001]);
  testWhitespace('5000, 5001', [5000, 5001]);
  testWhitespace('5000 ,5001', [5000, 5001]);
  testWhitespace('5000 , 5001', [5000, 5001]);
});

test('2-item lists ignore trailing commas', () => {
  testWhitespace('5000,5001,', [5000, 5001]);
  testWhitespace('5000, 5001,', [5000, 5001]);
  testWhitespace('5000 ,5001,', [5000, 5001]);
  testWhitespace('5000 , 5001,', [5000, 5001]);

  testWhitespace('5000,5001 ,', [5000, 5001]);
  testWhitespace('5000, 5001 ,', [5000, 5001]);
  testWhitespace('5000 ,5001 ,', [5000, 5001]);
  testWhitespace('5000 , 5001 ,', [5000, 5001]);
});

function testAliases(input, output) {
  expect(parse(input)).toStrictEqual(output);

  if (input.includes('highest')) {
    expect(parse(input.replace('highest', 'high'))).toStrictEqual(output);
    expect(parse(input.replace('highest', 'biggest'))).toStrictEqual(output);
    expect(parse(input.replace('highest', 'big'))).toStrictEqual(output);
    expect(parse(input.replace('highest', 'largest'))).toStrictEqual(output);
    expect(parse(input.replace('highest', 'large'))).toStrictEqual(output);
  }

  if (input.includes('lowest')) {
    expect(parse(input.replace('lowest', 'low'))).toStrictEqual(output);
    expect(parse(input.replace('lowest', 'smallest'))).toStrictEqual(output);
    expect(parse(input.replace('lowest', 'small'))).toStrictEqual(output);
  }

  if (input.includes('fixed')) {
    expect(parse(input.replace('fixed', 'same'))).toStrictEqual(output);
  }

  if (input.includes('incr')) {
    expect(parse(input.replace('incr', 'incremental'))).toStrictEqual(output);
    expect(parse(input.replace('incr', 'seq'))).toStrictEqual(output);
    expect(parse(input.replace('incr', 'sequential'))).toStrictEqual(output);
  }
}

test('supports highest incremental patterns', () => {
  testAliases('highest incr 5XXX', [
    { order: 'highest', fixed: false, pattern: [5, null, null, null] }
  ]);
});
