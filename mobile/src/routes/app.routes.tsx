import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from '../screens/Onboarding';

import { RiskLocationsMap } from '../screens/RiskLocationsMap';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const [isFirstTime, setIsFirstTime] = useState(true); 
  
  useEffect(() => {
    AsyncStorage.getItem('isFirstTime').then(response => {
      if (!response) {
        setIsFirstTime(true)
      } else {
        setIsFirstTime(false)
      }
    });
  }, []);

  return (
    <Navigator screenOptions={{ headerShown: true }}>
      {isFirstTime && <Screen name="onboarding" component={Onboarding} options={{ headerShown: false }}/>}
      <Screen name="riskLocationsMap" component={RiskLocationsMap}/>
    </Navigator>
  );
}
