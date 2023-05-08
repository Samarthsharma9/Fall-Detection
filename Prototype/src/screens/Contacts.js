import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Contacts = () => {
  const navigation = useNavigation();
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [contact3, setContact3] = useState('');
  const checkContact1 = () => {
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', contact1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          firestore()
            .collection('Users')
            // Filter results
            .where('email', '==', contact2)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.docs.length > 0) {
                firestore()
                  .collection('Users')
                  // Filter results
                  .where('email', '==', contact3)
                  .get()
                  .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                      if (querySnapshot.docs[0]._data.email === contact3) {
                        firestore()
                          .collection('contacts')
                          .add({
                            contact1: contact1,
                            contact2: contact2,
                            contact3: contact3,
                          })
                          .then(() => {
                            console.log('Contact Added');
                            navigation.goBack();
                          });
                      }
                    } else {
                      console.log('account not found');
                    }
                  });
              } else {
                console.log('account not found');
              }
            });
        } else {
          console.log('account not found');
        }
      });
    /*firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', contact2)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          if (querySnapshot.docs[0]._data.email === contact2) {
            console.log('Contact Added');
          } else {
            console.log('wrong Id');
          }
        } else {
          console.log('account not found');
        }
      });*/
    /*firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', contact3)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          if (querySnapshot.docs[0]._data.email === contact3) {
            console.log('Contact Added');
          } else {
            console.log('wrong id');
          }
        } else {
          console.log('account not found');
        }
      });*/
  };
  /*const checkContact2 = () => {
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', contact2)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          if (querySnapshot.docs[0]._data.email === contact2) {
            console.log('Contact Added');
          } else {
            console.log('wrong Id');
          }
        } else {
          console.log('account not found');
        }
      });
  };*/
  /*const checkContact3 = () => {
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', contact3)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          if (querySnapshot.docs[0]._data.email === contact3) {
            console.log('Contact Added');
          } else {
            console.log('wrong id');
          }
        } else {
          console.log('account not found');
        }
      });
  };*/
  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 150,
          fontSize: 30,
          fontWeight: '800',
          color: '#333333',
        }}>
        Add
        <Text style={{color: '#cc0000'}}>Contacts</Text>
      </Text>
      <TextInput
        value={contact1}
        onChangeText={txt => {
          setContact1(txt);
        }}
        placeholder="Enter contact 1"
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
        value={contact2}
        onChangeText={txt => {
          setContact2(txt);
        }}
        placeholder="Enter contact 2"
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
        value={contact3}
        onChangeText={txt => {
          setContact3(txt);
        }}
        placeholder="Enter contact 3"
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
          checkContact1();
        }}>
        <Text style={{fontSize: 20, color: '#000000'}}>Add Contacts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
