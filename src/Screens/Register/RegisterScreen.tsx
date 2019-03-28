import React, { Component } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'

import { Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

import FirebaseConnection from '../../Helpers/FirebaseConnection'


interface Props {
    navigation: NavigationScreenProp<any, any>,
    screenProps: { 
        firebaseConnection: FirebaseConnection
    }
}

export class RegisterScreen extends Component<Props> {
    public render() {
        //<Image resizeMode="contain" style={styles.logo} source={require('../../components/images/logo-dark-bg.png')} />
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>


                </View>
                <View style={styles.formContainer}>
                    <LoginForm onLoginCallback={(username, password) => this.login(username, password)} actionButtonText='REGISTER' />
                </View>
                <Button title="Edit Screen"
                    onPress={() => this.goToEditScreen()}
                />


            </KeyboardAvoidingView>
        );
    }

    private login(username: string, password: string) {
        // TODO TEST
        this.props.screenProps.firebaseConnection.register(username, password).then((success) => {

            this.showAlert('Registration OK!');
            if (this.props.screenProps.firebaseConnection.isLoggedIn()) {

                this.goToEditScreen()
            }
        }, (fail) => {

            this.showAlert('Registration Fail. Reason: ' + fail);
        })
    }

    private showAlert(message: string) {
        // TODO TEST
        Alert.alert(message);
    }

    private goToEditScreen() {

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'EditDetails' })]
            })
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
})