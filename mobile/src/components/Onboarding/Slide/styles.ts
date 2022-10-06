import { StyleSheet } from 'react-native';
import { THEME } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  
  header: {    
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "45%",
  },

  main: {
    justifyContent: "center",
    height: "40%",
    width: "80%",
  },

  pageNumber: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: 40,
    color: THEME.COLORS.TEXT.TITLE,
    opacity: 0.2,
    marginBottom: 20,
  },

  description: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: 24,
    color: THEME.COLORS.TEXT.TITLE,
  },

});
