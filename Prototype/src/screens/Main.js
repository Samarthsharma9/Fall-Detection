import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
let token = '';

const Main = () => {
  const navigation = useNavigation();
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User LogOut!'));
  };
  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    token = await messaging().getToken();
    console.log(token);
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          width: '25%',
          height: 50,
          backgroundColor: '#ff944d',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
        onPress={() => {
          logout();
          navigation.navigate('Login');
        }}>
        <Text style={{fontSize: 20, color: '#000000'}}>LogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '84%',
          height: 50,
          backgroundColor: '#ff944d',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 300,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Contacts');
        }}>
        <Text style={{fontSize: 20, color: '#000000'}}>Add Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '84%',
          height: 50,
          backgroundColor: '#ff944d',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Bluetooth')
        }}>
        <Text style={{fontSize: 20, color: '#000000'}}>bluetooth</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
