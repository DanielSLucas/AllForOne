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

  button: {
    marginTop: 24,
  },

  footer: {
    
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
});