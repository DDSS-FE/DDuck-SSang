import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/components/$1',
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^utils/(.*)$': '<rootDir>/utils/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^styles/(.*)$': '<rootDir>/styles/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customJestConfig);
