import { Alert, TouchableOpacity } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';

export function AddLocationButton() {
  const { user } = useAuth();
  const navigation = useNavigation();

  function handlePress() {
    if(!user) {
      Alert.alert(
        "Usuário não encontrado!",
        "Você precisa estar logado para poder criar um novo local de risco."
      );

      return;
    }
    
    navigation.navigate('selectMapPosition');
  }
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <FeatherIcons 
        name="plus" 
        size={24} 
        color={THEME.COLORS.TEXT.COMPLEMENTARY}
      />
    </TouchableOpacity>
  );
}