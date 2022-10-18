import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    width: "100%",
    padding: 24,
    marginBottom: 40,  
  },

  title: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XL,
    color: THEME.COLORS.TEXT.TITLE,
  },

  description: {
    marginTop: 8,
    alignSelf: 'center',
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XSM,
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
  },

  error: {
    color: THEME.COLORS.RED,
  },

  signInButton: {
    marginTop: 32
  },
});