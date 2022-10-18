import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  loadingContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },

  mapContainer: {
    width: '100%',
    height: 196,

    borderRadius: THEME.BORDER_RADIUS.LG,
    borderWidth: 1,
    borderColor: THEME.COLORS.INPUT.BORDER,

    overflow: 'hidden',
  },

  mapStyle: {
    width: '100%',
    height: 196,
  },

  content: {
    width: '100%',
    marginTop: 32,
  },

  riskTitle: {
    color: THEME.COLORS.TEXT.TITLE,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
  },

  riskDescription: {
    marginTop: 16,

    color: THEME.COLORS.TEXT.COMPLEMENTARY,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,    
    textAlign: 'justify'
  },
});