const { parseAndListPreferences: parse, listPreferences: list } = require('./preferences');

const parse4 = (input, alreadyTaken=[]) => parse(input, 4, alreadyTaken);
const parse5 = (input, alreadyTaken=[]) => parse(input, 5, alreadyTaken);

test('supports constant numbers', () => {
  expect(list([5005])).toStrictEqual([5005]);
  expect(list([5123, 5005, 5111, 5999])).toStrictEqual([5123, 5005, 5111, 5999]);
  expect(list([11111, 11222, 11333, 11444])).toStrictEqual([11111, 11222, 11333, 11444])
});

test('supports sequential patterns', () => {
  expect(list([
    333,
    { order: 'highest', fixed: false, pattern: [3, 2, null] },
    315
  ])).toStrictEqual([
    333,
    329, 328, 327, 326, 325, 324, 323, 322, 321, 320,
    315,
  ]);

  expect(list([
    { order: 'lowest', fixed: false, pattern: [3, 0, null] },
    { order: 'highest', fixed: false, pattern: [3, null, null ] },
  ])).toStrictEqual([
    300, 301, 302, 303, 304, 305, 306, 307, 308, 309,
    399, 398, 397, 396, 395, 394, 393, 392, 391, 390, 389, 388, 387, 386, 385, 384, 383, 382, 381, 380, 379, 378, 377, 376, 375, 374, 373, 372, 371, 370, 369, 368, 367, 366, 365, 364, 363, 362, 361, 360, 359, 358, 357, 356, 355, 354, 353, 352, 351, 350, 349, 348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310,
  ]);
});

test('supports fixed patterns', () => {
  expect(list([
    333,
    { order: 'lowest', fixed: true, pattern: [3, null, null] },
  ])).toStrictEqual([333, 300, 311, 322, 344, 355, 366, 377, 388, 399]);

  expect(list([
    { order: 'highest', fixed: true, pattern: [5, null, 5, 0] },
  ])).toStrictEqual([
    5950, 5850, 5750, 5650, 5550, 5450, 5350, 5250, 5150, 5050,
  ]);

  expect(list([
    { order: 'highest', fixed: true, pattern: [5, null, null, 5] },
    { order: 'lowest', fixed: true, pattern: [5, null, null, null] },
  ])).toStrictEqual([
    5995, 5885, 5775, 5665, 5555, 5445, 5335, 5225, 5115, 5005,
    5000, 5111, 5222, 5333, 5444, 5666, 5777, 5888, 5999,
  ]);
});

test('4-digit end-to-end parsing and listing', () => {
  expect(parse4('[5315, highest incr 530x]')).toStrictEqual([
    5315, 5309, 5308, 5307, 5306, 5305, 5304, 5303, 5302, 5301, 5300,
  ]);

  expect(parse4('lowest same 53XX, 5301, 5310, 5311')).toStrictEqual([
    5300, 5311, 5322, 5333, 5344, 5355, 5366, 5377, 5388, 5399, 5301, 5310,
  ]);
});

test('5-digit end-to-end parsing and listing', () => {
  expect(parse5('[lowest fixed 10XXX, highest incr 1011X]')).toStrictEqual([
    10000, 10111, 10222, 10333, 10444, 10555, 10666, 10777, 10888, 10999,
    10119, 10118, 10117, 10116, 10115, 10114, 10113, 10112, 10110,
  ]);
});
