import { useEffect, useRef, useState } from 'react';
import { Text, Linking, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcons from '@expo/vector-icons/Feather';

import { BuguerMenu } from '../../components/BuguerMenu';

import mapMarker from '../../images/mapMarker.png';
import { api } from '../../services/api';

import { styles } from './styles';

import { THEME } from '../../styles/theme';

interface RiskLocation {
  _id: string;
  location: {
    coordinates: [number, number];
  };
  risk: string;
}

export function RiskLocationsMap() {  
  const navigation = useNavigation();
  const mapRef=  useRef<MapView>(null);

  const [riskLocations, setRiskLocations] = useState<RiskLocation[]>([]);

  useEffect(() => {
    (async function navigateToCurrentLocation () {     
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
    })();        
  }, []);

  useFocusEffect(() => {
    (async function loadRiskLocations() {
      const response = await api.get<RiskLocation[]>('/riskLocation');

      setRiskLocations(response.data);
    })();
  })
  
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
        {riskLocations.map(riskLocation => (
          <Marker
            key={riskLocation._id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: riskLocation.location.coordinates[0],
              longitude: riskLocation.location.coordinates[1],
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToRiskLocationDetails(riskLocation._id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText} numberOfLines={1}>
                  {riskLocation.risk}
                </Text>
                <FeatherIcons 
                  name='chevron-right'
                  size={20}                           
                  color={THEME.COLORS.TEXT.TITLE}
                />
              </View>
            </Callout>
          </Marker>
        ))}
        
      </MapView>

      
      <RectButton style={styles.callForHelpButton} onPress={handleCallForHelp}>
        <Text style={styles.callForHelpButtonText}>Preciso de ajuda!</Text>
      </RectButton>
      
    </SafeAreaView>
  );
}