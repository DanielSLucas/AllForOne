import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,    
  },

  swiper_wrapper:{
    // flex: 1
  }, 
  swiper_dot: {
    backgroundColor: THEME.COLORS.SHAPE, 
    width: 6, 
    height: 6,
    borderRadius: 3, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },
  swiper_activeDot: {
    backgroundColor: THEME.COLORS.PURPLE, 
    width: 6, 
    height: 6, 
    borderRadius: 3,
  },
  swiper_pagination: {
    position: "absolute",
    bottom: 60,
    right: "auto",
    left: 50,
  },
   

  // slide: {
  //   flex: 1,
  //   alignItems: "center",
  // },

  // pageNumber: {
  //   fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
  //   fontSize: THEME.FONT_SIZE.XXL,
  //   color: THEME.COLORS.TEXT.TITLE,
  //   opacity: 0.2,
  //   marginBottom: 20,
  // },
});