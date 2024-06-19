import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import {Formik} from 'formik'; 
import * as yup from 'yup';
import Validator from 'email-validator';
import { FirebaseError } from 'firebase/app';
import { db , getAuth} from '../../firebase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';


const SignUpForm = ({navigation}) => {

    const SignupFormSchema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required('An email is required.'),
        username: yup
            .string()
            .min(2, 'Username must be at least 2 characters.')
            .required(),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters.')
            .required(),
    });

    const getRandomProfilePicture = async() => {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        return data.results[0].picture.large;
    }

    const onSignUp = async(email, password, username) => {
        try {
            const authUser = await FirebaseError
                
                await createUserWithEmailAndPassword(auth, email, password);
            console.log("Firebase user created successfully: ", email);

            db.collection('users')
                .doc(authUser.user.email)
                .set( {
                    owner_uid: authUser.user.uid,
                    username: username,
                    email: authUser.user.email,
                    profile_picture: await getRandomProfilePicture(),
                })
        } catch (error) { 
            Alert.alert("Error: ", error.message);
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', password: '', username: ''}}
                validationSchema={SignupFormSchema}
                validationOnMount={true}
                onSubmit={values => {onSignUp(values.email, values.password, values.username)}}
            >
                {({isValid, values, handleChange, handleBlur, handleSubmit}) =>
                (

                <>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor:
                                values.email.length < 1 || Validator.validate(values.email) 
                                    ? "#ccc" 
                                    : "red"
                        }
                    ]}>
                        <TextInput
                            name="email"
                            placeholderTextColor="#444"
                            placeholder="Enter your email"
                            autoCapitalize='none'
                            keyboardType='email-address'
                            autoFocus={true}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>

                    <View style={[
                        styles.inputField,
                        {
                            borderColor:
                                1 > values.username.length || values.username.length > 7
                                    ? "#ccc" 
                                    : "red"
                        },
                        ]}
                    >
                        <TextInput 
                            name="username"
                            placeholderTextColor="#444"
                            placeholder="Enter an username"
                            autoCapitalize='none'
                            keyboardType='username'
                            textContentType='username'
                            autoFocus={true}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                    </View>

                    <View style={[styles.inputField ,
                            { borderColor:
                                1 > values.password.length || values.password.length > 7
                                    ? "#ccc" 
                                    : "red"
                            },
                    ]}>
                        <TextInput
                            name="password"
                            placeholderTextColor="#444"
                            placeholder="Password"
                            autoCapitalize='none'
                            autoCorrect={false}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </View>


                    <Pressable
                        tittleSize={20}
                        style={styles.button(isValid)} 
                        onPress={handleSubmit}                        
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>

                    <View style={styles.signupContainer}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.goBack("LoginScreen")}>
                            <Text style={{color: '#6BB0F5'}}>   Log in</Text>
                        </TouchableOpacity>

                    </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({

    wrapper: {
        marginTop: 80,
    },

    inputField: {
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: '#FAFAFA',
        padding: 11,
    },

    button: isValid => ({
        backgroundColor: isValid ? '#0096F6': '#9ACAF7',
        borderRadius: 4,
        alignItems: 'center',
        minHeight: 40,
        justifyContent: 'center',
        marginBottom: 50,
    }),

    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        width: '100%',
    },
})

export default SignUpForm;
