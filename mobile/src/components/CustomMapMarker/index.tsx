import { Marker, Callout } from 'react-native-maps';
import { View, Text, ImageURISource } from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';

import { styles } from './styles';

import { THEME } from '../../styles/theme';

interface CustomMapMarkerData {
  _id: string;
  location: {
    coordinates: [number, number];
  };
  calloutText: string;
}

interface CustomMapMarkerProps {
  icon?: number | ImageURISource | undefined;
  data: CustomMapMarkerData;
  onCalloutPress: () => void;
}

export function CustomMapMarker({ 
  icon, data, onCalloutPress 
}: CustomMapMarkerProps) {
  return (
    <Marker      
      icon={icon}
      calloutAnchor={{
        x: 2.7,
        y: 0.8,
      }}
      coordinate={{
        latitude: data.location.coordinates[0],
        longitude: data.location.coordinates[1],
      }}
    >
      <Callout tooltip onPress={onCalloutPress}>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutText} numberOfLines={1}>
            {data.calloutText}
          </Text>
          <FeatherIcons 
            name='chevron-right'
            size={20}                           
            color={THEME.COLORS.TEXT.TITLE}
          />
        </View>
      </Callout>
    </Marker>
  );
}