import React from 'react';
import { StyleSheet, View, Text, Image, name, TouchableOpacity} from 'react-native';
import { Divider } from 'react-native-elements';
import post from "../../data/post";
import {db, firebase, auth} from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';


const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like--v1.png"
    },

    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/comments.png',     
    },

    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/share.png',       
    },
    
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/save.png',       
    },
]

const Post = ( {post} ) => {

    const handleLike = () => {

        if (!post.likes_by_users) {
            post.likes_by_users = [];
        }
    
        const currentLikesStatus = !post.likes_by_users.includes(
            auth().currentUser.email
        );

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users: currentLikesStatus
                    ? firebase.firestore.FieldValue.arrayUnion(
                        auth().currentUser.email
                    )
                    : firebase.firestore.FieldValue.arrayRemove(
                        auth().currentUser.email
                    )
            })

            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    return (
        <View style={{marginBottom: 30}}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter post={post} handleLike={handleLike}/>
                <Likes post={post} />
                {/* <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post} /> */}
            </View>
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
    <View 
        style={{
            width: '100%',
            height: 400,
        }}    
    >
        <Image 
            source={{uri: post.imageUrl}}
            style={{height: '100%', resizeMode: "cover" }}
        />
    </View>
)

const PostFooter = ({handleLike, post}) => (
    <View style={{flexDirection: "row" }}>
        <View style={styles.leftFooterIconContainer}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image 
                    style={styles.footerIcon}
                    source={{uri: post.likes_by_users && post.likes_by_users.includes(
                        firebase.auth().currentUser.email )
                        ? postFooterIcons[0].likedImageUrl
                        : postFooterIcons[0].imageUrl, 
                    }}
                />
            </TouchableOpacity>
            <Icon imgStyle={styles.footerIcon} imageUrl={postFooterIcons[1].imageUrl}/>
            <Icon imgStyle={styles.footerIcon} imageUrl={postFooterIcons[2].imageUrl}/>
        </View>

        <View style={{flex:1, alignItems:"flex-end"}}>
            <Icon imgStyle={styles.footerIcon} imageUrl={postFooterIcons[3].imageUrl}/>
        </View>
    </View>
)

const Icon = ({imgStyle, imageUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imageUrl }} />
    </TouchableOpacity>
)

const Likes = ( {post} ) => {
    if (!post || !post.likes_by_users) {
        return null;
    }

    return (
        <View style={{flexDirection:"row", marginTop: 4}}>
            <Text style={{color:"white", fontWeight:"600"}}>
                {post.likes_by_users.length.toLocaleString('en')} likes
            </Text>
        </View>
    );
}
const Caption = ( {post} ) => (
    <View style={{marginTop: 5}}>
        <Text style={{color:"white"}}>
            <Text style={{fontWeight: "600", marginLeft: 5}}>{post.user }</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentsSection = ( {post} ) => (
    <View style={{marginTop: 5}}>
        {!!post.comments.length && (
            <Text style={{color: "gray"}}>
                View{post.comments.length > 1 ? " all " : " "} {post.comments.length} {" "}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>   
        )}
    </View>
)

const Comments = ( {post} ) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{flexDirection:"row", marginTop: 5}}>
                <Text style={{color:"white"}}>
                    <Text style={{fontWeight:"60"}}>{comment.user}</Text>{" "}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
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

    footerIcon: {
        width: 33,
        height: 33,
    },

    leftFooterIconContainer: {
        width: "32%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
})


export default Post;
