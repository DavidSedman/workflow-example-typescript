export default {
  bail: true,
  collectCoverage: true,
  //collectCoverageFrom: ['<rootDir>/api/**/*.ts'],
  coverageDirectory: '__testing__/coverage',
  coverageReporters: ['lcov', 'cobertura', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  errorOnDeprecated: false,
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'js'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'api',
        outputDirectory: './__testing__/results',
        outputName: 'results.xml',
        uniqueOutputName: 'false',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' > ',
        usePathForSuiteName: 'true'
      }
    ]
  ],
  roots: ['__testing__/tests'],
  testMatch: ['**/__testing__/tests/*.+(ts|tsx|js)'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  verbose: true
};
