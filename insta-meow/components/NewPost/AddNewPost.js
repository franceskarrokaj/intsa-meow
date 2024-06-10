import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const AddNewPost = () => {
    return (
        <View>
            <Image 
                source={{uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png"}}
                style={{width: 30, height: 30, tintColor: "white"}}
            />
            <Text style={{color: "white"}}>Add New Post</Text>
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
})

export default AddNewPost;
