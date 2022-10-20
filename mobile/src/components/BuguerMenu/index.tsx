import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useBuguerMenu } from '../../hooks/buguerMenu';

import { styles } from './styles';
import { THEME } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export function BuguerMenu() {
  const { isOpen, toggleMenu } = useBuguerMenu();
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  function navigateTo (address: string, type: 'url' | 'screen' = 'screen') {
    toggleMenu();
    
    if (type === 'url') {
      Linking.openURL(address);
      return;
    }

    navigation.navigate(address as any);
  }

  return (        
    <Modal 
      isVisible={isOpen}
      onBackButtonPress={toggleMenu}
      onBackdropPress={toggleMenu}
      swipeDirection="left"
      onSwipeComplete={toggleMenu}            
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={{ flex: 1, margin: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.content}>          
          <View style={styles.linksContainer}>
            
            {user
              ? (
                <TouchableOpacity 
                  style={styles.link} 
                  onPress={() => signOut()}
                >
                  <MaterialCommunityIcons 
                    name="account-outline" 
                    size={28} 
                    color={THEME.COLORS.TEXT.TITLE}
                  />
                  <Text style={styles.linkText}>{user.name}</Text>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity 
                  style={styles.link} 
                  onPress={() => navigateTo('firstSteps')}
                >
                  <MaterialCommunityIcons 
                    name="login" 
                    size={28} 
                    color={THEME.COLORS.TEXT.TITLE}
                  />
                  <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
              )
            }

            <TouchableOpacity 
              style={styles.link} 
              onPress={() => navigateTo('riskLocationsMap')}
            >
              <MaterialCommunityIcons 
                name="map-outline" 
                size={28} 
                color={THEME.COLORS.TEXT.TITLE}
              />
              <Text style={styles.linkText}>Mapa</Text>
            </TouchableOpacity>            

            <TouchableOpacity 
              style={styles.link}
              onPress={() => navigateTo('forum')}
            >
              <MaterialCommunityIcons 
                name="forum-outline" 
                size={28} 
                color={THEME.COLORS.TEXT.TITLE} 
              />
              <Text style={styles.linkText}>Forum</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.link}
              onPress={
                () => navigateTo(
                  'https://www.queroseracolhida.mapadoacolhimento.org',
                  'url'
                )
              }
            >
              <MaterialCommunityIcons 
                name="heart-multiple-outline" 
                size={28} 
                color={THEME.COLORS.TEXT.TITLE} 
              />
              <Text style={styles.linkText}>Acolhimento</Text>
            </TouchableOpacity>
            

            {/* <TouchableOpacity 
              style={styles.link}
              onPress={() => AsyncStorage.removeItem('isFirstTime')}
            >
              <MaterialCommunityIcons 
                name="trash-can-outline" 
                size={28} 
                color={THEME.COLORS.TEXT.TITLE} 
              />
              <Text style={styles.linkText}>Limpar AsyncStorage</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Você não está sozinha!{'\n'}Peça ajuda.
            </Text>
          </View>
        </View>
      </View>
    </Modal>   
  );
}