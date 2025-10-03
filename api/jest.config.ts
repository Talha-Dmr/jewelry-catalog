import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@repo/contracts(.*)$': '<rootDir>/../packages/contracts/src$1'
  }
};

export default config;
