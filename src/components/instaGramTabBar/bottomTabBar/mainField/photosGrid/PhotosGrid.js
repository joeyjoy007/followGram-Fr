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
import Pinchable from 'react-native-pinchable';

const PhotosGrid = ({postUrl}) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const borderWidth = Dimensions.get('screen').width;
  const imageWidth = borderWidth / 3;

  return (
    <ScrollView>
      <View style={styles.main}>
        {postUrl.map((e, index) => {
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
              key={index}>
              <Pinchable maximumZoomScale={2}>
                <Image
                  style={{
                    width: imageWidth - 18,
                    height: imageWidth - 18,
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
  );
};

export default PhotosGrid;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
