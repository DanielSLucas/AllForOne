import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { styles } from './styles';

interface InputProps extends TextInputProps {
  label: string;
  isTel?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
}


const Input: React.ForwardRefRenderFunction<TextInput, InputProps> = ({ 
  label, 
  isTel, 
  containerStyle, 
  style,
  value,
  error,
  ...rest
}: InputProps, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  function handleInputFocus ()  {
    setIsFocused(true);
  }

  function handleInputBlur () {
    setIsFocused(false);
  };

  return(
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label}
      </Text>

      { isTel
        ? (
          <TextInputMask            
            type={"cel-phone"} 
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99)'
            }}
            style={[styles.input, style, error ? styles.error : {}]}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
        )
        : (
          <TextInput 
            ref={ref}
            style={[styles.input, style, error ? styles.error : {}]}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest} 
          />
        )
      }
      {(isFocused && !error) && <View style={styles.inputFocus}></View>}
    </View>
  );
}

const fowardRefInput = forwardRef(Input);

export {
  fowardRefInput as Input
}