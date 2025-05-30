const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .wasm as an asset
config.resolver.assetExts.push('wasm');

module.exports = config; 