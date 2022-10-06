import { useRef } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { Slide } from '../../components/Onboarding/Slide';

import { styles } from './styles';

import onboardingMapMarker from '../../images/onboardingMapMarker.png';
import megafone from '../../images/megafone.png';

export function Onboarding() {
  const swiper = useRef<Swiper>(null);

  return (
    <View style={styles.container}>
      <Swiper 
        ref={swiper}
        dotStyle={styles.swiper_dot}
        activeDotStyle={styles.swiper_activeDot}
        paginationStyle={styles.swiper_pagination}
        loop={false}
        style={styles.swiper_wrapper}
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
    </View>
  );
}