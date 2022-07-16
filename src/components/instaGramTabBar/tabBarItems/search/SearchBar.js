import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import {fetchAllPost} from '../../../../server/apis/post';
import Pinchable from 'react-native-pinchable';

const SearchBar = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);

  const data = [1, 2, 3, 4, 5, 6, 7];

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // Prevent default behavior

      const fetchPosts = async () => {
        setLoading(true);
        try {
          const fetchPost = await fetchAllPost();
          setAllPost(fetchPost.payload);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error.message);
        }
      };
      fetchPosts();
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  const borderWidth = Dimensions.get('screen').width;
  const imageWidth = borderWidth / 3;

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
      <ScrollView>
        <View style={styles.main1}>
          {allPost &&
            allPost.map(e => {
              return (
                <View
                  style={{
                    width: imageWidth - 18,
                    flexWrap: 'wrap',
                    marginLeft: 3.0,
                    height: imageWidth - 10,
                    marginTop: 3,
                  }}
                  key={e._id}>
                  <Pinchable maximumZoomScale={3}>
                    <Image
                      style={{
                        width: imageWidth - 18,
                        height: imageWidth - 10,
                        resizeMode: 'cover',
                      }}
                      // source={{uri: e.postAddressUrl}}
                      source={{uri: e.postAddressUrl}}
                    />
                  </Pinchable>
                </View>
              );
            })}
        </View>
      </ScrollView>
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
  main1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
});
