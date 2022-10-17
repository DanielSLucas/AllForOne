import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,

    paddingVertical: 12,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: THEME.BORDER_RADIUS.LG,
    
    backgroundColor: THEME.COLORS.PURPLE,
  },

  text: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.EXTRA_BOLD,
    fontSize: THEME.FONT_SIZE.MD
  }
});