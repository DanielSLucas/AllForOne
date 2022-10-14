import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link } from '@react-navigation/native';

import { Button } from '../../Button';
import { Input } from '../../Input';

import { styles } from './styles';

export function LoginForm() {
  const [cellphone, setCellphone] = useState('');
  
  return (
    <View style={styles.container}>
      <Input
        isTel 
        label="Celular" 
        value={cellphone} 
        onChangeText={text => setCellphone(text)}
      />

      <Button style={styles.continueButton} >
        Continuar
      </Button>

      <Link to="/riskLocationsMap" style={styles.link}>
        <Text style={styles.linkText}>Usar sem login</Text>
      </Link>
    </View>
  );
}