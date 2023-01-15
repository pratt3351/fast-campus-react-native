/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    './node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
    '<rootDir>/jest-setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|@react-navigation|react-native-reanimated)/)',
  ],
};

module.exports = config;
