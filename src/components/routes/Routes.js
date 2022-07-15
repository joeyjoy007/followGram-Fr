import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useReducer, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Drawer from '../drawer/Drawer';
// import Search from '../search/Search';
import TabBar from '../instaGramTabBar/TabBar';
import RealSearch from '../instaGramTabBar/tabBarItems/search/RealSearch';
import SearchedUser from '../searchedUser/SearchedUser';
import {AuthContext} from '../../context/index';
import {Storage} from '../../storage/Storage';
import RootStackScreen from '../../rootStackScreen/RootStackScreen';
import {loginUser} from '../../server/apis/user';
import Followers from '../showFollweersAndFollowing/Followers';
import TopBar from '../instaGramTabBar/bottomTabBar/mainField/TopBar';
import HeaderBar from '../headerBar/HeaderBar';
import Drawer from '../drawer/Drawer';

const Stack = createNativeStackNavigator();
const Routes = () => {
  const [refreshState, setRefreshState] = useState(false);
  const [refreshBucket, setRefreshBucket] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userToken: undefined,
    type: undefined,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.di.token,
          // userType: action.di.type,
        };

      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.di.token,
          // userType: action.di.type,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          userToken: undefined,
          isLoading: false,
          // userType: undefined,
        };

      case 'SIGNUP':
        return {
          ...prevState,
          isLoading: false,
          userToken: true,
          // userType: undefined,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // setUserToken("TokenExist")
        // setIsLoading(false)
        try {
          console.log('DATA', data);
          const response = await loginUser(data);
          console.log(response.status);
          if (response.status === 1) {
            await Storage.setItem('token', response.payload.token);
            // await Storage.setItem('userType', response.payload.user.type);
            const getToken = await Storage.getItem('token');
            await Storage.setItem('userInfo', response.payload);
            dispatch({
              type: 'LOGIN',
              di: {
                token: await Storage.getItem('token'),
                // type: await Storage.getItem('userType'),
              },
            });

            //  ToastHOC.successAlert('Login Success ', response.message);
            // console.log(await Storage.getItem('userType'));
            // axios.defaults.headers.common['Authorization'] = response.token;
            // navigation.navigate('BottomTabBar');
          } else {
            //  ToastHOC.errorAlert('Login failed');
            console.log('Login Failed');
          }
        } catch (error) {
          //    ToastHOC.errorAlert(error.message);
          console.log('ff', error);
        }
      },
      signOut: async () => {
        // setUserToken(null)
        // setIsLoading(false)
        try {
          await Storage.removeItem('token');
          await Storage.removeItem('userInfo');
          // await Storage.removeItem('userType');
        } catch (error) {
          console.log(error.message);
        }
        dispatch({type: 'LOGOUT'});
        // ToastHOC.infoAlert('User Logout');
      },
      signUp: () => {
        // setIsLoading(false)
        // setUserToken("TokenExist")
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      let userType;
      userToken = undefined;
      userType = undefined;
      try {
        userToken = await Storage.getItem('token');
        // userType = await Storage.getItem('userType');
        // console.log('USERTOKEN', userToken);
        // console.log('USERINFO', await Storage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
      }
      // dispatch({type: 'RETRIVE_TOKEN', di: {token: userToken, type: userType}});
      dispatch({type: 'RETRIVE_TOKEN', di: {token: userToken}});
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loginState.userToken !== undefined ? (
          <>
            <Stack.Screen name="TabBar" component={TabBar} />
            <Stack.Screen name="RealSearch" component={RealSearch} />
            <Stack.Screen name="SearchedUser" component={SearchedUser} />
            <Stack.Screen name="Followers" component={Followers} />
            <Stack.Screen name="HeaderBar" component={HeaderBar} />
            <Stack.Screen name="Drawer" component={Drawer} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={RootStackScreen} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({});
