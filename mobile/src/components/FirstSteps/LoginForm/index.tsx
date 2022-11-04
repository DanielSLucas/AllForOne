import { useState } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
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
      return;
    }

    if (canSendOtp.response.statusCode === 404) {
      navigation.navigate('signUp', {
        cellphone,
      });
      return;
    }
      
    Alert.alert(
      "Celular inválido",
      "Por favor, informe um número de celular válido: (xx)9xxxx-xxxx."
    );
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