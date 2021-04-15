import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';
import { BlurView } from '@react-native-community/blur';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import dropdownStyle from './dropdown.style';
import { MainContext } from '../../contexts/MainContext';

export default function Header({
  navigation,
  changeDropdownState,
  headerCollapsed,
}) {
  let [dropdownWrapperHeight, setShowDropdownWrapperHeight] = useState(0);
  const trianglePadding = 4;
	let { logoutFacebookUser, user } = useContext(MainContext);

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={changeDropdownState}
        style={styles.dropdownBackground}
      />
      <View
        style={[
          styles.dropdownWrapper,
          {
            bottom:
              dropdownWrapperHeight > 0
                ? -dropdownWrapperHeight + trianglePadding
                : 1000,
          },
        ]}
        onLayout={event => {
          setShowDropdownWrapperHeight(event.nativeEvent.layout.height);
        }}>
        <Image
          source={require('./img/triangle.png')}
          style={[
            styles.triangleIcon,
            headerCollapsed ? { marginLeft: wp('31%') } : {},
          ]}
          resizeMode="contain"
        />
        <View style={styles.linksWrapper}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('Profile');
            }}
            onPressOut={() => {
              changeDropdownState();
            }}>
            <Image
              source={require('./img/user.png')}
              style={styles.linkIcon}
              resizeMode="contain"
            />

            <Text style={styles.linkText}>My profile</Text>
            <Image
              source={require('./img/arrow.png')}
              style={styles.linkArrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('Rewards');
            }}
            onPressOut={() => {
              changeDropdownState();
            }}>
            <Image
              source={require('./img/gift.png')}
              style={styles.linkIcon}
              resizeMode="contain"
            />

            <Text style={styles.linkText}>My rewards</Text>
            <Image
              source={require('./img/arrow.png')}
              style={styles.linkArrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
							logoutFacebookUser();
            }}>
            <Image
              source={require('./img/logout.png')}
              style={styles.linkIcon}
              resizeMode="contain"
            />

            <Text style={styles.linkText}>Logout</Text>
            <Image
              source={require('./img/arrow.png')}
              style={styles.linkArrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  ...dropdownStyle,
});
