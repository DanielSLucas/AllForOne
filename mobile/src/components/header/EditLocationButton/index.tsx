import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../../hooks/auth';

import { RiskLocationDetailsParams } from '../../../@types/navigation';
import { RiskLocation } from '../../../screens/RiskLocationDetails';
import { api } from '../../../services/api';

import { THEME } from '../../../styles/theme';

export function EditLocationButton() {
  const { user, signOut, isSessionExpired } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { riskLocationId } = route.params as RiskLocationDetailsParams;
  
  const [riskLocation, setRiskLocation] = useState<RiskLocation>()  

  useEffect(() => {
    (async () => {      
      const response = await api.get<RiskLocation>(
        `/riskLocation/${riskLocationId}`
      );

      setRiskLocation(response.data)      
    })()
  }, [])

  async function handlePress() {
    if(!user) {
      Alert.alert(
        "Usuário não encontrado!",
        "Você precisa estar logado para poder editar um local de risco."
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
    
    navigation.navigate('selectMapPosition', {
      riskLocation,
    });
  }
  
  if (riskLocation?.created_by !== user?._id) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <FeatherIcons 
        name="edit-3"
        size={24} 
        color={THEME.COLORS.TEXT.COMPLEMENTARY}
      />
    </TouchableOpacity>
  );
}