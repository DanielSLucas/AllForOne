import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Onboarding } from '../screens/Onboarding';
import { RiskLocationsMap } from '../screens/RiskLocationsMap';

import { THEME } from '../styles/theme';
import { AddLocationButton } from '../components/header/AddLocationButton';
import { HeaderTitle } from '../components/header/HeaderTitle';

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
      <Screen 
        name="riskLocationsMap" 
        component={RiskLocationsMap}
        options={{          
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Locais de Risco"/>,
          headerRight: () => <AddLocationButton />
        }}
      />
    </Navigator>
  );
}
