import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/Myheader';

export default class RecDetScreen extends React.Component{

    constructor(){
        super(props);

        this.state={
            userId : firebase.auth().currentUser.email,
            recieverId : this.props.navigation.getParam('details')['user_id'],
            object : this.props.navigation.getParam('details')['name'],
            requestId : this.props.navigation.getParam('details')['request_id'],
            reason : this.props.navigation.getParam('details')['reason_to_request'],
            rName : '',
            rContact : '',
            rAddress : '',
            rRequestDocId : '',
        }
    }

    getRecieverDetails(){
        db.collection('users').where('email_id', '==', this.state.recieverId).get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                this.setState({
                    rName : doc.data().uName,
                    rContact : doc.data().contact,
                    rAddress : doc.data().address
                })
            })
        })

        db.collection('requets').where('request_id', '==', this.state.requestId).get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                this.setState({rRequestDocId : doc.id})
            })
        })
    }

    updateBookStatus=()=>{
        db.collection('all_donations').add({
          "object" : this.state.object,
          "request_id" : this.state.requestId,
          "requested_by" : this.state.recieverName,
          "donor_id" : this.state.userId,
          "request_status" : "Donor Interested"
        })
    }

    componentDidMount(){
        this.getRecieverDetails()
        this.getUserDetails(this.state.userId)
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={{flex:0.1}}>
                    <Header
                        leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                        centerComponent={{ text:"Donate", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                        backgroundColor = "#eaf8fe"
                    />
                </View>

                <View style={{flex:0.3}}>
                    <Card
                        title={"Information"}
                        titleStyle= {{fontSize : 20}}
                    >
                        <Card >
                            <Text style={{fontWeight:'bold'}}>Name : {this.state.object}</Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason}</Text>
                        </Card>
                    </Card>
                </View>

            
                <View style={{flex:0.3}}>
                    <Card
                        title={"Reciever Information"}
                        titleStyle= {{fontSize : 20}}
                    >
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                        </Card>
                    </Card>
                </View>

                <View>
                
                   {
                        this.state.recieverId !== this.state.userId
                        ?(
                            <TouchableOpacity
                            
                            style={styles.button}

                            onPress={()=>{
                                this.updateBookStatus()
                                this.props.navigation.navigate('MyDons')
                            }}

                            > <Text>Donate Item</Text></TouchableOpacity>
                        ) : null
                        
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
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"blue",
        marginTop:20
    }
})