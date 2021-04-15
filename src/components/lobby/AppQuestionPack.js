import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { ThemeColors, ThemeFontFamily } from '../../theme';

// import AppDropdownSelector from '../ui/AppDropdownSelector';

const DEMO_OPTIONS = [
  { name: 'Rex' },
  { name: 'Mary' },
  { name: 'John' },
  { name: 'Jim' },
  { name: 'Susan' },
  {
    name:
      'Brent asjhkd asjhd ajsd asjdh asdjkh asjdh asjdh asjdhg  ajshdag ksd  asjhd ',
  },
  { name: 'Alex' },
  { name: 'Ian' },
  { name: 'Phil' },

  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
  { name: 'Phil' },
];

const iconBanana = '../../../assets/img/avatars/banana.jpg';

export default ({ selectedId, setter, options = [] }) => {
  // useEffect(() => {
  //   if (all.length) {
  //     set(all[0]._id);
  //   }
  // }, [all, set]);

  // const options = DEMO_OPTIONS;
  const [wrapWidth, setWrapWidth] = useState('100%');

  const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    if (rowID !== options.length - 1) {
      let key = `spr_${rowID}`;
      return <View style={styles.dropdown_separator} key={key} />;
    }
  };

  const renderButtonText = ({ title }) => title;

  const onSelect = (id, value) => setter(value._id);

  const renderRow = (rowData, rowID, highlighted) => {
    const icon = highlighted ? require(iconBanana) : require(iconBanana);
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View style={styles.dropdown_row}>
          {/* <Image style={styles.dropdown_image} mode="stretch" source={icon} /> */}
          <Text style={styles.dropdown_row_text}>{`${rowData.title}`}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View
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
        onSelect={onSelect}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
          renderSeparator(sectionID, rowID, adjacentRowHighlighted)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // prev
  dropdown: {
    marginBottom: 30,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: ThemeColors.blue,
    // paddingVertical: 5,
    // position: 'relative',
  },
  dropdown_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 34,
    fontWeight: '800',
    paddingLeft: 10,
    color: ThemeColors.blue,
    textAlignVertical: 'center',
    fontFamily: ThemeFontFamily.NeuronBlack,
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
    paddingLeft: 10,
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
    fontSize: 27,
    fontWeight: '600',
    color: ThemeColors.blue,
    textAlignVertical: 'center',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  dropdown_separator: {
    height: 1,
    backgroundColor: ThemeColors.blue,
  },
});
