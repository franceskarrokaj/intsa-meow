import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { SignedInStack, SignedOutStack } from './navigation';
import { useGestureHandlerRef } from '@react-navigation/stack';
import {firebase} from './firebase';

const AuthNavigation = () => {

    const [currentUser, setCurrentUser] = React.useState(null);

    const userHandler = user =>
        user ? setCurrentUser(user) : setCurrentUser(null);

    
    useEffect(
        () => 
            Firebase.auth().onAuthStateChanged(user =>  useGestureHandlerRef(user)),
        []
    );
    return <> {currentUser ? <SignedInStack/> : <SignedOutStack/>} </>
}

const styles = StyleSheet.create({})

export default AuthNavigation;
