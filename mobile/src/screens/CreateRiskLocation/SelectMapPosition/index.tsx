import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { Button } from '../../../components/Button';

import mapMarker from '../../../images/mapMarker.png';

import { styles } from './styles';

export function SelectMapPosition() {
  const mapRef=  useRef<MapView>(null);
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  async function handleNextStep() {
    navigation.navigate('riskLocationForm', { position });
  };

  function handleSelectMapPosition (event: MapEvent) {    
    setPosition(event.nativeEvent.coordinate);
  };
  
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
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
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