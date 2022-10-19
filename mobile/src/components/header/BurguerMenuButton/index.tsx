import { TouchableOpacity } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { THEME } from '../../../styles/theme';
import { useBuguerMenu } from '../../../hooks/buguerMenu';

export function BurguerMenuButton() {
  const { toggleMenu } = useBuguerMenu();
  
  return (
    <TouchableOpacity onPress={toggleMenu}>
      <FeatherIcons 
        name="menu" 
        size={24} 
        color={THEME.COLORS.TEXT.COMPLEMENTARY}
      />
    </TouchableOpacity>
  );
}