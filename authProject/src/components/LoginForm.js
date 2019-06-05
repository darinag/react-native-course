import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
state = { email: '', password: '', error: '', loading: false };

onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true }); //clear the error message && show spinner

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(this.onLoginSuccess.bind(this))
              .catch(this.onLoginFail.bind(this))
        });
}

onLoginFail() {
    this.setState({
        error: 'Authentication failed',
        loading: false
    });
};

onLoginSuccess() {
    this.setState({
        email: '',
        password: '',
        loading: false,
        error: ''
    });
}

renderButton() {
    if (this.state.loading) {
        return <Spinner size="small" />;
    }

    return (
        <Button onPress={this.onButtonPress.bind(this)}>
        Log In
        </Button>
    );
}

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="email@gmail.com"
                        label="Email"
                        value={this.state.email} //value is props
                        onChangeText={ email => this.setState({ email }) } 
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry="true"
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={ password => this.setState({ password }) }
                    />
                </CardSection>

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
