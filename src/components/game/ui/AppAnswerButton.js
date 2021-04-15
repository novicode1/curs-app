import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../../theme';
import { icons } from '../../../resources';

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
      style={styles.wrapper}>
      <View style={{ ...styles.button, ...styles[styleType], ...style }}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        )}
      </View>
    </TouchableOpacity>
  );
};
const colorText = '#0d6c72';
const colorGreen = '#17a521';
const colorRed = '#e80f0f';
const colorBlue = '#4388d6';
// const colorBlue = 'blue';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxHeight: 80,
    minHeight: 40,
  },
  title: {
    fontSize: 27,
    color: colorText,
    fontWeight: '600',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  button: {
    backgroundColor: 'white',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  icon: {
    height: 27,
    width: 27,
  },
  default: {
    borderWidth: 1,
    borderColor: ThemeColors.blue,
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
