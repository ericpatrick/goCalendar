import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  basePadding: 10,
  baseMargin: 10,
  baseRadius: 5,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
