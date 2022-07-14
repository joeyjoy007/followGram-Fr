import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {userImage} from '../../../utils/userImage';
import {userData} from '../../../utils/UserData';
import {userInfo} from '../../../../userInfo/userInfo';
import AddUser from 'react-native-vector-icons/Feather';
import {fetchSingleUser} from '../../../../server/apis/user';
import TopBar from '../../bottomTabBar/mainField/TopBar';

const User = ({route, navigation}) => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const info = await userInfo;
  //       const user = await fetchSingleUser({_id: info.user._id});
  //       setUserDetail(user.payload);
  //       return user;
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // Prevent default behavior

      const fetchUser = async () => {
        try {
          const info = await userInfo;
          const user = await fetchSingleUser({_id: info.user._id});
          setUserDetail(user.payload);
          return user;
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchUser();
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {userDetail === null ? (
        <View style={styles.main}>
          {/* <View style={styles.profile}>
            <View>
              <Image
                source={{uri: userDetail.profilePic}}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{color: '#ffffff', marginTop: 10}}>
                {userDetail.name}
              </Text>
            </View>
            <View style={styles.items}>
              <Text style={[styles.text]}>{userDetail.post}</Text>
              <Text style={styles.item}>Posts</Text>
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate('Followers', {
                  users: userDetail.following,
                })
              }
              style={styles.items}>
              <Text style={[styles.text]}>{userDetail.following.length}</Text>
              <Text style={styles.item}>Following</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Followers', {
                  users: userDetail.follower,
                })
              }
              style={styles.items}>
              <Text style={[styles.text]}>{userDetail.follower.length}</Text>
              <Text style={styles.item}>Followers</Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'space-between',
              height: 30,
            }}>
            <View style={styles.edit}>
              <Text style={styles.editProfile}>Edit profile</Text>
            </View>
            <View style={styles.edit}>
              <Text style={styles.editProfile}>View archieve</Text>
            </View>
            <View style={styles.edit}>
              <AddUser style={[styles.editProfile]} name="user-plus" />
            </View>
          </View> */}

          <TopBar />
        </View>
      ) : (
        <ActivityIndicator
          size={'large'}
          style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}
        />
      )}
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  main: {paddingVertical: 20, paddingHorizontal: 20},
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
    alignSelf: 'center',
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 15,
  },
  item: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 15,
  },
  text: {
    alignSelf: 'center',
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 20,
  },
  editProfile: {
    width: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 25,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#9fa0a4',
  },
  edit: {
    alignSelf: 'center',
    fontWeight: '500',
  },
});
