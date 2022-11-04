import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { Button } from '../../../components/Button';

import mapMarker from '../../../images/mapMarker.png';

import { styles } from './styles';
import { SelectMapPositionParams } from '../../../@types/navigation';

export function SelectMapPosition() {
  const mapRef=  useRef<MapView>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { riskLocation } = route.params as SelectMapPositionParams;
  const [position, setPosition] = useState({
    latitude: riskLocation?.location.coordinates[0] || 0,
    longitude: riskLocation?.location.coordinates[1] || 0
  });

  async function handleNextStep() {
    navigation.navigate('riskLocationForm', { 
      position,
      riskLocation,
    });
  };

  function handleSelectMapPosition (event: MapEvent) {    
    setPosition(event.nativeEvent.coordinate);
  };
  
  useEffect(() => {    
    (async function navigateToCurrentLocation () {
      if (riskLocation) return;

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
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        {...(
          riskLocation 
          ? { initialRegion: {
            latitude: riskLocation.location.coordinates[0],
            longitude: riskLocation.location.coordinates[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          } }
          : {}
        )}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.longitude !== 0 && (
          <Marker
            icon={mapMarker}
            coordinate={{ 
              latitude: position.latitude, 
              longitude: position.longitude 
            }}
          />
        )}
      </MapView>


      {position.longitude !== 0 && (
        <Button onPressFunc={handleNextStep} style={styles.nextButton}>
          Próximo
        </Button>
      )}

    </View>
  );
}