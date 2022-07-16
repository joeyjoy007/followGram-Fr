import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddUser from 'react-native-vector-icons/Feather';
import {
  fetchSingleUser,
  followUser,
  unFollowUser,
} from '../../server/apis/user';
import {userInfo} from '../../userInfo/userInfo';
import TopBar from '../instaGramTabBar/bottomTabBar/mainField/TopBar';
import Add from 'react-native-vector-icons/AntDesign';
import HeaderBar from '../headerBar/HeaderBar';
import {headerTitleStyle} from '../utils/constants';
import {Storage} from '../../storage/Storage';

const SearchedUser = ({route, navigation}) => {
  const {_id} = route.params.details;

  const [follow, setFollow] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [stateConstant, setStateConstant] = useState(0);
  const [length, setLength] = useState({following: '', follower: '', post: ''});

  useEffect(() => {
    let fetchUser = async () => {
      try {
        const info = await Storage.getItem('userInfo');
        const user = await fetchSingleUser({_id: _id});
        setUserDetail(user.payload);
        setLength({
          following: user.payload.following.length,
          follower: user.payload.follower.length,
          post: user.payload.post.length,
        });
        const u = user.payload.follower.find(u => u._id === info.user._id);
        if (u._id !== undefined) {
          setFollow(true);
        } else {
          setFollow(false);
        }
        // if (user.payload.follower.includes(info.user._id)) {
        //   setFollow(true);
        // }
        return user;
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, [follow]);

  const setFollowing = async () => {
    try {
      const info = await Storage.getItem('userInfo');
      const follow = await followUser({_id: info.user._id, _id1: _id});

      if (follow.status === 1) {
        setStateConstant(1); // for one time folow only
        setFollow(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const unFollow = async () => {
    try {
      const info = await Storage.getItem('userInfo');
      const follow = await unFollowUser({_id: info.user._id, _id1: _id});

      if (follow.status === 1) {
        setStateConstant(0); // for one time folow only
        setFollow(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const data = [1, 4];
  return (
    <>
      <HeaderBar
        back
        // post={true}
        // menu={true}
        title={
          <Text style={[headerTitleStyle, {fontStyle: 'italic'}]}>
            {userDetail !== null ? userDetail.name : 'followgram user'}
          </Text>
        }
        backFunction={() => navigation.goBack()}
      />
      {userDetail !== null ? (
        <View style={styles.main}>
          <View style={styles.profile}>
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
              <Text style={[styles.text]}>{length.post}</Text>
              <Text style={styles.item}>Posts</Text>
            </View>
            <View style={styles.items}>
              <Text style={[styles.text]}>{length.following}</Text>
              <Text style={styles.item}>Following</Text>
            </View>
            <View style={styles.items}>
              <Text style={[styles.text]}>{length.follower}</Text>
              <Text style={styles.item}>Followers</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'space-between',
              height: 30,
            }}>
            <View style={styles.edit}>
              <Pressable
                onPress={() => (follow === true ? unFollow() : setFollowing())}>
                <Text
                  style={[
                    styles.follow,
                    {backgroundColor: follow === true ? '#9fa0a4' : '#0071aa'},
                  ]}>
                  {follow === true ? 'Following >' : 'Follow'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.edit}>
              <Text style={styles.editProfile}>Message</Text>
            </View>
            <View style={styles.edit}>
              <Text style={styles.editProfile}>Email</Text>
            </View>
            <View style={styles.edit}>
              <AddUser style={[styles.editProfile]} name="user-plus" />
            </View>
          </View>
          <ScrollView horizontal>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
              }}>
              {data.map(e => {
                return (
                  <View style={{height: 'auto', width: 80}} key={e}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'red',
                        height: 70,
                        width: 70,
                        borderRadius: 35,
                        justifyContent: 'center',
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
                  </View>
                );
              })}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  justifyContent: 'center',
                }}>
                <Add name="plus" style={{alignSelf: 'center'}} size={28} />
              </View>
            </View>
          </ScrollView>

          <View style={{marginTop: 10}}>
            <TopBar postUrl={userDetail.post} reelUrl={userDetail.reels} />
          </View>
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

export default SearchedUser;

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
    paddingHorizontal: 20,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#9fa0a4',
  },
  edit: {
    alignSelf: 'center',
    fontWeight: '500',
  },
  follow: {
    width: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 20,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 5,
  },
});
