import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Routes from './src/components/routes/Routes';
import {NavigationContainer} from '@react-navigation/native';
import {initializeAxios} from './src/server/index';

const App = () => {
  const appInitialize = async () => {
    console.log('axios seted up');
    initializeAxios();
  };

  useMemo(() => appInitialize(), []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
