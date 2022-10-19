import { useEffect, useRef, useState } from 'react';
import { Text, Linking, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcons from '@expo/vector-icons/Feather';

import mapMarker from '../../images/mapMarker.png';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { BuguerMenu } from '../../components/BuguerMenu';

export function RiskLocationsMap() {
  const mapRef=  useRef<MapView>(null);
  const navigation = useNavigation();
  // const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {     
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {        
        return;
      }
      
      let currentPosition = await Location.getCurrentPositionAsync({});
      
      mapRef.current?.animateCamera({
        center: {
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        },
        zoom: 15
      }, { duration: 2000 });

      // setLocation(currentPosition);
    })();
  }, []);
  
  function handleCallForHelp() {
    Linking.openURL('tel:+POLICIA')
  }  

  function handleNavigateToRiskLocationDetails(riskLocationId: string) {
    navigation.navigate('riskLocationDetails', {
      riskLocationId,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <BuguerMenu />
      <MapView 
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}        
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
          <Callout tooltip onPress={() => handleNavigateToRiskLocationDetails('id')}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText} >Rua perigosa</Text>
              <FeatherIcons 
                name='chevron-right'
                size={20}                           
                style={styles.calloutIcon}
              />
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