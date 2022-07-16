import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './tabBarItems/home/Home';
import Reels from './tabBarItems/reels/Reels';
import Likes from './tabBarItems/likes/Likes';
import User from './tabBarItems/user/User';
import HomeIcon from 'react-native-vector-icons/Octicons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import UserIcon from 'react-native-vector-icons/Feather';
import SearchBar from './tabBarItems/search/SearchBar';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, size}) => (
              <HomeIcon
                name="home"
                color={focused ? 'white' : 'grey'}
                size={size}
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, size}) => (
              <SearchIcon
                name="md-search-sharp"
                color={focused ? 'white' : 'grey'}
                size={size}
              />
            ),
          }}
          name="Search"
          component={SearchBar}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              // <LikeIcon name="hearto" color={color} size={21} />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../utils/instagram-reels.png')}
                  style={{
                    width: 22,
                    height: 22,
                    alignSelf: 'center',
                    tintColor: focused ? 'white' : 'grey',
                  }}
                />
              </View>
            ),
          }}
          name="Reels"
          component={Reels}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({size, focused}) => (
              <LikeIcon
                name="hearto"
                color={focused ? 'white' : 'grey'}
                size={23}
              />
            ),
          }}
          name="Likes"
          component={Likes}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, size}) => (
              <UserIcon
                name="user"
                color={focused ? 'white' : 'grey'}
                size={size}
              />
            ),
          }}
          name="User"
          component={User}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
