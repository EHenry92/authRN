import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {firebaseData} from '../secrets';
import {Header, Button,Spinner,Card,CardSection} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};
  componentDidMount () {
    firebase.initializeApp(firebaseData);
    //Whenever the users signs in or out
    firebase.auth().onAuthStateChanged((user) => {
      // user == user object or null/undefined
      if (user) {
        this.setState({loggedIn: true})
      }
      else {
        this.setState({loggedIn: false})
      }

    })
  }
  renderContent () {
    switch(this.state.loggedIn) {
      case false:
        return <LoginForm />;
      case true:
        return (
          <Card><CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection></Card>
            );
      default:
        return <Spinner size='large'/>;
    }
  }

  render () {
    return (
      <View>
        <Header title = "Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
export default App;
