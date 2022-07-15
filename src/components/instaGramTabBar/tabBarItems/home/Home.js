import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Add from 'react-native-vector-icons/FontAwesome5';
// import Stories from 'react-native-stories-media';
// import {storiesMediadata} from '../../../utils/constants';
// import {StoryContainer} from 'react-native-stories-view';
// import {peakyImage} from '../../../utils/constants';

const Home = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
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
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
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

      <View style={styles.card}>
        <View style={styles.user}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
      </View>
    </>
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
    borderWidth: 1,
    borderColor: 'red',
    height: 'auto',
    marginTop: 10,
  },
  user: {
    borderWidth: 1,
    borderColor: 'red',
    height: 40,
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
  },
});
