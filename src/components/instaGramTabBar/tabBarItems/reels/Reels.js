import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
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

const Reels = ({navigation}) => {
  const videoRef = useRef(null);

  const onBuffer = e => {
    console.log('buffering...');
  };

  const onError = e => {
    console.log('error', e);
  };

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <Video
          source={{uri: sampleVideoUrl}} // Can be a URL or a local file.
          ref={videoRef}
          onBuffer={onBuffer}
          resizeMode="cover"
          paused={false}
          onError={onError}
          repeat
          style={styles.backgroundVideo}
        />
      </View>
    );
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

        {/* <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 32,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: peakyImage}}
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
            <Text numberOfLines={1}>Hello i am here to showa my reels </Text>
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
        </View> */}
      </View>
    </>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default Reels;

var styles = StyleSheet.create({
  backgroundVideo: {
    width,
    height,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
