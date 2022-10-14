import { StyleSheet } from 'react-native';
import { THEME } from '../../../styles/theme';

export const styles = StyleSheet.create({
  pageNumber: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.XXL,
    color: THEME.COLORS.TEXT.TITLE,
    opacity: 0.2,
    marginBottom: 20,
    marginRight: 12,
  },

  content: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XL,
    color: THEME.COLORS.TEXT.TITLE,
  },
});