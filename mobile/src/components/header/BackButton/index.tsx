import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';

export function BackButton() {
  const navigation = useNavigation();

  function handlePress() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <FeatherIcons 
        name="arrow-left" 
        size={24} 
        color={THEME.COLORS.TEXT.COMPLEMENTARY}
      />
    </TouchableOpacity>
  );
}