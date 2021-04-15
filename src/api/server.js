import axios from 'axios';
import * as settingsService from '../services/settings';

let instance = null;

export default async () => {
  if (instance) {
    return instance;
  }

  const config = await settingsService.load();
  const BASE_URL = config.sessionBaseURL;

  instance = axios.create({
    baseURL: BASE_URL,
    //   timeout: 1000,
  });
  return instance;
};
