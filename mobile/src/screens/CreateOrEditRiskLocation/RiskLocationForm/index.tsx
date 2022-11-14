import { useNavigation, useRoute } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcons from '@expo/vector-icons/Feather';

import { useAuth } from '../../../hooks/auth';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import { RiskLocationFormParams } from '../../../@types/navigation';
import { api } from '../../../services/api';

import { styles } from './styles';
import { THEME } from '../../../styles/theme';

export function RiskLocationForm() {    
  const navigation = useNavigation()
  const descriptionInputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  
  const route = useRoute();
  const { position, riskLocation } = route.params as RiskLocationFormParams;

  const [risk, setRisk] = useState('');
  const [riskError, setRiskError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  
  async function handleCreateOrUpdateRiskLocation() {
    const riskLocationRisk = riskLocation && !risk ? riskLocation.risk : risk;
    const riskLocationDescription = riskLocation && !description ? riskLocation.description : description;
    
    if(!riskLocationRisk || !riskLocationDescription) {
      !risk ? setRiskError(true) : setRiskError(false);
      !description ? setDescriptionError(true) : setDescriptionError(false);

      Alert.alert(
        "Valor inválido!", 
        "Por favor preencha todos os campos com valores válidos."
      );

      return;
    }
    
    setRiskError(false);
    setDescriptionError(false);

    const data = {
      coords: {
        lat: position.latitude,
        long: position.longitude,
      },	
      risk: riskLocationRisk,
      description: riskLocationDescription,
      ...(!riskLocation && { created_by: user?._id })
    };

    try {
      if (riskLocation) {
        await api.put(`/riskLocation/${riskLocation._id}`, data)
      } else {
        await api.post('/riskLocation', data)
      }

      navigation.navigate('riskLocationsMap');
    } catch (error: any) {
      Alert.alert(
        "Ocorreu um erro", 
        error.message
      );
    }    
  }
  
  async function handleDeleteRiskLocation() {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir esse local de risco?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          onPress: async () => {
            try {              
              await api.delete(`/riskLocation/${riskLocation?._id}`)
                      
              navigation.navigate('riskLocationsMap');
            } catch (error: any) {
              Alert.alert(
                "Ocorreu um erro", 
                error.message
              );
            }   
          } 
        },
      ]
    )
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
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Informações
            </Text>

            {riskLocation && (
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={handleDeleteRiskLocation}
              >
                <FeatherIcons 
                  name="trash-2"
                  size={16} 
                  color={THEME.COLORS.RED}
                />

                <Text style={styles.deleteButtonText}>
                  Excluir
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />
          
          <Input 
            label='Risco'
            defaultValue={riskLocation?.risk}
            error={riskError}
            maxLength={30}
            complementaryText='Máximo de 30 caracteres'
            value={risk}
            onChangeText={(text) => setRisk(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              descriptionInputRef.current?.focus()
            }}
          />

          <Input 
            ref={descriptionInputRef}
            label='Descrição'
            defaultValue={riskLocation?.description}
            error={descriptionError}
            maxLength={150}
            multiline
            value={description}
            onChangeText={(text) => setDescription(text)}
            complementaryText='Máximo de 150 caracteres'
            style={styles.textArea} 
            containerStyle={styles.textAreaContainer}
          />

          <Button style={styles.createButton} onPressFunc={handleCreateOrUpdateRiskLocation}>
            {riskLocation ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>      
  );
}
