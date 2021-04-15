import { Platform } from 'react-native';
const isIOS = Platform.OS === 'ios';

const NeuronDemiBold = isIOS ? 'Neuron-DemiBold' : 'NeuronDemiBold';
const NeuronBlack = isIOS ? 'Neuron-Black' : 'NeuronBlack';
// const NeuronExtraBold = isIOS ? 'Neuron-ExtraBold' : 'NeuronExtraBold';

export const ThemeColors = {
  orange: '#fc9000',
  orangeDarken: '#ff6c00',
  blue: '#0eb2bc',
};

export const ThemeFontFamily = {
  NeuronDemiBold,
	NeuronBlack,
	// NeuronExtraBold,
};
