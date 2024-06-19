import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BottomTabs, { bottomTabsIcons } from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import { collection, db, getPosts } from '../firebase';

const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts(db);
        const fetchPosts = async () => {
            const data = await getPosts(db);
            console.log('TEdrrT');

            console.log(data);
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
