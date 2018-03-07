import React, {Component} from 'react';
import {Text} from 'react-native';
import {Card, CardSection, Button, InputField} from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {email: '', password: '', err: ''};
  onButtonPress(){
    console.log("pressed it")
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch (() => {
      throw firebase.auth().createUserWithEmailAndPassword(email, password)
    })
    .catch (() => {this.setState({err: 'Authentication Failed'})
    });
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
            placeholder = '******'
            secureTextEntry
           />
         </CardSection>
        <Text style = {styles.errorTextStyle}>
          {this.state.err}
        </Text>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>
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
