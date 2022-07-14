import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import {userData} from '../../../utils/UserData';
import {userImage} from '../../../utils/userImage';
import {searchUser} from '../../../../server/apis/user';

const RealSearch = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [Users, setUsers] = useState(null);

  // const findUser = e => {
  //   setSearchText(e);

  //   const users = userData.filter(
  //     user => user.name.charAt(e.length - 1) === e.charAt(e.length - 1),
  //   );
  //   if (users.length > 0) {
  //     setUsers(users);
  //     if (e.length === 0) {
  //       setUsers(null);
  //     }
  //   } else {
  //     setUsers('no user found');
  //   }
  // };
  const findUser = async text => {
    setSearchText(text);
    const users = await searchUser(text);
    if (users.payload.length > 0) {
      setUsers(users.payload);
      if (text.length === 0) {
        setUsers(null);
      }
    } else {
      setUsers('no user found');
    }
  };

  const jumpToUser = item => {
    navigation.navigate('SearchedUser', {
      details: item,
    });
  };

  const renderUsers = ({item}) => {
    return (
      <Pressable
        style={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
        key={item._id}
        onPress={() => jumpToUser(item)}>
        <Image
          source={{uri: item.profilePic}}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: 'contain',
          }}
        />
        <Text style={{paddingHorizontal: 20}}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={text => findUser(text)}
      />

      <FlatList
        data={Users}
        keyExtractor={item => item._id}
        renderItem={renderUsers}
      />
    </View>
  );
};

export default RealSearch;

const styles = StyleSheet.create({
  search: {
    height: 30,
    borderRadius: 4,
    backgroundColor: '#808080',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: -10,
  },
  main: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchText: {
    fontWeight: '500',
    alignSelf: 'center',
  },
});
