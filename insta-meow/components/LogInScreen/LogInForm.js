import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Validator from 'email-validator';

const LogInForm = ({navigation}) => {

    const LoginFormSchema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required('An email is required.'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters.')
            .required(),
    });

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={LoginFormSchema}
                validationOnMount={true}
                onSubmit={values => {console.log(values)}}
            >
                {({isValid, values, errors, handleChange, handleBlur, handleSubmit}) =>
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
                            placeholderTextColor="#444"
                            placeholder="Phone number, username or email"
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoFocus={true}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
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
                    <View style={{alignItems:"flex-end", marginBottom: 30}}>
                        <Text style={{color: '#6BB0F5'}}>Forgot password?</Text>
                    </View>

                    <Pressable
                        tittleSize={20}
                        style={styles.button(isValid)} 
                        onPress={handleSubmit}
                        disabled={!isValid}
                        
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>

                    <View style={styles.signupContainer}>
                        <Text>Don't have an account yet?</Text>
                        <TouchableOpacity>
                            <Text style={{color: '#6BB0F5'}}>   Sign up</Text>
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

export default LogInForm;
