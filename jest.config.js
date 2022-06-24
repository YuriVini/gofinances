module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest", // 👈 note this transform key
  },
  watchman: false,
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
