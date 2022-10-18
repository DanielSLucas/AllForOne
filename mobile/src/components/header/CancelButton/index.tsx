import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';

export function CancelButton() {
  const navigation = useNavigation();

  function handlePress() {
    navigation.navigate('riskLocationsMap');
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