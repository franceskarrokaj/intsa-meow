import React from 'react';
import { StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
})

export default HomeScreen;
