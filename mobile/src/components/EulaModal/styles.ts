import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.SHAPE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,    
  },

  content: {
    backgroundColor: THEME.COLORS.BACKGROUND,
    height: "80%",
    width: "100%",    
    borderRadius: 8,
    overflow: 'hidden'
  },

  webView: {
    width: "100%",    
  },

  contentFooter: {
    width: "100%",
    padding: 12,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: THEME.COLORS.LIGHTER_BACKGROUND,
    
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  disagreeButton: {
    width: "49%",
    marginRight: 8,
    backgroundColor: THEME.COLORS.SHAPE
  },

  agreeButton: {
    width: "49%",
  },

  closeButton: {
    marginTop: 16,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',    
  },

  closeButtonText: {    
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.WHITE,
    textDecorationLine: 'underline',
    marginLeft: 8,
  },
});