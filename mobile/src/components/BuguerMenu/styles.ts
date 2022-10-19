import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    backgroundColor: THEME.COLORS.BACKGROUND,
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

  linksContainer: {

  },

  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },  
  
  linkText: {
    marginLeft: 16,

    color: THEME.COLORS.TEXT.TITLE,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD
  },

  footer: {
    marginTop: "auto",
    
  },

  footerText: {
    textAlign: 'center',

    color: THEME.COLORS.TEXT.TITLE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM
  },

});