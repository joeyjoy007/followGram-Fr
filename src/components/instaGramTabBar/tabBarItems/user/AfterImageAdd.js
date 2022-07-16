import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../../headerBar/HeaderBar';
import {headerTitleStyle} from '../../../utils/constants';
import {getApps, initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../../firebase/firebase';
import {uploadImages} from '../../../utils/uploadImage';
import {createPost} from '../../../../server/apis/post';

const AfterImageAdd = ({navigation, route}) => {
  const {imageUrl, userDetail} = route.params;

  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const setFields = async (key, value) => {};

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const uploadPostToFirebase = () => {
    uploadImages(
      imageUrl,
      setImage,
      setFields,
      'PostImages',
      setIsUploaded,
      userDetail,
    );
  };
  useEffect(() => {
    if (isUploaded === true) {
      navigation.navigate('User');
    }
  }, [isUploaded]);

  return (
    <>
      <HeaderBar
        back
        backFunction={() => navigation.goBack()}
        title={<Text style={headerTitleStyle}>Post image</Text>}
      />

      <View style={styles.main}>
        <Image
          source={{uri: imageUrl.assets[0].uri}}
          style={{width: '50%', height: '50%', alignSelf: 'center'}}
        />
        <View style={{marginTop: 50, alignSelf: 'center'}}>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: '#90EE90',
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
              width: 100,
              backgroundColor: '#90EE90',
            }}
            onPress={() => uploadPostToFirebase()}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
              }}>
              {isUploaded ? 'Uploaded' : ' Upload post'}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default AfterImageAdd;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
  },
});
