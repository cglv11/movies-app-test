import {STAGE, API_URL as PROD_URL, API_URL_ANDROID, API_URL_IOS} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const moviesApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {moviesApi};
