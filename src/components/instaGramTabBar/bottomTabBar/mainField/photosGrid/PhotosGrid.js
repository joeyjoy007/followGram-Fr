import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const PhotosGrid = ({postUrl}) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const borderWidth = Dimensions.get('screen').width;
  const imageWidth = borderWidth / 3;

  return (
    <ScrollView>
      <View style={styles.main}>
        {postUrl.map(e => {
          return (
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: imageWidth - 18,
                flexWrap: 'wrap',
                marginLeft: 3.0,
                height: imageWidth - 18,
                marginTop: 3,
              }}
              key={e}>
              <Image
                style={{
                  width: imageWidth - 18,
                  height: imageWidth - 18,
                  resizeMode: 'cover',
                }}
                source={{uri: e.postAddressUrl}}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PhotosGrid;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
