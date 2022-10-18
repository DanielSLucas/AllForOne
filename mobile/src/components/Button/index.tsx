import { ReactNode, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, } from 'react-native';

import { THEME } from '../../styles/theme';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {  
  children: ReactNode;
  onPressFunc?: () => Promise<void>;
}

export function Button({ style, children, onPressFunc,...rest }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  async function handlePress() {
    setIsLoading(true);
    
    onPressFunc && await onPressFunc();

    setIsLoading(false);
  }
  
  return (
    <TouchableOpacity       
      style={[styles.container, style]}
      onPress={handlePress}
      {...rest}
    >
      {isLoading
        ? <ActivityIndicator color={THEME.COLORS.WHITE}/>
        : <Text style={styles.text}>{children}</Text>
      }
    </TouchableOpacity>
  );
} 