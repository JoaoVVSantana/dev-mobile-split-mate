module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... any existing plugins ...
      ['@babel/plugin-syntax-import-assertions'],
    ],
  };
}; 