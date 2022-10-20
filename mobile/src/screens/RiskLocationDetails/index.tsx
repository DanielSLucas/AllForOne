import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RiskLocationDetailsParams } from '../../@types/navigation';

import mapMarker from '../../images/mapMarker.png';
import { api } from '../../services/api';
import { THEME } from '../../styles/theme';

import { styles } from './styles';

interface RiskLocation {
  location: {
    coordinates: [number, number];
  };
  risk: string;
  description: string;  
}

export function RiskLocationDetails() {
  const route = useRoute();
  const { riskLocationId } = route.params as RiskLocationDetailsParams;
  const [riskLocation, setRiskLocation] = useState<RiskLocation>()
  

  useEffect(() => {
    (async () => {      
      const response = await api.get<RiskLocation>(
        `/riskLocation/${riskLocationId}`
      );

      setRiskLocation(response.data)      
    })()
  }, [])

  if (!riskLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          color={THEME.COLORS.BLUE}
          size="large"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude: riskLocation.location.coordinates[0],
            longitude: riskLocation.location.coordinates[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          style={styles.mapStyle}
        >
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: riskLocation.location.coordinates[0],
              longitude: riskLocation.location.coordinates[1],
            }}
          />
        </MapView>
      </View>

      <View style={styles.content}>
        <Text style={styles.riskTitle}>
          {riskLocation.risk}
        </Text>

        <Text style={styles.riskDescription}>
          {riskLocation.description}
        </Text>
      </View>
    </View>
  );
}