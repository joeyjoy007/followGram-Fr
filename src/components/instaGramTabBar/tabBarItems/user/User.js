import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {userInfo} from '../../../../userInfo/userInfo';
import AddUser from 'react-native-vector-icons/Feather';
import {fetchSingleUser} from '../../../../server/apis/user';
import TopBar from '../../bottomTabBar/mainField/TopBar';
import Add from 'react-native-vector-icons/AntDesign';
import HeaderBar from '../../../headerBar/HeaderBar';
import {headerTitleStyle} from '../../../utils/constants';
import {DrawerActions} from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, {color} from 'react-native-reanimated';
import Settings from 'react-native-vector-icons/Ionicons';
import Close from 'react-native-vector-icons/AntDesign';
import Logout from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../../../context';
import {Storage} from '../../../../storage/Storage';

const User = ({route, navigation}) => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [imageUri, setImageUri] = useState('');

  const {signOut} = useContext(AuthContext);

  const LogoutUser = () => {
    signOut();
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 16,
          height: 450,
        }}>
        <View>
          <Pressable
            onPress={() => sheetRef.current.snapTo(2)}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Close name="closecircleo" style={{color: '#ffffff'}} size={25} />
          </Pressable>
          <View style={{paddingHorizontal: 0, paddingVertical: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Settings
                name="settings"
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  paddingHorizontal: 10,
                }}
                size={20}
              />
              <Text style={styles.bottomSheet}>Settings</Text>
            </View>
            <Pressable
              onPress={() => LogoutUser()}
              style={{flexDirection: 'row', marginTop: 10}}>
              <Logout
                name="log-out"
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  paddingHorizontal: 10,
                }}
                size={20}
              />
              <Text style={styles.bottomSheet}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const fs = new Animated.Value(1);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // Prevent default behavior

      const fetchUser = async () => {
        try {
          // const info = await userInfo;
          const info = await Storage.getItem('userInfo');
          const user = await fetchSingleUser({_id: info.user._id});
          console.log(user.payload.post[0]);
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

  const data = [1, 4];

  const sheetRef = React.useRef(null);

  return (
    <>
      <HeaderBar
        back
        post={true}
        menu={true}
        title={
          <Text style={[headerTitleStyle, {fontStyle: 'italic'}]}>
            {userDetail !== null ? userDetail.name : 'followgram user'}
          </Text>
        }
        backFunction={() => navigation.goBack()}
        // openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        addPost={() => setShowAdd(!showAdd)}
        showAdd={showAdd}
        setImageUri={setImageUri}
        navigation={navigation}
        userInfo={userDetail}
        openBottomSheet={() => sheetRef.current.snapTo(0)}
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
              <Text style={[styles.text]}>{userDetail.post.length}</Text>
              <Text style={styles.item}>Posts</Text>
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate('Followers', {
                  users: userDetail.following,
                  name: 'Following',
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
                  name: 'Followers',
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
            <Pressable style={styles.edit}>
              <Text style={styles.editProfile}>Edit profile</Text>
            </Pressable>
            <View style={styles.edit}>
              <Text style={styles.editProfile}>View archieve</Text>
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
            <TopBar postUrl={userDetail.post} />
          </View>
        </View>
      ) : (
        <ActivityIndicator
          size={'large'}
          style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}
        />
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 300, 0]}
        borderRadius={10}
        initialSnap={2}
        renderHeader={renderHeader}
        callbackNode={fs}
        enabledGestureInteraction={true}
      />
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
  bottomSheet: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 18,
  },
});
