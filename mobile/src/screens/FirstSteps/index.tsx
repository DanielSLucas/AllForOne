import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { Slide } from '../../components/FirstSteps/Slide';
import { PageHeader } from '../../components/FirstSteps/PageHeader';
import { LoginForm } from '../../components/FirstSteps/LoginForm';

import { styles } from './styles';

import onboardingMapMarker from '../../images/onboardingMapMarker.png';
import megafone from '../../images/megafone.png';
import brand from '../../images/brand.png';

export function FirstSteps() {
  const swiper = useRef<Swiper>(null);  

  const [currentPage, setCurrentPage] = useState(0);
  
  const [isFirstTime, setIsFirstTime] = useState(true); 
  
  useEffect(() => {
    AsyncStorage.getItem('isFirstTime').then(response => {
      if (!response) {
        setIsFirstTime(true)
      } else {
        setIsFirstTime(false)
      }
    });
  }, []);

  useEffect(() => {
    if(currentPage === 1) {      
      AsyncStorage.setItem('isFirstTime', "false");
      return;
    }
  }, [currentPage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
      enabled
    >
      <Swiper 
        ref={swiper}
        dotStyle={styles.swiper_dot}
        activeDotStyle={styles.swiper_activeDot}
        paginationStyle={styles.swiper_pagination}
        loop={false}
        style={styles.swiper_wrapper}
        onIndexChanged={i => setCurrentPage(i)}
      >
        {isFirstTime && (          
          <Slide           
            img={onboardingMapMarker}
            imgStyles={{ width: 120, height: 140 }}
          >
            <PageHeader pageNumber={1}>
              Evite locais de {'\n'}
              risco e avise outras {'\n'}
              mulheres sobre que {'\n'}
              locais evitar.
            </PageHeader>
          </Slide>          
        )}

        {isFirstTime && (
          <Slide           
            img={megafone}
            imgStyles={{ width: 163.92, height: 163.92 }}
            reverseGradient
          >
            <PageHeader pageNumber={2}>
              Peça por ajuda {'\n'}
              quando se encontrar {'\n'}
              em uma situação {'\n'}
              de risco.
            </PageHeader>          
          </Slide>
        )}
        
        <Slide           
          img={brand}
          imgStyles={{ width: 246, height: 152 }}          
        >
          <PageHeader 
            pageNumber={3} 
            style={{ flexDirection: 'row', alignItems: 'baseline'}}
          >
            Login
          </PageHeader>

          <LoginForm />
        </Slide>
      </Swiper>
    </KeyboardAvoidingView>
  );
}