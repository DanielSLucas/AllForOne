import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

export function RiskLocationsMap() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Main map</Text>
    </SafeAreaView>
  );
}