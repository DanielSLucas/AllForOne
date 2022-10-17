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

  formItem: {
    marginTop: 16,
  },

  checkboxContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    marginHorizontal: 8,    
  },

  checkboxText: {    
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.XSM,
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
  },

  checkboxBoldText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XSM,
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
    textDecorationLine: "underline",
  }
});