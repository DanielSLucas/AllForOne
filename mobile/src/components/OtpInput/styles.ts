import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export default StyleSheet.create({
  codeFieldRoot: {
    marginTop: 24,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: THEME.COLORS.SHAPE,
    borderBottomWidth: 1,
  },

  cellText: {
    color: THEME.COLORS.TEXT.REGULAR,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.XXL,
    textAlign: 'center',
  },

  focusCell: {
    borderBottomColor: THEME.COLORS.PURPLE,
    borderBottomWidth: 2,
  },
});