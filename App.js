import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements'
import SL from './screens/SL';
import db from './Config';
import firebase from 'firebase';

export default class App extends React.Component {
 render(){
   return(
     <View style={styles.container}>
             <Header backgroundColor={"black"} centerComponent={{
                    text: "Take And Give",
                    style: {
                        color:'red',
                        fontSize:30
                    }
                }}
                />
      <SL/>
    </View>
   )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    paddingBottom:20,
   
  },
  tle:{
    justifyContent:'center',
    alignItems:'center',
    fontSize:30
  }
});
