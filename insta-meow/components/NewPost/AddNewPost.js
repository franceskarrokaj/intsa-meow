import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import FormicPostUploader from './FormicPostUploader';

const AddNewPost = () => {
    return (
        <View style={styles.container}>
            <Header />
            <FormicPostUploader />
        </View>
    );
}

const Header = () => {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Image 
                    source={{uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png"}}
                    style={{width: 30, height: 30, tintColor: "white"}}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>NEW POST</Text>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 10,
        // marginTop: 10,
    },

    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginRight: 23,
    },
})

export default AddNewPost;
