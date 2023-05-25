//  we are not using this anymore
//  Global moking are done automatically, so there is not need to add axios.
// jest.mock('./http');

const { loadTitle } = require('./util');

// Did not worked because of the asyncronous function
// test('should print and uppercase text', () => {
//   expect(printTitle()).toBe('DELECTUS AUT AUTEM')
// })

test('should print and uppercase text', () => {
  loadTitle().then(title => {
    expect(title).toBe('DELECTUS AUT AUTEM');
  });
});
