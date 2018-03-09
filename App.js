import React from 'react';
import { StyleSheet, Text, Image} from 'react-native';

import * as firebase from 'firebase'; // 4.10.0

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyCY-kvWGhpEr5jlxcPGNGnmVWrrJO5Zgx0",
  authDomain: "pruebaexpo-a0dd4.firebaseapp.com",
  databaseURL: "https://pruebaexpo-a0dd4.firebaseio.com",
  projectId: "pruebaexpo-a0dd4",
  storageBucket: "pruebaexpo-a0dd4.appspot.com",
};

if (!firebase.apps.length) {
    firebase.initializeApp({});
}

import { Container, Form, Input, Item, Button, Label } from 'native-base' // 2.3.9

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = ({
            email: '',
            password: ''
        })
    }

    signUpUser = (email, password) => {
        try {

            if (this.state.password.length < 6) {
                alert("Please enter atleast 6 characters")
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
        }
        catch (error) {
            console.log(error.toString())
        }
    }

    loginUser = (email, password) => {

        try {

            firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                console.log(user)

            })
        }
        catch (error) {
            console.log(error.toString())
        }
    }

    render() {
      const image = 'https://cdn.pixabay.com/photo/2017/08/06/06/25/technology-2589463_1280.jpg'
        return (

            <Container style={styles.container}>
            <Image style={styles.image} source={{uri: image}}/>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </Item>

                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        success
                        onPress={() => this.loginUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'black' }}> Login</Text>
                    </Button>

                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.signUpUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'black' }}> Sign Up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AEAFAE',
        justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      //flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      resizeMode: 'cover',
  },
});
