import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../../theme';
import { icons } from '../../../resources';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const allowTypes = ['default', 'success', 'error', 'primary'];
const iconsByType = {
  success: icons.greenCheck,
  error: icons.redPlus,
};

export default ({ onPress, type = 'default', title, style = {} }) => {
  const styleType = allowTypes.includes(type) ? type : 'default';

  const icon = iconsByType[type] || null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
			style={{ ...styles.button, ...styles[styleType], ...style }}
		>
			<Text style={styles.title}>{title}</Text>
			{icon && (
				<Image source={icon} style={styles.icon} resizeMode="contain" />
			)}
    </TouchableOpacity>
  );
};
const colorText = '#0d6c72';
const colorGreen = '#17a521';
const colorRed = '#e80f0f';
const colorBlue = '#4388d6';
// const colorBlue = 'blue';

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    color: colorText,
    fontWeight: '600',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  button: {
    backgroundColor: 'white',
    marginBottom: wp('3%'),
    paddingVertical: wp('4%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 27,
    width: 27,
  },
  success: {
    borderWidth: 4,
    borderColor: colorGreen,
  },
  error: {
    borderWidth: 4,
    borderColor: colorRed,
  },
  primary: {
    borderWidth: 4,
    borderColor: colorBlue,
  },
});
