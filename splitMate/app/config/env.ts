import Constants from 'expo-constants';
import { Platform } from 'react-native';

const ENV = {
  development: {
    API_URL: Platform.select({
      web: 'http://localhost:8080/api',
      default: 'http://192.168.15.2:8080/api',
    }),
  },
  production: {
    API_URL: 'http://your-production-api.com/api',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.development;
  }
  return ENV.production;
};

export default getEnvVars(); 