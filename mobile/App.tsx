import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { 
  Nunito_600SemiBold, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';

import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
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
    console.log('hi 1', fontsLoaded)
    return null;
  }

  return (
    <>      
      <Routes />     
      <StatusBar style="dark" />
    </>
  );  
}
