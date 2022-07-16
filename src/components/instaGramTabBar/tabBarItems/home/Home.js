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
import SwiperFlatList from 'react-native-swiper-flatlist';
import Add from 'react-native-vector-icons/FontAwesome5';
import More from 'react-native-vector-icons/Feather';
import Heart from 'react-native-vector-icons/EvilIcons';
import Comment from 'react-native-vector-icons/EvilIcons';
import Share from 'react-native-vector-icons/EvilIcons';
import Info from 'react-native-vector-icons/Ionicons';
import {homeRouteImage, salman} from '../../../utils/constants';

// import Stories from 'react-native-stories-media';
// import {storiesMediadata} from '../../../utils/constants';
// import {StoryContainer} from 'react-native-stories-view';
// import {peakyImage} from '../../../utils/constants';

const Home = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height * 0.3;
  {
    /* <StoryContainer
        visible={true}
        enableProgress={true}
        images={peakyImage}
        duration={5}
        onComplete={() => alert('onComplete')}
        userProfile={{
          // userImage: peakyImage,
          userName: 'Yuvraj Pandey',
          userMessage: 'Work hard & success will follow !!',
          // imageArrow: peakyImage,
          onImageClick: () => {
            console.log('lskndclksnc');
            Alert.alert('User profile image tapped');
          },
        }}
      /> */
  }

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'red',
          height: 70,
          width: 70,
          borderRadius: 35,
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'red',
            height: 65,
            width: 65,
            borderRadius: 32.5,
            alignSelf: 'center',
          }}></View>
      </View>
    );
  };
  const renderItem1 = () => {
    return (
      <View style={styles.card}>
        <View style={styles.user}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shah-rukh-khan-2092-12-09-2017-02-10-43.jpg',
              }}
            />

            <View style={{alignSelf: 'center', marginLeft: 5}}>
              <Text style={{fontWeight: 'bold', color: '#ffffff'}}>
                Sharukh
              </Text>
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <More name="more-horizontal" size={20} color={'#ffffff'} />
          </View>
        </View>
        <View style={styles.image}>
          <Image
            source={{uri: homeRouteImage}}
            style={{width, height, resizeMode: 'cover'}}
          />
          {/* <Text>hi</Text> */}
        </View>
        <View style={styles.icons}>
          <View style={{flexDirection: 'row'}}>
            <Heart size={35} style={styles.icon} name="heart" />
            <Comment size={35} style={styles.icon} name="comment" />
            <Share size={35} style={styles.icon} name="share-google" />
          </View>
          <View>
            <Info size={27} style={styles.icon} name="share-outline" />
          </View>
        </View>

        <View style={styles.likedBy}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              resizeMode: 'contain',
            }}
            source={{
              uri: salman,
            }}
          />
          <View style={{alignSelf: 'center', marginLeft: 5}}>
            <Text style={{color: '#ffffff'}}>
              Liked by <Text style={{fontWeight: 'bold'}}>Salman </Text>
              and <Text style={{fontWeight: 'bold'}}>others</Text>
            </Text>
          </View>
        </View>
        <View style={styles.comment}>
          <Text>View all 26 comments</Text>
        </View>
        <View style={styles.time}>
          <Text style={{fontSize: 10}}>5 hours ago</Text>
        </View>
      </View>
    );
  };

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'red',
              height: 70,
              width: 70,
              borderRadius: 35,
              justifyContent: 'center',
              backgroundColor: 'green',
            }}>
            <View style={{position: 'absolute', right: 3, bottom: 0}}>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'red',
                  height: 22,
                  width: 22,
                  borderRadius: 17.5,
                  justifyContent: 'center',
                  backgroundColor: 'black',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    height: 18,
                    width: 18,
                    borderRadius: 9.5,
                    alignSelf: 'center',
                    backgroundColor: '#33ADFF',
                    justifyContent: 'center',
                  }}>
                  <Add name="plus" size={12} style={{alignSelf: 'center'}} />
                </View>
              </View>
            </View>
          </View>

          <View style={{width: 'auto', paddingHorizontal: 5}}>
            <SwiperFlatList
              data={data}
              keyExtractor={index => index}
              renderItem={renderItem}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              color: '#ffffff',
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}>
            Your story
          </Text>
        </View>
      </View>

      <SwiperFlatList
        vertical
        data={data}
        renderItem={renderItem1}
        keyExtractor={index => index}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: 'grey',
    borderWidth: 0.3,
  },
  card: {
    height: 'auto',
    marginTop: 10,
  },
  user: {
    height: 40,
  },

  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  image: {
    // height: '50%',
    // width: 'auto',
    marginTop: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  icon: {
    color: '#ffffff',
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  likedBy: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginTop: 5,
  },
  comment: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  time: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
});
