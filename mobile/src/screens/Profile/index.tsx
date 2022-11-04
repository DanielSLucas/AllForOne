import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcons from '@expo/vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { api } from '../../services/api';

import { styles } from './styles';
import { THEME } from '../../styles/theme';

export function Profile() {
  const { user, signOut, isSessionExpired } = useAuth();
  const navigation = useNavigation();

  const cellphoneInputRef = useRef<TextInput>(null);  
  
  const [cellphone, setCellphone] = useState('');
  const [cellphoneError, setCellphoneError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState(false);  

  async function handleEdit(): Promise<void> {
    const isCellphone = /^\(?\d{2}\)?\s?9\d{4}[\s,-]?\d{4}$/;
    const userCellphone = cellphone ? cellphone : user?.cellphone;
    const userName = fullName ? fullName : user?.name;

    if(!userName || !userCellphone || !isCellphone.test(userCellphone)) {
      !userName && setFullNameError(true);
      !userCellphone && setCellphoneError(true);

      Alert.alert(
        "Valor inválido!", 
        "Por favor preencha todos os campos com valores válidos."
      );

      return;
    }

    setFullNameError(false);
    setCellphoneError(false);

    const data = {
      name: userName,
      cellphone: userCellphone.replace(/\D/g,''),
    }    

    const sessionExpired = await isSessionExpired();
    
    if (sessionExpired) {
      Alert.alert(
        "Sessão expirada",
        "Por favor, faça login novamente."
      );
      
      handleSignOut();

      return;
    }

    try {
      await api.put(`/users/${user?._id}`, data);

      Alert.alert(
        "Sucesso",
        "Dados atualizados com sucesso."
      )
    } catch (error: any) {
      Alert.alert(
        "Ocorreu um erro", 
        error.message
      );
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
      navigation.navigate('firstSteps');
    } catch (error: any) {
      Alert.alert(
        "Ocorreu um erro", 
        error.message
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}       
      enabled           
    >
      <ScrollView 
        enabled={false}
        style={{ flex: 1 }}       
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Informações</Text>

          <Input 
            label='Nome completo'            
            value={fullName}
            defaultValue={user?.name}
            error={fullNameError}
            onChangeText={text => setFullName(text)}
            containerStyle={styles.formItem}
            returnKeyType="next"
            onSubmitEditing={() => {
              cellphoneInputRef.current?.focus()
            }}
          />

          <Input
            ref={cellphoneInputRef}
            label='Celular'
            keyboardType='number-pad'
            value={cellphone}
            defaultValue={user?.cellphone}
            error={cellphoneError}
            onChangeText={text => setCellphone(text)}
            containerStyle={styles.formItem}
            returnKeyType="send"
            onSubmitEditing={handleEdit}
          />

          <Button 
            style={[styles.formItem, styles.button]}           
            onPressFunc={handleEdit}
          >
            Editar
          </Button>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.link} 
            onPress={handleSignOut}
          >
            <FeatherIcons 
              name="log-out" 
              size={20} 
              color={THEME.COLORS.TEXT.TITLE}
            />
            <Text style={styles.linkText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>    
  );
}