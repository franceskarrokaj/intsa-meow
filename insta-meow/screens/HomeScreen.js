import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BottomTabs, { bottomTabsIcons } from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import { db, getPosts } from '../firebase';
import { getDoc, getDocs } from 'firebase/firestore';
import { collection, collectionGroup } from 'firebase/firestore';

const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            // const snap = db.collection('posts').get();
            // console.log(snap);
            // const data = getDocs(collection(db, 'posts'));
            const snapshot = await getDocs(collection(db, 'posts'));
            const posts = snapshot.docs.map(doc => doc.data());
            setPosts(posts);
        }
        fetchPosts();
        // db.collection('posts')
        //     .orderBy('createdAt', 'desc')
        //     .onSnapshot(snapshot => {
        //         setPosts(snapshot.docs.map(post => ( {id: post.id, ...post.data()})));
        // });
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView>
            <BottomTabs icons={bottomTabsIcons} />
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
