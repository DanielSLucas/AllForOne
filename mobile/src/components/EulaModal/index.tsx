import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { Button } from '../Button';

import { styles } from './styles';

interface EulaModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  onAgree: () => void;
  onDisagree: () => void;
}

export function EulaModal({ 
  isOpen, toggleModal, onAgree, onDisagree 
}: EulaModalProps) {
  return (    
    <Modal 
      visible={isOpen}
      transparent
      onRequestClose={toggleModal}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <WebView 
            style={styles.webView}
            source={{ uri: "https://drive.google.com/file/d/1aOzhQ4smE19JGX8FGIRFMh2j1Hc9zb6c/view?usp=sharing" }}
          />
          <View style={styles.contentFooter}>
            <Button onPress={onDisagree} style={styles.disagreeButton}>
              Não aceito
            </Button>

            <Button onPress={onAgree} style={styles.agreeButton}>
              Aceito
            </Button>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={toggleModal}
        >
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>    
  );
}