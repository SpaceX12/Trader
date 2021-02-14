import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu';
import SetScreen from '../screens/SetScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen: AppTabNavigator,
  },
  Settings:{
    screen: SetScreen
  }
},{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName : 'Home'
}

);
