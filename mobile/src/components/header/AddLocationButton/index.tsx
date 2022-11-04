import { Alert, TouchableOpacity } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';

export function AddLocationButton() {
  const { user, signOut, isSessionExpired } = useAuth();
  const navigation = useNavigation();

  async function handlePress() {
    if(!user) {
      Alert.alert(
        "Usuário não encontrado!",
        "Você precisa estar logado para poder criar um novo local de risco."
      );

      return;
    }

    const sessionExpired = await isSessionExpired();
    
    if (sessionExpired) {
      Alert.alert(
        "Sessão expirada",
        "Por favor, faça login novamente."
      );
      
      try {
        await signOut()
        navigation.navigate('firstSteps');
      } catch (error: any) {
        Alert.alert(
          "Ocorreu um erro", 
          error.message
        );
      };

      return;
    }
    
    navigation.navigate('selectMapPosition', {});
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