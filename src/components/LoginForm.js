import React, {Component} from 'react';
import {Text} from 'react-native';
import {Card, CardSection, Button, InputField, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {email: '', password: '', err: '', loading: false};

  onButtonPress(){
    const {email, password} = this.state;
    this.setState({err: '', loading: true});
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch (() => {
      throw firebase.auth().createUserWithEmailAndPassword(email, password)
    })
    .then(this.onLoginSuccess.bind(this))
    .catch (this.onLoginFail.bind(this))
  }

  onLoginSuccess () {
    this.setState({err: '', loading: false, email: ' ', password: ''})
  }
  onLoginFail () {
    this.setState({err: 'Authentication Failed', loading: false, email: '', password: ''})
  }

  render () {
    console.log("email", this.state.email, "password", this.state.password)
    return (
      <Card >
        <CardSection>
          <InputField
            value = {this.state.email}
            onChangeText = {email => this.setState({email})}
            label='Email'
            placeholder = 'example@email.com'
            secureTextEntry = {false}
          />
         </CardSection>
         <CardSection>
           <InputField
            value = {this.state.password}
            onChangeText = {password => this.setState({password})}
            label='Password'
            placeholder = 'password'
            secureTextEntry
           />
         </CardSection>
        <Text style = {styles.errorTextStyle}>
          {this.state.err}
        </Text>
        <CardSection>
          {
            !this.state.loading ?
            <Button onPress={this.onButtonPress.bind(this)}>
              Login
            </Button>
            :
            <Spinner size = 'large' />

          }
        </CardSection>
        </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
