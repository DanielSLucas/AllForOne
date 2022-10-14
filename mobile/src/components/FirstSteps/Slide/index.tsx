import { 
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text, 
  View 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';

import { THEME } from '../../../styles/theme';
import { ReactNode } from 'react';

interface SlideProps {
  reverseGradient?: boolean;
  img: ImageSourcePropType;
  imgStyles: StyleProp<ImageStyle>,
  children: ReactNode;
}

export function Slide({ 
  reverseGradient, 
  img,
  imgStyles,
  children
}: SlideProps) {
  return (
    <View style={styles.container}>
      <StatusBar  style="light" backgroundColor="transparent" translucent/>
      
      <LinearGradient 
        end={reverseGradient ? { x: 1, y: 0 } : { x: 1, y: 1 }}
        start={reverseGradient ? { x: 0, y: 1 } : { x: 0, y: 0 }}
        colors={reverseGradient ? THEME.COLORS.GRADIENT_REVERSE :THEME.COLORS.GRADIENT} 
        style={styles.header}
      >
        <Image style={imgStyles} source={img} />        
      </LinearGradient>

      <View style={styles.main}>
        {children}
      </View>
    </View>
  );
}