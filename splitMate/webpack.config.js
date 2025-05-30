const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons'],
    },
  }, argv);

  // Add a rule for handling .wasm files
  config.module.rules.push({
    test: /\.wasm$/,
    type: "asset/resource"
  });

  return config;
}; 