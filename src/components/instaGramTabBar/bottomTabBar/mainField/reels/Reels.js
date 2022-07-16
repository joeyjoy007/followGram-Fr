import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Pinchable from 'react-native-pinchable';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Storage} from '../../../../../storage/Storage';

const Reels = ({reelUrl, navigation}) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const [thumbnail, setThumbnail] = useState([]);

  const thumbNail = async videoUrl => {
    createThumbnail({
      url: videoUrl,
      timeStamp: 10000,
    })
      .then(response => {
        return response.path;
      })
      .catch(err => console.log({err}));
  };

  const thumbnailArray = [];

  useEffect(() => {
    const findReel = async () => {
      reelUrl &&
        reelUrl.map(e => {
          createThumbnail({
            url: e.reelAddressUrl,
            timeStamp: 10000,
          })
            .then(response => {
              thumbnailArray.push({thumbnails: response.path, info: e});
              setThumbnail(thumbnailArray);
            })
            .catch(err => console.log({err}));
        });

      // const currentUser = await Storage.get('userInfo');
      // //  console.log(e.user.following.includes(''));
      // console.log(currentUser);
    };
    findReel();
  }, []);

  const videoRef = useRef(null);

  const onBuffer = e => {
    console.log('buffering...');
  };

  const onError = e => {
    console.log('error', e);
  };

  const borderWidth = Dimensions.get('screen').width;
  const imageWidth = borderWidth / 3;

  return (
    <ScrollView>
      <View style={styles.main}>
        {thumbnail.map((e, index) => {
          return (
            <View
              style={{
                width: imageWidth - 18,
                flexWrap: 'wrap',
                marginLeft: 3.0,
                height: imageWidth - 18,
                marginTop: 3,
              }}
              key={index}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ReelsPage', {
                    reelsDetail: e.info,
                  })
                }>
                <Image
                  style={{
                    width: imageWidth - 18,
                    height: imageWidth - 18,
                    resizeMode: 'cover',
                    borderWidth: 1,
                    borderColor: 'grey',
                  }}
                  source={{
                    uri: e.thumbnails,
                  }}
                />
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Reels;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
