import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1500);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/1139109105/vector/fox-head-icon.jpg?s=612x612&w=0&k=20&c=BUClVuPwCxii91AgxL4iZoFj4GPCz6i1NkQbkPz_A3Q=',
        }}
        style={{width: 300, height: 200}}
      />
      <Text style={{fontSize: 30, fontWeight: '500', color: '#000000'}}>
        Para
        <Text style={{color: '#cc0000'}}>Fall</Text>
      </Text>
    </View>
  );
};

export default Splash;
