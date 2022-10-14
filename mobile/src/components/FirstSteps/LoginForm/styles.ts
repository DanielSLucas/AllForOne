import { StyleSheet } from 'react-native';

import { THEME } from '../../../styles/theme';

export const styles = StyleSheet.create({  
  container: {
    alignItems: 'center',
  },

  continueButton: {
    marginTop: 16
  },

  link: {
    marginTop: 12
  },

  linkText: {
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
    
    textDecorationLine: 'underline',
    textDecorationColor: THEME.COLORS.TEXT.COMPLEMENTARY,
    
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XSM,
  }
});
