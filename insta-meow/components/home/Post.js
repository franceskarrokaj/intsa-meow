import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { Divider } from 'react-native-elements';

const Post = ( {post} ) => {
    return (
        <View style={{marginBottom: 30}}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
        </View>
    );
}

const PostHeader = ( {post} ) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5, 
        alignItems: "center",
        }}
    >
        <View style={{flexDirection: 'row', alignItems: 'center'}} >
            <Image 
                source={{ uri: post.profile_picture }}
                style={styles.story}
            />
            <Text style={{color:'white', marginLeft: 5, fontWeight: '900'}}
            >
                {post.user}
            </Text>
        </View>

    </View>
)

const PostImage = ( {post} ) => (
    <Image 
        source={{uri: post.imageUrl}}
        style={{height: '100%', resizeMode: "cover" }}
    />
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: "#ff8501", 
    },
})


export default Post;
