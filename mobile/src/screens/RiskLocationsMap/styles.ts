import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BACKGROUND
  },  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  // footer: {
  //   position: 'absolute',
  //   left: 24,
  //   right: 24,
  //   bottom: 32,

  //   backgroundColor: '#FFF',
  //   borderRadius: 20,
  //   height: 56,
  //   paddingLeft: 24,

  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',

  //   elevation: 3,
  // },

  callForHelpButton: {
    position: 'absolute',    
    bottom: 32,

    width: 328,
    height: 56,
    backgroundColor: THEME.COLORS.RED,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },

  callForHelpButtonText: {
    fontFamily: THEME.FONT_FAMILY.EXTRA_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.WHITE
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    
  },

  calloutText: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.BLUE,
    marginRight: 'auto',
  },

  calloutIcon: {
    color: THEME.COLORS.TEXT.TITLE,    
  }
});