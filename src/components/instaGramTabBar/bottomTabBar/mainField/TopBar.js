import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PhotosGrid from './photosGrid/PhotosGrid';
import TagPhoto from './tagPhoto/TagPhoto';
import Grid from 'react-native-vector-icons/Ionicons';
import Tag from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

const TopBar = ({postUrl}) => {
  return (
    <View style={{height: 400}}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '00FFFFFF',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#ffffff',
          },
        }}>
        <Tab.Screen
          name="PhotosGrid"
          options={{
            tabBarIcon: ({color, size}) => (
              <Grid name="grid-outline" color={color} size={20} />
            ),
          }}>
          {props => <PhotosGrid {...props} postUrl={postUrl} />}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Tag
                name="contactless-payment-circle-outline"
                color={color}
                size={25}
              />
            ),
          }}
          name="TagPhotos"
          component={TagPhoto}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({});
