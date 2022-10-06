import { useEffect, useState } from 'react';
import { Text, Linking, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import mapMarker from '../../images/mapMarker.png';

import { styles } from './styles';

export function RiskLocationsMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {        
        return;
      }

      let currentPosition = await Location.getCurrentPositionAsync({});
      setLocation(currentPosition);
    })();
  }, []);
  
  function handleCallForHelp() {
    Linking.openURL('tel:+POLICIA')
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}    
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -22.7849967,
            longitude: -45.165675,
          }}
        >
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText} >Rua perigosa</Text>
            </View>
          </Callout>
        </Marker>

      </MapView>

      
      <RectButton style={styles.callForHelpButton} onPress={handleCallForHelp}>
        <Text style={styles.callForHelpButtonText}>Preciso de ajuda!</Text>
      </RectButton>
      
    </SafeAreaView>
  );
}