import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawrrScreen from './DrawrrScreen';
import User from '../instaGramTabBar/tabBarItems/user/User';
import HeaderBar from '../headerBar/HeaderBar';

const Drawerr = createDrawerNavigator();

const Drawer = () => {
  return (
    <Drawerr.Navigator initialRouteName="User">
      <Drawerr.Screen name="User" component={User} />
      <Drawerr.Screen name="HeaderBar" component={HeaderBar} />
    </Drawerr.Navigator>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
