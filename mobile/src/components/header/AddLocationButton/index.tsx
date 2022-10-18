import { TouchableOpacity } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';

export function AddLocationButton() {
  const navigation = useNavigation();

  function handlePress() {
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