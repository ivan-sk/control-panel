module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@controllers(.*)$": "<rootDir>/src/controllers$1",
    "^@routes(.*)$": "<rootDir>/src/routes$1",
    "^@validation(.*)$": "<rootDir>/src/validation$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@middleware(.*)$": "<rootDir>/src/middleware$1"
  } 
};
