import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';

export function CancelButton() {
  const navigation = useNavigation();

  function handlePress() {
    Alert.alert(
      'Cancelar',
      'Tem certeza que deseja cancelar a criação/edição desse local de risco?',
      [
        { text: 'Voltar', style: 'cancel' },
        { 
          text: 'Sim', 
          onPress: () => navigation.navigate('riskLocationsMap') 
        },
      ]
    )    
  }
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <FeatherIcons 
        name="x" 
        size={24} 
        color={THEME.COLORS.TEXT.COMPLEMENTARY}
      />
    </TouchableOpacity>
  );
}