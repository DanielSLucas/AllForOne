import { Dimensions, StyleSheet } from 'react-native';

import { THEME } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BACKGROUND
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    position: 'absolute',    
    bottom: 32,

    width: 328,
    height: 56,    
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});