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

interface SlideProps {
  reverseGradient?: boolean;
  img: ImageSourcePropType;
  imgStyles: StyleProp<ImageStyle>,
  pageNumber: number;
  description: string;  
}

export function Slide({ 
  reverseGradient, 
  img,
  imgStyles,
  pageNumber, 
  description 
}: SlideProps) {
  return (
    <View style={styles.container}>
      <StatusBar  style="light" backgroundColor="transparent" translucent/>
      <LinearGradient 
        end={reverseGradient ? { x: 1, y: 0 } : { x: 1, y: 1 }}
        start={reverseGradient ? { x: 0, y: 1 } : { x: 0, y: 0 }}
        // end={{ x: 1, y: 0 }}
        // start={{ x: 0, y: 1 }}
        colors={reverseGradient ? THEME.COLORS.GRADIENT_REVERSE :THEME.COLORS.GRADIENT} 
        style={styles.header}
      >
        <Image style={imgStyles} source={img} />        
      </LinearGradient>


      <View style={styles.main}>
        <Text style={styles.pageNumber}>
          {String(pageNumber).padStart(2, '0')}.
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}