import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import AddPost from 'react-native-vector-icons/Octicons';
import Menu from 'react-native-vector-icons/MaterialCommunityIcons';
import Reel from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';

const HeaderBar = ({
  title,
  menu,
  post,
  back,
  backFunction,
  addPost,
  backgroundColor,
  showAdd,
  setImageUri,
  navigation,
  userInfo,
  openBottomSheet,
}) => {
  const widths = Dimensions.get('screen').width;

  const openGallery = async () => {
    const pickerResult = await ImagePicker.launchImageLibrary({
      mediaType: 'mixed',
      aspect: [4, 3],
      allowsEditing: true,
    });

    if (pickerResult.assets[0].uri) {
      setImageUri(pickerResult.assets[0].uri);
      navigation.navigate('Image', {
        imageUrl: pickerResult,
        userDetail: userInfo,
      });
    }
  };

  return (
    <View
      style={{
        height: 50,
        justifyContent: 'space-between',
        width: widths,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: backgroundColor,
      }}>
      <View style={{flexDirection: 'row'}}>
        {back && (
          <Pressable onPress={() => backFunction()}>
            <BackIcon style={{color: '#ffffff'}} name="arrowleft" size={28} />
          </Pressable>
        )}

        {/* <Pressable>
          <BackIcon style={{color: '#ffffff'}} name="arrowleft" size={28} />
        </Pressable> */}

        {title ?? (
          <View>
            <Text>{title}</Text>
          </View>
        )}
      </View>

      <View style={{marginLeft: 18, flexDirection: 'row'}}>
        {post === true ? (
          <View style={{alignSelf: 'center'}}>
            <Pressable
              onPress={() => addPost()}
              style={{paddingHorizontal: 15, alignSelf: 'center'}}>
              <AddPost style={{color: '#ffffff'}} name="diff-added" size={23} />
            </Pressable>
            <View
              style={{
                position: 'absolute',
                height: 50,
                width: 100,
                height: 120,
                right: -25,
                top: 30,
                backgroundColor: 'black',
                zIndex: 1,
                elevation: 1,
                display: showAdd === true ? 'flex' : 'none',
              }}>
              <Pressable onPress={() => openGallery()}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                  }}>
                  <AddPost
                    style={{color: '#ffffff'}}
                    name="diff-added"
                    size={23}
                  />
                  <Text style={styles.addFont}>Add post</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => alert('We will add this function very soon.')}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                  }}>
                  <Reel
                    style={{color: '#ffffff'}}
                    name="md-videocam-outline"
                    size={23}
                  />
                  <Text style={styles.addFont}>Add reel</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : null}
        {menu === true ? (
          <Pressable
            onPress={() => openBottomSheet()}
            style={{alignSelf: 'center', paddingHorizontal: 5}}>
            <Menu style={{color: '#ffffff'}} name="menu" size={28} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  addFont: {
    color: '#ffffff',
    paddingHorizontal: 5,
    alignSelf: 'center',
    fontWeight: '500',
  },
});
