import { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../hooks/auth';

import { Button } from '../../Button';
import { Input } from '../../Input';

import { styles } from './styles';

export function LoginForm() {
  const navigation = useNavigation();
  const { sendOtp } = useAuth();
  const [cellphone, setCellphone] = useState('');
  
  async function handleSubmit() {
    const serializedCellphone = cellphone.replace(/\D/g, '');

    const canSendOtp = await sendOtp(serializedCellphone)  

    if(canSendOtp.success) {
      navigation.navigate('signIn', {
        cellphone,
      });  
    } else {      
      navigation.navigate('signUp', {
        cellphone,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Input
        isTel={Platform.OS === "android"}
        keyboardType="number-pad" 
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