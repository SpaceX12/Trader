import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import DonationScreen from '../screens/DonationScreen';
import RecDetScreen from '../screens/RecDetScreen';

export const AppStackNaviator = createStackNavigator({
    DonateList:{
        screen : DonationScreen,
        navigationOptions :{
            headerShown:false
        }
    },
    RecieverDetails : {
        screen : RecDetScreen,
        navigationOptions :{
            headerShown:false
        }
    },
},
{
    intialRouteName : DonateList
}
)