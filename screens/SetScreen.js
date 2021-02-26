import React,{Component}from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/Myheader';

export default class SetScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            uName:'',
            address:'',
            contact:'',
            docId:''
        }
    }

    getUserDetails(){
        var user = firebase.auth().currentUser;
        var email = user.email

        db.collection('users').where('email_id', '==', email).get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                var data = doc.data()

                this.setState({
                    emailId : doc.email_id,
                    uName : doc.u_name,
                    address : doc.address,
                    contact :doc.contact,
                    docId : doc.id    
                })
            })
        })
    }

    updateUserDetails(){
        db.collection('users').doc(this.state.docId)
        .update({
            'uName' : this.state.uName,
            'address' : this.state.address,
            'contact' : this.state.contact
        })

        Alert.alert("Profile Updated");
    }

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View style={styles.container}>
                <Myheader title="Profile Settings" navigation={this.props.navigation} />

                <View style={styles.formCon}>
                    
                <TextInput
                    style={styles.formTI}
                    placeholder ={"Username"}
            
                    onChangeText={(text)=>{
                        this.setState({uName: text})
                    }}
                    value={this.state.uName}
                />

                <TextInput
                    style={styles.formTI}
                    placeholder ={"Contact"}
                    maxLength ={10}

                    keyboardType={'numeric'}
                    onChangeText={(text)=>{
                        this.setState({contact: text})
                    }}

                    value={this.state.contact}
                />

                <TextInput
                    style={styles.formTI}
                    placeholder ={"Address"}
                    multiline = {true}

                    onChangeText={(text)=>{
                        this.setState({address: text})
                    }}
                    
                    value={this.state.address}
                />

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.text} >Save Changes</Text>
                </TouchableOpacity>

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
   formCon:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   },
   formTI:{
    width:300,
    height:35,
    alignSelf:'center',
    borderColor:'#396AED',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
   },
   button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
   },
   text:{
    color:'#ffff',
    fontSize:20
   }
})