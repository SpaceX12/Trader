import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DonationScreen from '../screens/DonationScreen';
import RequestsScreen from '../screens/RequestsScreen';



export const AppTabNavigator = createBottomTabNavigator({
  Donate : {
    screen: DonationScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate",
    }
  },
  Request: {
    screen: RequestsScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Request",
    }
  }
});