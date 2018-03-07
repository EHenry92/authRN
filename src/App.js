import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {firebaseData} from '../secrets';
import {Header} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentDidMount () {
    firebase.initializeApp(firebaseData);
  }
  render () {
    return (
      <View>
        <Header title = "Authentication" />
        <LoginForm />
      </View>
    );
  }
}
export default App;
