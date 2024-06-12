import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import FormicPostUploader from './FormicPostUploader';

const AddNewPost = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <FormicPostUploader navigation={navigation} />
        </View>
    );
}

const Header = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
