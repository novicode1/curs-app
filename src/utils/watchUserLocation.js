import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

function updatePosition(position, setLatestLocation) {
  console.log('retrieving new geolocation position:', position);

  if (
    position &&
    position.coords &&
    position.coords.latitude &&
    position.coords.longitude
  ) {
    console.log(
      'retrieving new geolocation position:',
      position.coords.longitude,
      position.coords.latitude,
    );
    let latestLocation = {
      type: 'Point',
      coordinates: [position.coords.longitude, position.coords.latitude],
    };
    setLatestLocation(latestLocation);
  }
}

function getCurrentPosition(setLatestLocation) {
  Geolocation.getCurrentPosition(
    position => updatePosition(position, setLatestLocation),
    error => console.log('Getting geolocation: ', error.message),
  );
}

function watchPosition(setLatestLocation) {
  const geolocationOptions = {
    distanceFilter: 10,
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 10000,
  };

  Geolocation.watchPosition(
    position => updatePosition(position, setLatestLocation),
    err => {
      console.warn('Error during geolocation', err);
    },
    geolocationOptions,
  );
}

async function initializeGeolocation(setLatestLocation) {
  try {
    if (Platform.OS !== 'ios') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );

      if (PermissionsAndroid.RESULTS.GRANTED !== granted) {
        console.warn('Location permission denied');
        return;
      }
    }

    console.log('Geolocation permission granted.');

    getCurrentPosition(setLatestLocation);
    watchPosition(setLatestLocation);
  } catch (err) {
    console.warn('Error during geolocation - ', err);
  }
}

export {
  initializeGeolocation,
  updatePosition,
  getCurrentPosition,
  watchPosition,
};
