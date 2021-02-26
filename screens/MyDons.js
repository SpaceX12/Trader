import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import Myheader from '../components/Myheader';
import db from '../config';
import firebase from 'firebase';

export default class Mydons extends React.Component{

    constructor(){
        super();

        this.state = {
            userId : firebase.auth().currentUser.email,
            allDonates : []
        }

        this.requestRef = null
    }

    getDonations(){
        this.requestRef = db.collection('all_donations').where('donor_id', '==', this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonates = snapshot.docs.map(document => document.data());

            this.setState({
                allDonates : allDonates
            })
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, i}) =>{
        return(
            <ListItem
                key = {i}
                title = {item.request_name}
                subtitle = {item.reason_to_request}

                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.button}
                      onPress ={()=>{
                        this.props.navigation.navigate("RecieverDetails",{"details": item})
                      }}
                      >
                      <Text style={{color:'#ffff'}}>View</Text>
                    </TouchableOpacity>
                  }
                bottomDivider
            />
        )
    } 

    render(){
        return(
            <View style={{flex : 1}}>

                <Myheader navigation = {this.props.navigation} title = 'My Donations' />

                <View style={{flex : 1}} >
                    {
                        this.state.allDonates.length === 0
                        ?(
                            <View style={styles.subtitle}>
                                <Text style = {{fontSize : 15}}>All Donations</Text>
                            </View>
                        ):(
                            <FlatList
                                keyExtractor = {this.keyExtractor}
                                data = {this.state.allDonates}
                                renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitle:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    }
})