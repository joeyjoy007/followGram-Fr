import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../../../headerBar/HeaderBar';
import {headerTitleStyle} from '../../../utils/constants';

const Reels = ({navigation}) => {
  return (
    <View>
      <HeaderBar
        back
        backFunction={() => navigation.goBack()}
        title={<Text style={headerTitleStyle}>Reel</Text>}
      />
      <Text>Reels</Text>
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({});
