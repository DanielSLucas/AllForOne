import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';

import { Button } from '../../Button';
import { Input } from '../../Input';

import { styles } from './styles';

export function LoginForm() {
  const navigation = useNavigation();
  const [cellphone, setCellphone] = useState('');
  
  function handleSubmit() {
    
    const userAlreadyExists = (() => {
      return true;
    })();
    
    if(userAlreadyExists) {
      navigation.navigate('signIn');  
    } else {
      navigation.navigate('signUp', {
        cellphone,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Input
        isTel 
        label="Celular" 
        value={cellphone} 
        onChangeText={text => setCellphone(text)}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />

      <Button style={styles.continueButton} onPress={handleSubmit}>
        Continuar
      </Button>

      <Link to="/riskLocationsMap" style={styles.link}>
        <Text style={styles.linkText}>Usar sem login</Text>
      </Link>
    </View>
  );
}