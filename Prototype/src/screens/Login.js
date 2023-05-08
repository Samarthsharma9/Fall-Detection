/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const showToast = () => {
    ToastAndroid.show('Login SuccessFull', ToastAndroid.SHORT);
  };
  const showError = () => {
    ToastAndroid.show('Wrong Email or Password ', ToastAndroid.SHORT);
  };
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  if (!user) {
    navigation.navigate('Login');
  } else {
    navigation.replace('Main');
    console.log(user.email);
  }
  const checkLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
        navigation.navigate('Main');
        showToast();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          showError();
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          showError();
        }

        console.log(error);
        showError();
      });
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 150,
          fontSize: 30,
          fontWeight: '800',
          color: '#333333',
        }}>
        Para
        <Text style={{color: '#cc0000'}}>Fall</Text>
      </Text>
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
          marginTop: 100,
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
          checkLogin();
        }}>
        <Text style={{fontSize: 20, color: '#000000'}}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 23,
          marginTop: 30,
          textDecorationLine: 'underline',
          alignSelf: 'center',
          color: '#000000',
        }}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        New User SignUp
      </Text>
    </View>
  );
};

export default Login;
