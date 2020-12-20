import * as React  from 'react';
import {View, Alert, TouchableOpacity, TextInput, StyleSheet, Text} from 'react-native';
import db from '../Config.js';
import firebase from 'firebase';

export default class SL extends React.Component {

    constructor(){
        super()
        this.state={
          username : '',
          password: ''
        }
      }

    userLogin = (username, password) =>{
        firebase.auth().signInWithEmailAndPassword(username,password)
        .then(()=>{
           return Alert.alert('Logged In');
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    userSignUp = (username, password)=>{
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(()=>{
            return Alert.alert('Account created');
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.buttonContainer}>

                    <TextInput
                        style={styles.loginBox}
                        placeholder="E-mail"
                        placeholderTextColor = "#888888"
                        keyboardType ='email-address'

                        onChangeText={(text)=>{
                            this.setState({
                            username: text
                            })
                        }}
                    />

                    <TextInput style={styles.loginBox}
                        secureTextEntry = {true}

                        placeholder="Password"
                        placeholderTextColor = "#888888"

                        onChangeText={(text)=>{
                            this.setState({
                            password: text
                            })
                        }}
                    />

                    <TouchableOpacity
                        style={[styles.button,{marginBottom:20, marginTop:20}]}
                        onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
                    ><Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.userSignUp(this.state.username, this.state.password)}}

                    ><Text style={styles.buttonText}>SignUp</Text>
                    </TouchableOpacity>
            </View>
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
    buttonContainer:{
        flex: 1,
        alignItems:'center'
    },
    buttonText:{
        fontSize:20,
        color:'#eca703'
    },
    button:{
        backgroundColor: '#5f5ae2',
        paddingBottom:10,
        width:90,
        alignItems:'center',
        borderRadius:5,
        marginTop:20
    },
    title:{
        fontSize:10
    },
    loginBox:{
        borderWidth:3,
        borderRadius:3,
        marginTop:30,
        width:190
    },
    profileContainer:{
        backgroundColor:'red'
    }
})