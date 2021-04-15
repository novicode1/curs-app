import axios from 'axios';
import { Alert } from 'react-native';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Geolocation from '@react-native-community/geolocation';
export async function getFacebookUser(token) {
  let json = await axios
    .get(
      'https://graph.facebook.com/v2.5/me?fields=email,picture.type(normal),first_name,last_name,name&access_token=' +
        token,
    )
    .catch(error => console.log(error));

  if (!json) {
    return null;
  }

  let userData = json.data;

  // console.log('Loaded Facebook user - ', userData);

  let user = {};

  user.fullName = `${userData.first_name} ${userData.last_name}`;
  user.facebookId = userData.id;
  user.email = userData.email;
  user.photoUrl = userData.picture.data.url;
  user.alias = userData.id;
  user.updatedAt = new Date();
  user.createdAt = new Date();

  return user;
}
