/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import { createAppContainer, createStackNavigator } from 'react-navigation'
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { AboutAppScreen } from './Screens/AboutApp/AboutAppScreen'
import { ProfileScreen } from './Screens/Profile/ProfileScreen'
import { HomeScreen } from './Screens/Home/HomeScreen'
import { LoginScreen } from './Screens/Login/LoginScreen'
import { RegisterScreen } from './Screens/Register/RegisterScreen'
import { BrowseScreen } from './Screens/Browse/BrowseScreen'
import { InterestScreen } from './Screens/Interest/InterestScreen'
import { InvitationsScreen } from './Screens/Invitations/InvitationsScreen'
import { InvitationScreen } from './Screens/Invitation/InvitationScreen'
import SplashScreen from './Screens/Splash'

import FirebaseConnection from './Helpers/FirebaseConnection'

import AReducer from './Redux/Reducers/DummyReducer'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Profile: { screen: ProfileScreen },
  Home: { screen: HomeScreen },
  AboutApp: { screen: AboutAppScreen },
  Browse: { screen: BrowseScreen },
  Interest: { screen: InterestScreen },
  Invitation: { screen: InvitationScreen },
  Invitations: { screen: InvitationsScreen },
  Splash: { screen: SplashScreen }
},
  { initialRouteName: 'Login' });

const Nav = createAppContainer(MainNavigator);

const reducer = combineReducers({ AReducer })

const middleware = [thunk, logger]
const store = createStore(reducer, applyMiddleware(...middleware))

const scrProps = { firebaseConnection: FirebaseConnection.getInstance() }

interface Props { }
class App extends Component<Props> {

  public render() {
    return (
      <Provider store={store}>
        <Nav screenProps={scrProps} />
      </Provider>
    )
  }
}

export default App;
