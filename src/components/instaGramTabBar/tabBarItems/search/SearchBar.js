import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SearchIcon from 'react-native-vector-icons/EvilIcons';

const SearchBar = ({navigation}) => {
  return (
    <View style={styles.main}>
      <Pressable onPress={() => navigation.navigate('RealSearch')}>
        <View style={styles.search}>
          <SearchIcon
            style={{alignSelf: 'center', paddingLeft: 10, color: '#ffffff'}}
            name="search"
            size={17}
          />
          <Text style={styles.searchText}>Search</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  search: {
    height: 30,
    borderRadius: 4,
    // justifyContent: 'center',
    backgroundColor: '#808080',
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchText: {
    fontWeight: '500',
    alignSelf: 'center',
    marginLeft: 5,
    color: '#ffffff',
  },
});
