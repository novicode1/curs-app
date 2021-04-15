import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { ThemeColors, ThemeFontFamily } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import footer from './footer.style';
import { MainContext } from '../../contexts/MainContext';

export default function({ navigation }) {
  let { setFacebookUser, user } = useContext(MainContext);

  function loginWithFacebook() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            setFacebookUser(accessToken);
          });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  return (
    <LinearGradient
      colors={['#FFDA00', '#FFAF00', '#FF8700', '#FF8700']}
      locations={[0, 0.5, 0.5, 1]}
      style={[styles.footer, user.facebookId ? styles.withoutLoginButton : {}]}
		>
      <View style={styles.castWrapper}>
        <TouchableOpacity
          style={styles.castButton}
          onPress={() => {
            // navigation.navigate('Chromecast');
          }}>
          <Text style={styles.buttonText}>Cast</Text>
          <Image
            source={require('./img/cast.png')}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

			{!user.facebookId && (
				<View style={styles.loginWrapper}>
					<TouchableOpacity style={styles.loginButton} onPress={loginWithFacebook}>
						<Image
							source={require('./img/facebook.png')}
							style={styles.loginIcon}
							resizeMode="contain"
							/>
					</TouchableOpacity>
				</View>
			)}

      <View style={styles.homeWrapper}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Image
            source={require('./img/home.png')}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ...footer,
});
