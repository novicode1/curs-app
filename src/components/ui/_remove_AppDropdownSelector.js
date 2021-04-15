import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { ThemeColors } from '../../theme';

const DEMO_OPTIONS = [
  { name: 'Rex', age: 30 },
  { name: 'Mary', age: 25 },
  { name: 'John', age: 41 },
  { name: 'Jim', age: 22 },
  { name: 'Susan', age: 52 },
  { name: 'Brent', age: 33 },
  { name: 'Alex', age: 16 },
  { name: 'Ian', age: 20 },
  { name: 'Phil', age: 24 },

  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
  { name: 'Phil', age: 24 },
];

const iconBanana = '../../../assets/img/avatars/banana.jpg';

export default ({ options_ }) => {
  const options = DEMO_OPTIONS;
  const [wrapWidth, setWrapWidth] = useState('100%');

  const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    if (rowID !== options.length - 1) {
      let key = `spr_${rowID}`;
      return <View style={styles.dropdown_separator} key={key} />;
    }
  };

  const renderButtonText = ({ name }) => name;

  const renderRow = (rowData, rowID, highlighted) => {
    let icon = highlighted ? require(iconBanana) : require(iconBanana);
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View style={styles.dropdown_row}>
          <Image style={styles.dropdown_image} mode="stretch" source={icon} />
          <Text style={styles.dropdown_row_text}>{`${rowData.name}`}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={styles.wrapper}
      onLayout={event => {
        const { width } = event.nativeEvent.layout;
        setWrapWidth(width);
      }}>
      <ModalDropdown
        style={styles.dropdown}
        textStyle={styles.dropdown_text}
        dropdownStyle={{ ...styles.dropdown_dropdown, width: wrapWidth }}
        options={options}
        renderButtonText={renderButtonText}
        renderRow={renderRow}
        defaultValue="Question pack"
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
          renderSeparator(sectionID, rowID, adjacentRowHighlighted)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  // prev
  dropdown: {
    height: 60,
    marginBottom: 100,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: ThemeColors.blue,
    // position: 'relative',
  },
  dropdown_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 26,
    fontWeight: '700',
    paddingLeft: 10,
    color: ThemeColors.blue,
    textAlignVertical: 'center',
  },
  dropdown_dropdown: {
    width: '100%',
    height: 'auto',
    maxHeight: '50%',
    position: 'relative',
    borderColor: ThemeColors.blue,
    borderWidth: 1,
    borderRadius: 3,
  },
  dropdown_row: {
    flexDirection: 'row',
    // height: 0,
    alignItems: 'center',
  },
  dropdown_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_row_text: {
    marginHorizontal: 4,
    marginVertical: 10,
    fontSize: 23,
    fontWeight: '600',
    color: ThemeColors.blue,
    textAlignVertical: 'center',
  },
  dropdown_separator: {
    height: 1,
    backgroundColor: ThemeColors.blue,
  },
});
