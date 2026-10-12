const { parsePreferencesString: parse } = require('./preferences');

const parse4 = (input) => parse(input, 4);
const parse5 = (input) => parse(input, 5);

function testWhitespace(input, output) {
  expect(parse4(input)).toStrictEqual(output);
  expect(parse4(` ${input}`)).toStrictEqual(output);
  expect(parse4(`${input} `)).toStrictEqual(output);
  expect(parse4(` ${input} `)).toStrictEqual(output);
}

test('1-item lists ignore whitespace', () => {
  testWhitespace('5000', [5000]);
});

test('1-item lists ignore trailing commas', () => {
  testWhitespace('5000,', [5000]);
  testWhitespace('5000 ,', [5000]);
});

test('1-item lists with bracket syntax', () => {
  testWhitespace('[5000]', [5000]);
  testWhitespace('[ 5000]', [5000]);
  testWhitespace('[5000 ]', [5000]);
  testWhitespace('[ 5000 ]', [5000]);

  testWhitespace('[5000,]', [5000]);
  testWhitespace('[ 5000,]', [5000]);
  testWhitespace('[5000, ]', [5000]);
  testWhitespace('[ 5000, ]', [5000]);
});

test('1-item lists with parentheses', () => {
  testWhitespace('(5000)', [5000]);
  testWhitespace('( 5000)', [5000]);
  testWhitespace('(5000 )', [5000]);
  testWhitespace('( 5000 )', [5000]);

  testWhitespace('(5000,)', [5000]);
  testWhitespace('( 5000,)', [5000]);
  testWhitespace('(5000, )', [5000]);
  testWhitespace('( 5000, )', [5000]);
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

test('2-item lists with bracket syntax', () => {
  testWhitespace('[5000,5001]', [5000, 5001]);
  testWhitespace('[ 5000,5001]', [5000, 5001]);
  testWhitespace('[5000,5001 ]', [5000, 5001]);
  testWhitespace('[ 5000,5001 ]', [5000, 5001]);

  testWhitespace('[5000, 5001]', [5000, 5001]);
  testWhitespace('[ 5000, 5001]', [5000, 5001]);
  testWhitespace('[5000, 5001 ]', [5000, 5001]);
  testWhitespace('[ 5000, 5001 ]', [5000, 5001]);

  testWhitespace('[5000,5001,]', [5000, 5001]);
  testWhitespace('[ 5000,5001,]', [5000, 5001]);
  testWhitespace('[5000,5001, ]', [5000, 5001]);
  testWhitespace('[ 5000,5001, ]', [5000, 5001]);

  testWhitespace('[5000, 5001,]', [5000, 5001]);
  testWhitespace('[ 5000, 5001,]', [5000, 5001]);
  testWhitespace('[5000, 5001, ]', [5000, 5001]);
  testWhitespace('[ 5000, 5001, ]', [5000, 5001]);

  testWhitespace('[5000,5001 ,]', [5000, 5001]);
  testWhitespace('[ 5000,5001 ,]', [5000, 5001]);
  testWhitespace('[5000,5001 , ]', [5000, 5001]);
  testWhitespace('[ 5000,5001 , ]', [5000, 5001]);

  testWhitespace('[5000, 5001 ,]', [5000, 5001]);
  testWhitespace('[ 5000, 5001 ,]', [5000, 5001]);
  testWhitespace('[5000, 5001 , ]', [5000, 5001]);
  testWhitespace('[ 5000, 5001 , ]', [5000, 5001]);
});

test('2-item lists with parentheses', () => {
  testWhitespace('(5000,5001)', [5000, 5001]);
  testWhitespace('( 5000,5001)', [5000, 5001]);
  testWhitespace('(5000,5001 )', [5000, 5001]);
  testWhitespace('( 5000,5001 )', [5000, 5001]);

  testWhitespace('(5000, 5001)', [5000, 5001]);
  testWhitespace('( 5000, 5001)', [5000, 5001]);
  testWhitespace('(5000, 5001 )', [5000, 5001]);
  testWhitespace('( 5000, 5001 )', [5000, 5001]);

  testWhitespace('(5000,5001,)', [5000, 5001]);
  testWhitespace('( 5000,5001,)', [5000, 5001]);
  testWhitespace('(5000,5001, )', [5000, 5001]);
  testWhitespace('( 5000,5001, )', [5000, 5001]);

  testWhitespace('(5000, 5001,)', [5000, 5001]);
  testWhitespace('( 5000, 5001,)', [5000, 5001]);
  testWhitespace('(5000, 5001, )', [5000, 5001]);
  testWhitespace('( 5000, 5001, )', [5000, 5001]);

  testWhitespace('(5000,5001 ,)', [5000, 5001]);
  testWhitespace('( 5000,5001 ,)', [5000, 5001]);
  testWhitespace('(5000,5001 , )', [5000, 5001]);
  testWhitespace('( 5000,5001 , )', [5000, 5001]);

  testWhitespace('(5000, 5001 ,)', [5000, 5001]);
  testWhitespace('( 5000, 5001 ,)', [5000, 5001]);
  testWhitespace('(5000, 5001 , )', [5000, 5001]);
  testWhitespace('( 5000, 5001 , )', [5000, 5001]);
});

function testAliases(input, output) {
  expect(parse4(input)).toStrictEqual(output);

  if (input.includes('highest')) {
    expect(parse4(input.replace('highest', 'high'))).toStrictEqual(output);
    expect(parse4(input.replace('highest', 'biggest'))).toStrictEqual(output);
    expect(parse4(input.replace('highest', 'big'))).toStrictEqual(output);
    expect(parse4(input.replace('highest', 'largest'))).toStrictEqual(output);
    expect(parse4(input.replace('highest', 'large'))).toStrictEqual(output);
  }

  if (input.includes('lowest')) {
    expect(parse4(input.replace('lowest', 'low'))).toStrictEqual(output);
    expect(parse4(input.replace('lowest', 'smallest'))).toStrictEqual(output);
    expect(parse4(input.replace('lowest', 'small'))).toStrictEqual(output);
  }

  if (input.includes('fixed')) {
    expect(parse4(input.replace('fixed', 'same'))).toStrictEqual(output);
  }

  if (input.includes('incr')) {
    expect(parse4(input.replace('incr', 'incremental'))).toStrictEqual(output);
    expect(parse4(input.replace('incr', 'seq'))).toStrictEqual(output);
    expect(parse4(input.replace('incr', 'sequential'))).toStrictEqual(output);
  }
}

test('supports incremental patterns', () => {
  testAliases('highest incr 5XXX', [
    { order: 'highest', fixed: false, pattern: [5, null, null, null] }
  ]);

  testAliases('lowest incr 50XX', [
    { order: 'lowest', fixed: false, pattern: [5, 0, null, null] }
  ]);

  testAliases('highest incr 5X00, lowest incr 500X, lowest incr 51XX', [
    { order: 'highest', fixed: false, pattern: [5, null, 0, 0] },
    { order: 'lowest', fixed: false, pattern: [5, 0, 0, null] },
    { order: 'lowest', fixed: false, pattern: [5, 1, null, null] },
  ]);
});

test('supports fixed patterns', () => {
  testAliases('highest fixed 5XXX', [
    { order: 'highest', fixed: true, pattern: [5, null, null, null] }
  ]);

  testAliases('lowest fixed 5XX0', [
    { order: 'lowest', fixed: true, pattern: [5, null, null, 0] }
  ]);

  testAliases('lowest fixed 50XX, lowest fixed 5X0X, lowest fixed 5XX0', [
    { order: 'lowest', fixed: true, pattern: [5, 0, null, null] },
    { order: 'lowest', fixed: true, pattern: [5, null, 0, null] },
    { order: 'lowest', fixed: true, pattern: [5, null, null, 0] }
  ]);
});

test('supports mixed patterns', () => {
  testAliases('5900, lowest incr 500X, highest fixed 5XXX', [
    5900,
    { order: 'lowest', fixed: false, pattern: [5, 0, 0, null] },
    { order: 'highest', fixed: true, pattern: [5, null, null, null] },
  ]);

  testAliases('[5140 , lowest incr 5X14]', [
    5140,
    { order: 'lowest', fixed: false, pattern: [5, null, 1, 4] }
  ]);
});

test('empty lists fail', () => {
  expect(() => parse4('')).toThrow('Parser error');
  expect(() => parse4('[]')).toThrow('Syntax error');
  expect(() => parse4('()')).toThrow('Syntax error');

  expect(() => parse4(' ')).toThrow('Parser error');
  expect(() => parse4('[ ]')).toThrow('Syntax error');
  expect(() => parse4('[,]')).toThrow('Syntax error');
});

test('supports digit checks', () => {
  const input4 = '5555, lowest incr 55XX';
  expect(parse4(input4)).toStrictEqual([
    5555,
    { order: 'lowest', fixed: false, pattern: [5, 5, null, null] }
  ]);
  expect(() => parse5(input4)).toThrow('expected 5 digits, found 4');

  const input5 = '12345, 12233, highest incr 10XXX';
  expect(parse5(input5)).toStrictEqual([
    12345,
    12233,
    { order: 'highest', fixed: false, pattern: [1, 0, null, null, null] }
  ]);
  expect(() => parse4(input5)).toThrow('expected 4 digits, found 5');
});
