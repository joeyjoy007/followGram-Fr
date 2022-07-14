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
import {searchUser} from '../../server/apis/user';
import {userData} from '../utils/UserData';

const Followers = ({navigation, route}) => {
  const [searchText, setSearchText] = useState('');
  const [Users, setUsers] = useState(null);

  const {users} = route.params;
  console.log(users.following);
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

  //   const jumpToUser = item => {
  //     navigation.navigate('SearchedUser', {
  //       details: item,
  //     });
  //   };

  const renderUsers = ({item}) => {
    // console.log('ITEM', item);
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
          source={{
            uri: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
          }}
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
      {/* <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={text => findUser(text)}
      /> */}

      <FlatList
        data={users.following}
        keyExtractor={item => item._id}
        renderItem={renderUsers}
      />
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  search: {
    height: 25,
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
