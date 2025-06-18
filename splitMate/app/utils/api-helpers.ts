import { AxiosRequestConfig } from 'axios';
import { COMMON_REQ_CONFIG, URL_DICTIONARY } from '../constants/api-endpoints';

export const replaceUrlParams = (url: string, params: Record<string, string>) => {
  let finalUrl = url;
  Object.keys(params).forEach((key) => {
    finalUrl = finalUrl.replace(`:${key}`, params[key]);
  });
  return finalUrl;
};

export const createAxiosConfig = (
  endpoint: keyof typeof URL_DICTIONARY,
  variant: string = 'DEFAULT',
  urlParams?: Record<string, string>,
  config: AxiosRequestConfig = {}
): AxiosRequestConfig => {
  const endpointConfig = URL_DICTIONARY[endpoint][variant];
  const url = urlParams ? replaceUrlParams(endpointConfig.url, urlParams) : endpointConfig.url;

  return {
    baseURL: COMMON_REQ_CONFIG.BASE_URL,
    headers: {
      ...COMMON_REQ_CONFIG.headers,
      ...config.headers,
    },
    url,
    ...config,
  };
}; 