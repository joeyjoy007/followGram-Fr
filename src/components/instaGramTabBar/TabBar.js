import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './tabBarItems/home/Home';
import Reels from './tabBarItems/reels/Reels';
import Likes from './tabBarItems/likes/Likes';
import User from './tabBarItems/user/User';
import HomeIcon from 'react-native-vector-icons/Octicons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import VideoIcon from 'react-native-vector-icons/Ionicons';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import UserIcon from 'react-native-vector-icons/Feather';
import SearchBar from './tabBarItems/search/SearchBar';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <SearchIcon name="md-search-sharp" color={color} size={size} />
          ),
        }}
        name="Search"
        component={SearchBar}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <VideoIcon name="videocam-outline" color={color} size={size} />
          ),
        }}
        name="Reels"
        component={Reels}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <LikeIcon name="hearto" color={color} size={21} />
          ),
        }}
        name="Likes"
        component={Likes}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <UserIcon name="user" color={color} size={size} />
          ),
        }}
        name="User"
        component={User}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
