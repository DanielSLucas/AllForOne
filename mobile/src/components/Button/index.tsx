import { ReactNode } from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

interface ButtonProps extends RectButtonProps {  
  children: ReactNode;
}

export function Button({ style, children, ...rest }: ButtonProps) {
  return (
    <RectButton       
      style={[styles.container, style]} 
      {...rest}
    >
      <Text style={styles.text}>{children}</Text>
    </RectButton>
  );
} 