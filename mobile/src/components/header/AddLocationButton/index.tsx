import { TouchableOpacity } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { THEME } from '../../../styles/theme';

export function AddLocationButton() {
  function handlePress() {
    AsyncStorage.removeItem('isFirstTime');
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