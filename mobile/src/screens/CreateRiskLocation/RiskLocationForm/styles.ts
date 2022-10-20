import { StyleSheet } from 'react-native';
import { THEME } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,    
    paddingHorizontal: 24,    
  },
  
  content: {
    flex: 1,
  },

  title: {
    color: THEME.COLORS.TEXT.TITLE,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,  
  },

  divider: {
    width: "100%",
    height: 1,
    
    marginVertical: 24,

    backgroundColor: THEME.COLORS.SHAPE,
  },

  textAreaContainer: {
    marginTop: 24,
  },

  textArea: {
    height: 112,
    textAlignVertical: 'top',
  },

  createButton: {
    marginTop: 'auto',
    height: 56,
    marginBottom: 80,
  },
});