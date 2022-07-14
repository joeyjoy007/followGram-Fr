import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawrrScreen from './DrawrrScreen';

const Drawerr = createDrawerNavigator();

const Drawer = () => {
  return (
    <Drawerr.Navigator initialRouteName="Drawer">
      <Drawerr.Screen name="Drawer Screen" component={DrawrrScreen} />
    </Drawerr.Navigator>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
