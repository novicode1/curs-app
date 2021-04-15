import { Platform } from 'react-native';
import * as settingsService from '../settings';

export const DEVICE = 'mobile'; // mobile | chromecast

// dev
// const WS_URL_DEV_IOS = 'ws://localhost:3001';
// const WS_URL_DEV_ANDROID = 'ws://10.0.2.2:3001';
// const WS_URL_DEV = Platform.OS === 'ios' ? WS_URL_DEV_IOS : WS_URL_DEV_ANDROID;
// export const WS_URL = WS_URL_DEV;

// prod
let WS_URL = null;

export const getWebsocketURL = async () => {
  if (WS_URL) {
    return WS_URL;
  }

  const config = await settingsService.load();
  WS_URL = config.gameBaseUrlV2WS;

  return WS_URL;
};
