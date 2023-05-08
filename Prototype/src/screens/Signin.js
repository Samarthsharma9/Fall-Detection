/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
let token = '';

const Signin = () => {
  const showToast = () => {
    ToastAndroid.show('User Created', ToastAndroid.SHORT);
  };
  const showError = () => {
    ToastAndroid.show('User email already in use', ToastAndroid.SHORT);
  };
  const showError1 = () => {
    ToastAndroid.show('User email already in use', ToastAndroid.SHORT);
  };
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    token = await messaging().getToken();
    console.log(token);
  };
  const Createuser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        showToast();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          showError();
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          showError1();
        }

        console.error(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 150,
          fontSize: 25,
          fontWeight: '800',
          color: '#333333',
        }}>
        Create
        <Text style={{color: '#cc0000'}}>User</Text>
      </Text>
      <TextInput
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
        placeholder="Enter Name"
        placeholderTextColor="#333333"
        autoCapitalize="none"
        style={{
          width: '84%',
          height: 50,
          borderRadius: 10,
          borderwidth: 0.5,
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#ffc299',
        }}></TextInput>
      <TextInput
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
        placeholder="Enter Email Id"
        placeholderTextColor="#333333"
        autoCapitalize="none"
        style={{
          width: '84%',
          height: 50,
          borderRadius: 10,
          borderwidth: 0.5,
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#ffc299',
        }}></TextInput>
      <TextInput
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        placeholder="Enter password"
        placeholderTextColor="#333333"
        autoCapitalize="none"
        style={{
          width: '84%',
          height: 50,
          borderRadius: 10,
          borderwidth: 0.5,
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#ffc299',
        }}></TextInput>
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
          Createuser();
        }}>
        <Text style={{fontSize: 20, color: '#000000'}}>SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
