import { useEffect, useRef, useState } from 'react';
import { Text, Linking, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { debounce } from 'lodash';

import { BuguerMenu } from '../../components/BuguerMenu';
import { CustomMapMarker } from '../../components/CustomMapMarker';

import mapMarker from '../../images/mapMarker.png';
import mapAdMarker from '../../images/mapAdMarker.png';

import { styles } from './styles';

import { api } from '../../services/api';

interface RiskLocation {
  _id: string;
  location: {
    coordinates: [number, number];
  };
  risk: string;
}

export function RiskLocationsMap() {  
  const { isLoaded, load, isClosed, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });  
  const navigation = useNavigation();
  const mapRef=  useRef<MapView>(null);

  const [riskLocations, setRiskLocations] = useState<RiskLocation[]>([]);
  const [mapAdLocation, setMapAdLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    load();
  }, [load, isClosed])

  useEffect(() => {    
    (async function navigateToCurrentLocation () {     
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {        
        return;
      }
      
      let currentPosition = await Location.getCurrentPositionAsync({});
      
      setMapAdLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });

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

  async function openAd () {    
    if (isLoaded) {
      show();
    }    
  }

  async function handleChangeRegion(region: Region) {
    deboucedRegionChange(region);
  }

  const deboucedRegionChange = useRef(
    debounce((region: Region) => {
      const plusOrMinus = () => Math.random() < 0.5 ? -1 : 1;
      const distance = (delta: number) => (Math.random() * delta)/4;

      setMapAdLocation({
        latitude: region.latitude + (plusOrMinus() * distance(region.latitudeDelta)),
        longitude: region.longitude + (plusOrMinus() * distance(region.longitudeDelta)),
      });
    }, 2000) 
  ).current;

  useEffect(() => {
    return () => {
      deboucedRegionChange.cancel();
    };
  }, [deboucedRegionChange]);

  return (
    <SafeAreaView style={styles.container}>
      <BuguerMenu />
      <MapView 
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onRegionChange={handleChangeRegion}        
      >
        {isLoaded && (
          <CustomMapMarker          
            icon={mapAdMarker}
            data={{
              _id: 'ad',
              location: {
                coordinates: [
                  mapAdLocation.latitude, 
                  mapAdLocation.longitude
                ]
              },
              calloutText: "Ajude-nos"
            }}
            onCalloutPress={openAd}
          />
        )}

        {riskLocations.map(riskLocation => (
          <CustomMapMarker
            key={riskLocation._id}
            icon={mapMarker}
            data={{ ...riskLocation, calloutText: riskLocation.risk }}
            onCalloutPress={() => handleNavigateToRiskLocationDetails(riskLocation._id)}
          />
        ))}        
      </MapView>
      
      <TouchableOpacity style={styles.callForHelpButton} onPress={handleCallForHelp}>
        <Text style={styles.callForHelpButtonText}>
          Preciso de ajuda
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}