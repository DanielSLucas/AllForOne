import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FirstSteps } from '../screens/FirstSteps';
import { Forum } from '../screens/Forum';
import { RiskLocationDetails } from '../screens/RiskLocationDetails';
import { RiskLocationForm } from '../screens/CreateRiskLocation/RiskLocationForm';
import { RiskLocationsMap } from '../screens/RiskLocationsMap';
import { SelectMapPosition } from '../screens/CreateRiskLocation/SelectMapPosition';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

import { AddLocationButton } from '../components/header/AddLocationButton';
import { BackButton } from '../components/header/BackButton';
import { BurguerMenuButton } from '../components/header/BurguerMenuButton';
import { CancelButton } from '../components/header/CancelButton';
import { HeaderTitle } from '../components/header/HeaderTitle';

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
          headerTitleAlign: "center",
          headerLeft: () => <BurguerMenuButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Locais de Risco"/>,
          headerRight: () => <AddLocationButton />
        }}
      />

      <Screen 
        name='signUp' 
        component={SignUp}
        options={{
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Cadastro"/>,
        }}
      />

      <Screen 
        name='signIn' 
        component={SignIn}
        options={{
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Entrar"/>,          
        }}
      />

      <Screen 
        name='riskLocationDetails' 
        component={RiskLocationDetails}        
        options={{
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Local de risco"/>,
        }}
      />

      <Screen 
        name='selectMapPosition' 
        component={SelectMapPosition}        
        options={{
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Adicionar local de risco"/>,
        }}
      />

      <Screen
        name='riskLocationForm' 
        component={RiskLocationForm}        
        options={{
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Adicionar local de risco"/>,
          headerRight: () => <CancelButton />
        }}
      />

      <Screen
        name='forum' 
        component={Forum}        
        options={{          
          headerTitleAlign: "center",
          headerLeft: () => <BurguerMenuButton />,
          headerTitle: (props) => <HeaderTitle {...props} title="Forum"/>,          
        }}
      />
    </Navigator>
  );
}
