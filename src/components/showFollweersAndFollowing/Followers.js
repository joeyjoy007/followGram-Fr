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
import HeaderBar from '../headerBar/HeaderBar';
import {headerTitleStyle} from '../utils/constants';

const Followers = ({navigation, route}) => {
  const [searchText, setSearchText] = useState('');
  const [Users, setUsers] = useState(null);

  const {users, name} = route.params;

  const jumpToUser = item => {
    navigation.navigate('SearchedUser', {
      details: item,
    });
  };

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
    <>
      <HeaderBar
        backFunction={() => navigation.goBack()}
        back
        title={
          <Text style={[headerTitleStyle, {fontStyle: 'italic'}]}>{name}</Text>
        }
      />
      <View style={styles.main}>
        {/* <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={text => findUser(text)}
      /> */}

        <FlatList
          data={users}
          keyExtractor={item => item._id}
          renderItem={renderUsers}
        />
      </View>
    </>
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
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  searchText: {
    fontWeight: '500',
    alignSelf: 'center',
  },
});
