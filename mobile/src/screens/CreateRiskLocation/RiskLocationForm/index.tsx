import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../../hooks/auth';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import { RiskLocationFormParams } from '../../../@types/navigation';
import { api } from '../../../services/api';

import { styles } from './styles';

export function RiskLocationForm() {
  const navigation = useNavigation()
  const { user } = useAuth();
  
  const route = useRoute();
  const { position } = route.params as RiskLocationFormParams;

  const [risk, setRisk] = useState('');
  const [riskError, setRiskError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  
  async function handleCreateRiskLocation() {
    if(!risk || !description) {
      !risk ? setRiskError(true) : setRiskError(false);
      !description ? setDescriptionError(true) : setDescriptionError(false);

      Alert.alert(
        "Valor inválido!", 
        "Por favor preencha todos os campos com valores válidos."
      );

      return;
    }
    
    setRiskError(false);
    setDescriptionError(false);

    const data = {
      coords: {
        lat: position.latitude,
        long: position.longitude,
      },	
      risk,
      description,
      created_by: user?._id
    };
    
    try {
      await api.post('/riskLocation', data)

      navigation.navigate('riskLocationsMap');
    } catch (error: any) {
      Alert.alert(
        "Ocorreu um erro", 
        error.message
      );
    }    
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Informações
      </Text>

      <View style={styles.divider} />

      <Input 
        label='Risco'
        error={riskError}
        maxLength={30}
        complementaryText='Máximo de 30 caracteres'
        value={risk}
        onChangeText={(text) => setRisk(text)}
      />

      <Input 
        label='Descrição'
        error={descriptionError}
        maxLength={200}
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
        complementaryText='Máximo de 200 caracteres'
        style={styles.textArea} 
        containerStyle={styles.textAreaContainer}
      />

      <Button style={styles.createButton} onPressFunc={handleCreateRiskLocation}>
        Cadastrar
      </Button>
    </SafeAreaView>
  );
}