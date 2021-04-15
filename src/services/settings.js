import axios from 'axios';
import storage from '../api/storage';

const workMode = 'dev';
let SESSION_URI = `https://us.api.getquizcast.com/${workMode}-session`;

// if (workMode === 'dev') {
//   SESSION_URI = 'http://localhost:4000';
// }

const endpoints = {
  region: `${SESSION_URI}/region`,
  settings: `${SESSION_URI}/settings`,
};

let settings = {};

export const load = async () => {
  console.log('Loading settings...');
  if ('region' in settings) {
    return settings;
  }

  try {
    const region = await getRegion();
    console.log(endpoints.settings, region);
    const result = await axios.get(endpoints.settings, {
      params: { region },
    });

    settings = replaceMode(result.data);
  } catch (err) {
    console.error('Error loading settings - ', err);
  }
  return settings;
};

export const get = () => settings;

async function getRegion() {
  //TODO: Lock region to EU for testing, remove when released
  let result = 'eu-west-2';
  //console.log('Retrieve region - ', result);
  return new Promise((r, j) => r(result));

  let region = await storage.get('region');

  if (!region) {
    const response = await axios.get(endpoints.region);
    region = response.data.region;
    console.log('Retrieve region from API - ', region);
    await storage.add('region', region);
  }

  console.log('Retrieve region from storage - ', region);

  return region;
}

function replaceMode(obj) {
  // if (workMode === 'dev') {
  //   obj.gameBaseURL = 'http://localhost:4000';
  //   obj.sessionBaseURL = 'http://localhost:4000';
  //   obj.websocketBaseURL = 'ws://localhost:3001';
  //   return obj;
  // }

  obj.gameBaseURL = obj.gameBaseURL.replace(/%mode%/g, workMode);
  obj.gameBaseUrlV2 = obj.gameBaseUrlV2.replace(/%mode%/g, workMode);
  obj.gameBaseUrlV2WS = obj.gameBaseUrlV2WS.replace(/%mode%/g, workMode);
  obj.sessionBaseURL = obj.sessionBaseURL.replace(/%mode%/g, workMode);
  obj.websocketBaseURL = obj.websocketBaseURL.replace(/%mode%/g, workMode);
  return obj;
}
