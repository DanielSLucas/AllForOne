import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { OtpInput } from '../../components/OtpInput';

import { styles } from './styles';

export function SignIn() {
  const navigation = useNavigation();
  
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  async function handleSignIn() {
    if (!value){
      setError(true);
      return;
    }
    
    const logedIn = (() => true)();

    if (logedIn) {
      setError(false);
      navigation.navigate('riskLocationsMap');
    } else {
      setError(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Valide seu login</Text>

        <OtpInput 
          value={value}
          setValue={setValue}
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