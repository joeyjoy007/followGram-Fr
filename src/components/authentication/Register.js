import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {createUser} from '../../server/apis/user';
import * as ImagePicker from 'react-native-image-picker';
import {getApps, initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../firebase/firebase';
import {uploadImages} from '../utils/uploadImage';

const Register = ({navigation}) => {
  const [formState, setFormState] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    profilePic: '',
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const setFields = (key, value) => {
    setFormState({...formState, [key]: value});
  };

  const makeUser = async data => {
    setLoading(true);
    try {
      const user = await createUser(data);
      if (user.status === 1) {
        setLoading(false);
        navigation.navigate('Login');
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const openCamera = async () => {
    let pickerResult = await ImagePicker.launchImageLibrary({
      allowsEditing: true,
      aspect: [4, 3],
      mediaType: 'mixed',
    });

    setImageUri(pickerResult);
    if (pickerResult.assets[0].uri) {
      // setUpload(true);
      console.log(pickerResult);
    }
  };

  const uploadImage = () => {
    // handleImagePicked(imageUri);
    uploadImages(imageUri, setImage, setFields, 'UserProfile', setIsUploaded);
  };

  return (
    <View style={styles.main}>
      <Text
        style={{
          fontStyle: 'italic',
          fontSize: 25,
          color: '#ffffff',
          alignSelf: 'center',
        }}>
        FollowGram
      </Text>
      <View>
        <TextInput
          set
          placeholder="Full name"
          onChangeText={name => setFields('name', name)}
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Mobile number"
          onChangeText={phoneNumber => setFields('phoneNumber', phoneNumber)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={password => setFields('password', password)}
          style={styles.input}
        />
        <Pressable onPress={() => uploadImage()} style={styles.input}>
          <Text>Upload Image</Text>
        </Pressable>

        <Pressable onPress={() => openCamera()} style={styles.input}>
          <Text>Choose Image</Text>
        </Pressable>
      </View>
      <View style={styles.signUp}>
        <Pressable
          style={{alignSelf: 'center'}}
          onPress={() => makeUser(formState)}>
          {loading === true ? <ActivityIndicator /> : <Text>Sign Up</Text>}
        </Pressable>
      </View>
      <View style={styles.signUp}>
        <Pressable
          style={{alignSelf: 'center'}}
          onPress={() => navigation.navigate('Login')}>
          <Text>Already registerd click to login </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#d3d3d3',
    marginTop: 10,
    height: 50,
  },
  signUp: {
    marginTop: 20,
    backgroundColor: '#0071aa',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
