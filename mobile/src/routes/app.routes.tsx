import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from '../screens/Onboarding';

import { RiskLocationsMap } from '../screens/RiskLocationsMap';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
      {/* <Screen name="RiskLocationsMap" component={RiskLocationsMap}/> */}
    </Navigator>
  );
}
