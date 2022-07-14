import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../components/authentication/Register';
import Login from '../components/authentication/Login';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation, stack}) => (
  <RootStack.Navigator>
    {/* <RootStack.Screen name="Register" component={RegisterForm} /> */}
    <RootStack.Screen name="Register" component={Register} />
    <RootStack.Screen name="Login" component={Login} />
  </RootStack.Navigator>
);

export default RootStackScreen;
