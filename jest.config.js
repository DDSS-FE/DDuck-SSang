import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    'components/(.*)$': '<rootDir>/components/$1',
    'pages/(.*)$': '<rootDir>/pages/$1',
    'utils/(.*)$': '<rootDir>/utils/$1',
    'hooks/(.*)$': '<rootDir>/hooks/$1',
    'styles/(.*)$': '<rootDir>/styles/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
