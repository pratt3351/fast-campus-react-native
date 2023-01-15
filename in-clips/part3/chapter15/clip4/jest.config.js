/** @type {import('jest').Config} */
const config = {
    "preset": "react-native",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
};
  
module.exports = config;
