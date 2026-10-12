const { parseAndListPreferences: parse, listPreferences: list } = require('./preferences');

test('supports constant numbers', () => {
  expect(list([5005])).toStrictEqual([5005]);
  expect(list([5123, 5005, 5111, 5999])).toStrictEqual([5123, 5005, 5111, 5999]);
  expect(list([11111, 11222, 11333, 11444])).toStrictEqual([11111, 11222, 11333, 11444])
});
