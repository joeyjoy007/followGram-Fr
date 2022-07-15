import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import AddPost from 'react-native-vector-icons/Octicons';
import Menu from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderBar = ({
  title,
  menu,
  post,
  back,
  backFunction,
  openDrawer,
  addPost,
  backgroundColor,
}) => {
  const widths = Dimensions.get('screen').width;
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
          <Pressable
            onPress={() => addPost()}
            style={{paddingHorizontal: 15, alignSelf: 'center'}}>
            <AddPost style={{color: '#ffffff'}} name="diff-added" size={23} />
          </Pressable>
        ) : null}
        {menu === true ? (
          <Pressable onPress={() => openDrawer()} style={{alignSelf: 'center'}}>
            <Menu style={{color: '#ffffff'}} name="menu" size={28} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({});
