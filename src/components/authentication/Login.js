import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {instaLogo} from '../utils/userImage';
import {createUser} from '../../server/apis/user';
import {AuthContext} from '../../context';

const Login = ({navigation}) => {
  const [formState, setFormState] = useState({
    phoneNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const {signIn} = useContext(AuthContext);

  const setFields = (key, value) => {
    setFormState({...formState, [key]: value});
  };

  const loginUser = async data => {
    setLoading(true);
    try {
      const user = await signIn(data);
      if (user.status === 1) {
        setLoading(false);
        // navigation.navigate('TabBar');
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
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
      </View>
      <View style={styles.signUp}>
        <Pressable
          style={{alignSelf: 'center'}}
          onPress={() => loginUser(formState)}>
          {loading === true ? <ActivityIndicator /> : <Text>Login</Text>}
        </Pressable>
      </View>
      <View style={styles.signUp}>
        <Pressable
          style={{alignSelf: 'center'}}
          onPress={() => navigation.navigate('Register')}>
          <Text>Not registerd click to register </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

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
