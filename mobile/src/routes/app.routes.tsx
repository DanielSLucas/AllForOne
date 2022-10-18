import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FirstSteps } from '../screens/FirstSteps';
import { RiskLocationsMap } from '../screens/RiskLocationsMap';
import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';
import { RiskLocationDetails } from '../screens/RiskLocationDetails';
import { SelectMapPosition } from '../screens/CreateRiskLocation/SelectMapPosition';
import { RiskLocationForm } from '../screens/CreateRiskLocation/RiskLocationForm';

import { AddLocationButton } from '../components/header/AddLocationButton';
import { HeaderTitle } from '../components/header/HeaderTitle';
import { CancelButton } from '../components/header/CancelButton';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen 
        name="firstSteps" 
        component={FirstSteps} 
        options={{ headerShown: false }}
      />

      <Screen 
        name="riskLocationsMap" 
        component={RiskLocationsMap}
        options={{          
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Locais de Risco"/>,
          headerRight: () => <AddLocationButton />
        }}
      />

      <Screen 
        name='signUp' 
        component={SignUp}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Cadastro"/>,
        }}
      />

      <Screen 
        name='signIn' 
        component={SignIn}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Entrar"/>,
        }}
      />

      <Screen 
        name='riskLocationDetails' 
        component={RiskLocationDetails}        
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Local de risco"/>,
        }}
      />

      <Screen 
        name='selectMapPosition' 
        component={SelectMapPosition}        
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Adicionar local de risco"/>,
        }}
      />

      <Screen
        name='riskLocationForm' 
        component={RiskLocationForm}        
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <HeaderTitle {...props} title="Adicionar local de risco"/>,
          headerRight: () => <CancelButton />
        }}
      />
    </Navigator>
  );
}
