import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Button } from '../../../components/Button';

import mapMarker from '../../../images/mapMarker.png';

import { styles } from './styles';

export function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  async function handleNextStep() {
    navigation.navigate('riskLocationForm', { position });
  };

  function handleSelectMapPosition (event: MapEvent) {
    console.log(event.nativeEvent.coordinate);
    setPosition(event.nativeEvent.coordinate);
  };
  
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.7825015,
          longitude: -45.1684859,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
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