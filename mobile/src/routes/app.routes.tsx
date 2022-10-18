import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FirstSteps } from '../screens/FirstSteps';
import { RiskLocationsMap } from '../screens/RiskLocationsMap';

import { AddLocationButton } from '../components/header/AddLocationButton';
import { HeaderTitle } from '../components/header/HeaderTitle';
import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';

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
    </Navigator>
  );
}
