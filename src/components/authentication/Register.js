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
import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage';
import {firebaseConfig} from '../../firebase/firebase';

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
    handleImagePicked(imageUri);
  };

  const handleImagePicked = async pickerResult => {
    // setLoading(true)
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
        console.log(4);
        setImage(uploadUrl);
        setFields('profilePic', uploadUrl);

        // setUpload(false);
        alert('Image uploaded successfully');

        // setTimeout(() => {
        //   setProgress(0);
        // }, 2000);
      }
      // setLoading(false)
      // setChangeButton(true)
    } catch (e) {
      // setLoading(false)
      alert(e.message);
    } finally {
      // setUpload(false)
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };

      xhr.responseType = 'blob';
      console.log(1);
      xhr.open('GET', uri, true);
      console.log(2);
      xhr.send(null);
    });
    const fileRef = ref(
      getStorage(),
      `UserProfile/${imageUri.assets[0].fileName}`,
    );
    console.log(5);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

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
