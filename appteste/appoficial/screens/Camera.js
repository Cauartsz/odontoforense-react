// Camera.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../screens/Tema';
import { requestCameraPermissionsAsync } from 'expo-camera'; // ✅ Corrigido o import

export default function Camera() { // ✅ Nome da função corrigido
  const navigation = useNavigation();
  const { backgroundColor, textColor } = useTheme();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync(); // ✅ Chamada correta da função
      setStatus(status);
      if (status === 'granted') {
        Alert.alert('Permissão concedida', 'Vamos tirar uma foto!');
      } else {
        Alert.alert('Permissão negada', 'Que pena, não poderemos tirar uma selfie!');
      }
    })();
  }, []);

  return (
    <View style={[{ flex: 1, backgroundColor }]}>
      <View style={styles.container}>
        <Text style={[styles.text, { color: textColor }]}>Permissão da Câmera</Text>
        <Text style={[styles.status, { color: textColor }]}>
          Status da permissão: {status ?? 'Solicitando...'}
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(255, 75, 75)' }]}
          onPress={() => navigation.navigate('Local')}>
          <Image source={require('../assets/map.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(84, 169, 255)' }]}
          onPress={() => navigation.navigate('Camera')}>
          <Image source={require('../assets/camera.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(240, 206, 13)' }]}
          onPress={() => navigation.navigate('Storage')}>
          <Image source={require('../assets/archive.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(19, 216, 150)' }]}
          onPress={() => navigation.navigate('Config')}>
          <Image source={require('../assets/cog.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    width: '100%',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 30,
    width: '100%',
    marginBottom: 100,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
});
