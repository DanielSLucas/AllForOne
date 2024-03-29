import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,    
  },

  swiper_wrapper:{}, 
  
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
    marginHorizontal: "auto",
  },
   
  nextButton: {
    position: "absolute",
    right: 60,
    bottom: 50,
  },
  
});
