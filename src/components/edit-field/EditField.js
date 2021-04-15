import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { TextInput } from 'react-native';

import { ThemeColors, ThemeFontFamily } from '../../theme';
import { MainContext } from '../../contexts/MainContext';
import form from '../form.style';
import titleWrapper from '../titleWrapper.style';
import editFieldStyle from './edit-field.style';

export default function Profile({ navigation }) {
	let { user, postUser }  = useContext(MainContext);
  let editField = navigation.state.params && navigation.state.params.editField;
  let editValue = navigation.state.params && navigation.state.params.editValue;

  const saveResult = () => {
		let newUserData = {}
		newUserData[editField] = inputValue
    postUser(newUserData);
    navigation.goBack();
  };

  const [inputValue, onChangeText] = React.useState(editValue);

  useEffect(() => {
    navigation.setParams({
      showBackButton: true,
      hideHeaderAvatar: true,
    });
  }, []);

  return (
    <React.Fragment>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Edit</Text>
      </View>

      <View style={styles.editInfo}>
        <View style={styles.inputLabel}>
          <Text style={styles.inputLabelText}>
            {editField.charAt(0).toUpperCase() + editField.slice(1)}
          </Text>
        </View>

        <TextInput
          style={[
            styles.inputWrapper,
            styles.inputText,
            styles.inputCustomWrapper,
          ]}
          onChangeText={text => onChangeText(text)}
          value={inputValue}
          clearButtonMode="always"
        />

        <Text style={styles.inputDescription}>
          Here will be some important information about {editField}.
        </Text>

        <TouchableOpacity onPress={saveResult} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
	...titleWrapper,

  ...form,

	...editFieldStyle,
});
