import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Slide } from '../../components/Onboarding/Slide';

import { styles } from './styles';

import onboardingMapMarker from '../../images/onboardingMapMarker.png';
import megafone from '../../images/megafone.png';
import { THEME } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

export function Onboarding() {
  const swiper = useRef<Swiper>(null);
  const navigator = useNavigation();

  const [currentPage, setCurrentPage] = useState(0);

  function handleNext () {
    if(currentPage === 1) {
      navigator.navigate("riskLocationsMap");
      AsyncStorage.setItem('isFirstTime', "false");
      return;
    }
    swiper.current?.scrollBy(1);
  }

  return (
    <View style={styles.container}>
      <Swiper 
        ref={swiper}
        dotStyle={styles.swiper_dot}
        activeDotStyle={styles.swiper_activeDot}
        paginationStyle={styles.swiper_pagination}
        loop={false}
        style={styles.swiper_wrapper}
        onIndexChanged={i => setCurrentPage(i)}
      >
        <Slide 
          pageNumber={1}
          description={'Evite locais de \nrisco e avise outras \nmulheres sobre que \nlocais evitar.'}
          img={onboardingMapMarker}
          imgStyles={{ width: 120, height: 140 }}
        />
        
        <Slide 
          pageNumber={2}
          description={'Peça por ajuda \nquando se encontrar \nem uma situação \nde risco.'}
          img={megafone}
          imgStyles={{ width: 163.92, height: 163.92 }}
          reverseGradient
        />

      </Swiper>

      <TouchableOpacity 
        style={styles.nextButton}
        onPress={handleNext}
      >
        <MaterialIcons 
          name="arrow-right-alt" 
          size={40} 
          color={THEME.COLORS.TEXT.TITLE}
        />
      </TouchableOpacity>
    </View>
  );
}