import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import { styles } from './styles';

export function RiskLocationForm() {
  async function handleCreateRiskLocation() {

  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Informações
      </Text>

      <View style={styles.divider} />

      <Input label='Risco'/>

      <Input 
        label='Descrição'
        maxLength={300}
        complementaryText='Máximo de 300 caracteres'
        style={styles.textArea} 
        containerStyle={styles.textAreaContainer}
      />

      <Button style={styles.createButton} onPressFunc={handleCreateRiskLocation}>
        Cadastrar
      </Button>
    </SafeAreaView>
  );
}