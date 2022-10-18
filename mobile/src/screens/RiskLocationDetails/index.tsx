import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../../images/mapMarker.png';
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
  const [riskLocation, setRiskLocation] = useState<RiskLocation>()
  

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setRiskLocation({
          location: {
            coordinates: [-22.7849967, -45.165675]
          },
          risk: "Rua perigosa",
          description: "Essa rua está com problema de iluminação, então geralemente ela é bem deserta. Melhor evitar."
        })
      }, 500);
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