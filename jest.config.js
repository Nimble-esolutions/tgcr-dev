const nextJest = require("next/jest");
const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig = {
	testEnvironment: "jest-fixed-jsdom",
	moduleDirectories: ["node_modules", "<rootDir>/"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"^@/libs/(.*)$": "<rootDir>/src/libs/$1",
		"^@/components/(.*)$": "<rootDir>/src/components/$1",
		"^@/app/(.*)$": "<rootDir>/src/app/$1",
		"^@/actions/(.*)$": "<rootDir>/src/actions/$1",
		"^@/(.*)$": "<rootDir>/$1",
	},
	testMatch: [
		"**/__tests__/**/*.test.js",
		"**/__tests__/**/*.test.jsx",
		"**/__tests__/**/*.test.ts",
		"**/__tests__/**/*.test.tsx",
	],
	clearMocks: true,
	//collectCoverage: true,
	// collectCoverageFrom: [
	//   'components/**/*.{js,jsx,ts,tsx}',
	//   'pages/**/*.{js,jsx,ts,tsx}',
	//   '!**/node_modules/**',
	//   '!**/.next/**',
	// ],
	// coverageThreshold: {
	//   global: {
	//     branches: 80,
	//     functions: 80,
	//     lines: 80,
	//     statements: 80,
	//   },
	// },
};

module.exports = createJestConfig(customJestConfig);
