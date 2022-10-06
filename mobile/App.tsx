import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { 
  Nunito_400Regular,
  Nunito_600SemiBold, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';

import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold,
  });  
  
  useEffect(() => {    
    if (fontsLoaded) {      
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {    
    return null;
  }

  return (
    <>      
      <Routes />     
      <StatusBar style="dark" />
    </>
  );  
}
