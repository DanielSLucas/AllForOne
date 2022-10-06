import { Text } from 'react-native';

import { THEME } from '../../../styles/theme';

interface HeaderTitleProps {
  children: string;
  tintColor?: string | undefined;
  title: string;
}

export function HeaderTitle({title, ...props}: HeaderTitleProps) {
  return (
    <Text 
      style={{
        color: THEME.COLORS.TEXT.TITLE,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.LG,                  
      }}
      {...props}
    >
      {title}
    </Text>
  );
}