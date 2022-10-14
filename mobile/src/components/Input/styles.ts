import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT.COMPLEMENTARY,
    marginBottom: 5
  },

  input: {
    borderWidth: 1,
    borderColor: THEME.COLORS.INPUT.BORDER,
    borderRadius: 16,
  
    maxHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: THEME.COLORS.INPUT.BACKGROUND,

    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT.TITLE,
  },
});
