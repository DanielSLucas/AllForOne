import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { OtpInput } from '../../components/OtpInput';

import { SignInParams } from '../../@types/navigation';

import { styles } from './styles';

export function SignIn() {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const route = useRoute();
  const { cellphone } = route.params as SignInParams;
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);

  async function handleSignIn() {
    const isValidOtp = /^\d{4}$/;
    
    if (!otp || !isValidOtp.test(otp)){
      setError(true);
      return;
    }
    
    setError(false);

    try {
      await signIn({
        username: cellphone.replace(/\D/g, ''),
        password: otp
      });

      navigation.navigate('riskLocationsMap');
    } catch (error: any) {
      setError(true);
      Alert.alert(
        "Ocorreu um erro",
        error.message
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Valide seu login</Text>

        <OtpInput 
          value={otp}
          setValue={setOtp}
        />

        <Text style={[styles.description, error ? styles.error : {}]}>
          {error 
            ? 'Código inválido! Tente novamente.'
            : 'Código de 4 dígitos enviados via SMS'
          }
        </Text>

        <Button style={styles.signInButton} onPressFunc={handleSignIn}>
          Entrar
        </Button>
      </View>
    </View>
  );
}