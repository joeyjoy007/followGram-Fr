import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderBar from '../../../headerBar/HeaderBar';
import {
  headerTitleStyle,
  peakyImage,
  reelData,
  sampleVideoUrl,
} from '../../../utils/constants';
import Video from 'react-native-video';
import Camera from 'react-native-vector-icons/Feather';
import Heart from 'react-native-vector-icons/AntDesign';
import Comment from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-vector-icons/FontAwesome5';
import Save from 'react-native-vector-icons/MaterialIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import SwiperFlatList from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';

const Reels = ({navigation}) => {
  const videoRef = useRef(null);

  const onBuffer = e => {
    console.log('buffering...');
  };

  const onError = e => {
    console.log('error', e);
  };

  const [currentIndex, setIndex] = useState(0);

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
        style={{flex: 1, height}}>
        <Video
          source={{uri: item.url}} // Can be a URL or a local file.
          ref={videoRef}
          onBuffer={onBuffer}
          resizeMode="cover"
          paused={currentIndex !== index}
          muted={true}
          // paused={true}
          onError={onError}
          repeat
          style={styles.backgroundVideo}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 32,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: peakyImage[0]}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 15,
                paddingHorizontal: 10,
              }}>
              Karan gupta
            </Text>
            <Pressable>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ffffff',
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#ffffff', fontWeight: 'bold', fontSize: 15}}>
                  Follow
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text numberOfLines={1}>{item.description}</Text>
            <Pressable>
              <Text>...more</Text>
            </Pressable>
          </View>

          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                paddingVertical: 5,
              }}>
              <Heart size={25} style={{color: '#ffffff'}} name="heart" />
              <Comment
                size={25}
                style={{color: '#ffffff', marginLeft: 15}}
                name="comment"
              />
              <Share
                size={25}
                style={{color: '#ffffff', marginLeft: 15}}
                name="telegram-plane"
              />
              <Save
                size={25}
                style={{color: '#ffffff', marginLeft: 15}}
                name="save"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignContent: 'center',
                paddingVertical: 10,
              }}>
              <Heart size={15} style={{color: '#ffffff'}} name="heart" />
              <Text style={{color: '#ffffff', marginLeft: 5}}>0</Text>
              <Comment
                size={15}
                style={{color: '#ffffff', marginLeft: 15}}
                name="comment"
              />
              <Text style={{color: '#ffffff', marginLeft: 5}}>0</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const onChangeIndex = ({index, prevIndex}) => {
    setIndex(index);
  };

  return (
    <>
      {/* <HeaderBar
        back
        backFunction={() => navigation.goBack()}
        title={<Text style={headerTitleStyle}>Reels</Text>}
        backgroundColor="black"
      /> */}

      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <SwiperFlatList
          vertical
          data={reelData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onChangeIndex={onChangeIndex}
        />

        <View style={{position: 'absolute', left: 10, top: 8}}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontWeight: 'bold',
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}>
            Reels
          </Text>
        </View>
        <View style={{position: 'absolute', right: 10, top: 18}}>
          <Text style={{marginRight: 20}}>
            <Camera size={25} style={{color: '#ffffff'}} name="camera" />
          </Text>
        </View>
      </View>
    </>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 33;

export default Reels;

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width,
    height,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
