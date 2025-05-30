module.exports = {
  expo: {
    name: 'splitmate',
    // ... other existing config ...
    web: {
      bundler: 'metro'
    },
    extra: {
      eas: {
        projectId: 'your-project-id'
      }
    }
  }
}; 