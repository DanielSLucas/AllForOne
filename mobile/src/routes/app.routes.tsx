import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RiskLocationsMap } from '../screens/RiskLocationsMap';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen name="RiskLocationsMap" component={RiskLocationsMap}/>      
    </Navigator>
  );
}
