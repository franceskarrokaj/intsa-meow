import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

const SignedInStack = () => {
    <NavigationContainer>
        <Stack.Navigator/>
    </NavigationContainer>
}

const styles = StyleSheet.create({})

export default SignedInStack;
