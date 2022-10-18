import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: 'relative',
  },

  error: {
    borderColor: THEME.COLORS.RED,
    borderWidth: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  label: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
    marginBottom: 5
  },

  complementaryText: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.XSM,
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
  },

  input: {
    borderWidth: 1,
    borderColor: THEME.COLORS.INPUT.BORDER,
    borderRadius: 16,
  
    height: 52,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: THEME.COLORS.INPUT.BACKGROUND,

    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT.TITLE,
  },

  inputFocus: {
    width: "80%",
    height: 2,
    backgroundColor: THEME.COLORS.PURPLE,
    position: "absolute",
    bottom: 0,
    alignSelf: 'center'
  },

});
