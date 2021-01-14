import * as React  from 'react';
import {View, Alert, TouchableOpacity, TextInput, StyleSheet, Text, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../Config.js';
import firebase from 'firebase';

export default class SL extends React.Component {

    constructor(){
        super();

        this.state={
          emailId:'',
          password:'',
          username:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVisible: false
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

    userSignUp = (username, password, confirmPassword)=>{

        if(confirmPassword !== password){
            Alert.alert("The password doesn't match")
        }else{

            firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((response)=>{
                db.collection(Users).add({
                    user : this.state.username,
                    mobile_number : this.state.contact,
                    address : this.state.address,
                    email : this.state.emailId
                })
                return Alert.alert('Account created',
                '',
                [{text:'Ok', onPress: ()=> this.setState({isModalVisible:false})}])   
            })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
        }
    }

    showModal = ()=>{
        <Modal
        animationType = 'none'
        transparent = {true}
        visible = {this.state.isModalVisible}
       >

            <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                        <Text style={styles.modalTitle}>Sign Up</Text>

                        <TextInput
                            style={styles.form}
                            placeholder='Username'
                            onChangeText={(text)=>{
                                this.setState({
                                    username: text
                                })
                            }}
                        />

                        <TextInput
                            style={styles.form}
                            placeholder='Email'
                            keyboardType = 'email-address'

                            onChangeText={(text)=>{
                                this.setState({
                                    emailId: text
                                })
                            }}
                        />

                        <TextInput
                            style={styles.form}
                            placeholder='Password'
                            secureTextEntry = {true}
                            keyboardType = 'number-pad'

                            onChangeText={(text)=>{
                                this.setState({
                                    password: text
                                })
                            }}
                        />

                        <TextInput
                            style={styles.form}
                            placeholder=' Confirm Password'
                            secureTextEntry = {true}
                            keyboardType = 'number-pad'

                            onChangeText={(text)=>{
                                this.setState({
                                   confirmPassword: text
                                })
                            }}
                        />

                        <TextInput
                            style={styles.form}
                            placeholder='Adress'
                            onChangeText={(text)=>{
                                this.setState({
                                    address: text
                                })
                            }}
                        />

                        <TextInput
                            style={styles.form}
                            placeholder='Contact'
                            keyboardType = 'number-pad'

                            onChangeText={(text)=>{
                                this.setState({
                                    contact: text
                                })
                            }}
                        />

                        <View style={styles.modalBackButton}>
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={()=>
                                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                }
                            >
                            <Text style={styles.registerButtonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.modalBackButton}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={()=>this.setState({"isModalVisible":false})}
                            >
                            <Text style={{color:'#ff5722'}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>
    }

    render(){
        return(
            <View style={styles.container}>

                <View>
                    {this.showModal()}
                </View>

                <View style={styles.buttonContainer}>

                    <TextInput
                        style={styles.loginBox}
                        placeholder="  E-mail"
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

                        placeholder="  Password"
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
                    onPress={()=>this.setState({ isModalVisible:true})}

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
    },
    form:{
        backgroundColor: '#5f5ae2',
        paddingBottom:10,
        width:90,
        alignItems:'center',
        borderRadius:5,
        marginTop:20
    },
    modalTitle:{
        fontSize:10,
        color:'white'
    },
    modalContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    keyboardAvoidingView:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})