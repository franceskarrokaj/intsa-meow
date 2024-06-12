import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LogInForm from '../components/LogInScreen/LogInForm';

const INSTAGRAM_LOGO = "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}}/>
            </View>
            <LogInForm />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
})

export default LoginScreen;
