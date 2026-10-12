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

  expect(parse4('lowest fixed 5XXX, lowest seq 50XX, highest fixed 5x00')).toStrictEqual([
    // lowest fixed 5XXX
    5000, 5111, 5222, 5333, 5444, 5555, 5666, 5777, 5888, 5999,
    // lowest seq 50XX
    5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010,
    5011, 5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020,
    5021, 5022, 5023, 5024, 5025, 5026, 5027, 5028, 5029, 5030,
    5031, 5032, 5033, 5034, 5035, 5036, 5037, 5038, 5039, 5040,
    5041, 5042, 5043, 5044, 5045, 5046, 5047, 5048, 5049, 5050,
    5051, 5052, 5053, 5054, 5055, 5056, 5057, 5058, 5059, 5060,
    5061, 5062, 5063, 5064, 5065, 5066, 5067, 5068, 5069, 5070,
    5071, 5072, 5073, 5074, 5075, 5076, 5077, 5078, 5079, 5080,
    5081, 5082, 5083, 5084, 5085, 5086, 5087, 5088, 5089, 5090,
    5091, 5092, 5093, 5094, 5095, 5096, 5097, 5098, 5099,
    // highest fixed 5x00
    5900, 5800, 5700, 5600, 5500, 5400, 5300, 5200, 5100,
  ]);
});

test('5-digit end-to-end parsing and listing', () => {
  expect(parse5('[lowest fixed 10XXX, highest incr 1011X]')).toStrictEqual([
    10000, 10111, 10222, 10333, 10444, 10555, 10666, 10777, 10888, 10999,
    10119, 10118, 10117, 10116, 10115, 10114, 10113, 10112, 10110,
  ]);

  expect(parse5(' 10123, 10111, 10200, highest incr 10x00, 10225')).toStrictEqual([
    // values
    10123, 10111, 10200,
    // highest incr 10x00
    10900, 10800, 10700, 10600, 10500, 10400, 10300, 10100, 10000,
    // values
    10225,
  ]);
});
