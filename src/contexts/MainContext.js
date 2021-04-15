/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  getUser,
  setUser,
  getNotifications,
  setDatabaseProfile,
} from '../api/profile';
import { getFacebookUser } from '../api/facebook';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import hex from '../utils/hex';
import getStorageUser from '../utils/getStorageUser';
import {initializeGeolocation, getCurrentPosition} from '../utils/watchUserLocation';
import randomName from '../utils/randomName';
import randomAvatar from '../utils/randomAvatar';

import { LoginManager, AccessToken } from 'react-native-fbsdk';

const MainContext = React.createContext();

function MainContextProvider({ children }) {
	let guestUser = {
    photoUrl: randomAvatar,
		fullName: randomName,
		_id: hex(24),
		isGuest: true,
		latestLocation: {},
	};

  let [user, setLocalUser] = useState(guestUser);
  let [notifications, setNotifications] = useState([]);
  let [notificationToken, setNotificationToken] = useState(null);
  let [notificationCount, setNotificationCount] = useState(0);
  let [latestLocation, setLatestLocation] = useState(null);

  function postUser(newUserData) {
		try {
			setUser(newUserData, user._id).catch(err => console.log(`Error in setUser: ${err.message}`));
			setLocalUser({ ...user, ...newUserData, ...latestLocation });
		} catch (err) {
			console.log(err);
		}
	}


  function updateUserData() {
		if (!user.isGuest && latestLocation) {
			try {
				postUser({ latestLocation });
			} catch (err) {
				console.log(err);
			}
		}
  }

  function setFacebookUser(token) {
    getFacebookUser(token).then(facebookUser => {
			let newDatabseProfile = facebookUser;
			if (notificationToken) {
				newDatabseProfile.notificationToken = notificationToken;
			}
      setDatabaseProfile(newDatabseProfile)
        .then(databaseUser => {
					if (!databaseUser.notificationToken && notificationToken) {
						postUser({ notificationToken: notificationToken });
					}
					setLocalUser({ ...user, ...databaseUser, isGuest: false, latestLocation });
        })
        .catch(err => alert(`Error in getFacebookUser: ${err.message}`));
    });
  }

	function updateGeolocation(){
		getCurrentPosition(setLatestLocation);
	}

  function logoutFacebookUser() {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            LoginManager.logOut();
						setLocalUser({ ...guestUser, latestLocation });
						await AsyncStorage.removeItem('user');
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
	}

	function getLatestLocationOrFallback(){
		if (latestLocation)
		{
			return latestLocation;
		}

		if (user){
			return user.latestLocation;
		}
	}

  useEffect(() => {
		getStorageUser()
		.then(res => {
			if (res) {
				setLocalUser(res);
			}
		});
		initializeGeolocation(setLatestLocation);
	}, []);

  useEffect(() => {
		if (latestLocation && latestLocation.coordinates && latestLocation.coordinates[0]) {
			setLocalUser({ ...user, latestLocation });
		}
	}, [latestLocation]);


  useEffect(() => {
		if (notificationToken && user.isGuest !== true && (user.notificationToken !== notificationToken)) {
			try {
				postUser({ notificationToken: notificationToken });
			}
			catch (error) {console.log(error);}
		}
	}, [notificationToken]);

  useEffect(() => {
    console.log('Getting facebook token for user');
    AccessToken.getCurrentAccessToken().then(facebookStoredData => {
      if (facebookStoredData) {
        let accessToken = facebookStoredData.accessToken.toString();
        setFacebookUser(accessToken);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  useEffect(() => {
		(async function setStorageUser() {
			if (user.facebookId && user.isGuest !== true) {
				try {
					await AsyncStorage.setItem('user', JSON.stringify(user));
				}
				catch (error) {
					console.log(error);
				}
			}
		})();
  }, [user]);

  return (
    <MainContext.Provider
      value={{
        user,
        notifications,
				latestLocation,
				setNotifications,
				setNotificationToken,
				setLocalUser,
        postUser,
				setFacebookUser,
				logoutFacebookUser,
				getLatestLocationOrFallback,
				updateGeolocation,
				updateUserData,
				notificationCount,
				setNotificationCount,
      }}>
      {children}
    </MainContext.Provider>
  );
}

export { MainContextProvider, MainContext };
