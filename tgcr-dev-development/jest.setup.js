import '@testing-library/jest-dom/';

global.fetch = jest.fn();

global.fetch.mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Success' }),
  })
);