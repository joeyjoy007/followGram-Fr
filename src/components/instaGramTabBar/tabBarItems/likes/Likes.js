import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../../../headerBar/HeaderBar';
import {Activity, headerTitleStyle} from '../../../utils/constants';

const Likes = () => {
  const widths = Dimensions.get('screen').width;
  return (
    <>
      <HeaderBar back title={<Text style={headerTitleStyle}>Activity</Text>} />
      <Text>Likes</Text>
    </>
  );
};

export default Likes;

const styles = StyleSheet.create({});
