import { useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { EulaModal } from '../../components/EulaModal';

import { SignUpParams } from '../../@types/navigation';
import { THEME } from '../../styles/theme';
import { styles } from './styles';

export function SignUp() {
  const route = useRoute();
  const { cellphone: cellphoneInitialValue } = route.params as SignUpParams;

  const cellphoneInputRef = useRef<TextInput>(null);
  const [isEulaModalOpen, setIsEulaModalOpen] = useState(false);

  const [cellphone, setCellphone] = useState(cellphoneInitialValue);
  const [cellphoneError, setCellphoneError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [eula, setEula] = useState(false);

  async function handleSignUp(): Promise<void> {
    if(!eula) {
      Alert.alert(
        "Termos e condições", 
        "Você deve aceitar os termos e condições de uso antes de prosseguir."
      );
    }

    if(!fullName || !cellphone) {
      !fullName && setFullNameError(true);
      !cellphone && setCellphoneError(true);

      Alert.alert(
        "Valor inválido!", 
        "Por favor preencha todos os campos com valores válidos."
      );
    }

    setFullNameError(false);
    setCellphoneError(false);

    const data = {
      name: fullName,
      cellphone: cellphone.replace(/\D/g,''),
      eula,
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 500);
    });
  }

  function toggleEulaModal() {
    setIsEulaModalOpen(state => !state)
  }

  function handleAgree() {
    setEula(true);
    toggleEulaModal();
  }

  function handleDisagree() {
    setEula(false);
    toggleEulaModal();
  }

  return (
    <View style={styles.container}>
      <EulaModal 
        isOpen={isEulaModalOpen} 
        toggleModal={toggleEulaModal}
        onAgree={handleAgree}
        onDisagree={handleDisagree}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Informações</Text>

        <Input 
          label='Nome completo'
          value={fullName}
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
          value={cellphone}
          error={cellphoneError}
          onChangeText={text => setCellphone(text)}
          containerStyle={styles.formItem}
          returnKeyType="send"
          onSubmitEditing={handleSignUp}
        />

        <TouchableWithoutFeedback onPress={toggleEulaModal}>
          <View style={styles.checkboxContainer}>
            <Checkbox 
              style={styles.checkbox}
              color={THEME.COLORS.PURPLE}              
              value={eula} 
              onValueChange={setEula}
              disabled
            />
            <Text style={styles.checkboxText}>
              Aceito os {' '}
            </Text>
            <Text style={styles.checkboxBoldText}>Termos e condições de uso</Text>
          </View>
        </TouchableWithoutFeedback>

        <Button 
          style={styles.formItem}           
          onPressFunc={handleSignUp}
        >
          Cadastrar
        </Button>
      </View>
    </View>
  );
}