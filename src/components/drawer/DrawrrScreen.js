import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const DrawrrScreen = () => {
  return (
    <View>
      <Text>DrawrrScreen</Text>
      <TouchableOpacity onPress={() => Alert.alert('l')}>
        <Text style={{borderWidth: 1, borderColor: 'black'}}>
          click to check
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawrrScreen;

const styles = StyleSheet.create({});
