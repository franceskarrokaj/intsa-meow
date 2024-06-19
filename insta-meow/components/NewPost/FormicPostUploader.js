import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text , Image, TextInput, Button} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import {db, firebase, auth} from '../../firebase';

const PLACEHOLDER_IMG = "https://via.placeholder.com/300";

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("Image URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the maximum character limit of 2200").required("Caption is required"),
});

const FormicPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    
    const getUsername = () => {
        const user = auth().currentUser;
        console.log("hhhiuh");

        const unsubscribe = db
            .collection('users')
            .where("owner_uid", "==", user.uid).limit(1).onSnapshot (
                snapshot => snapshot.docs.map(doc => { 
                    setCurrentLoggedInUser({
                        username: doc.data().username,
                        profilePicture: doc.data().profilePicture
                    }
                )})
            )
        }

    useEffect(() => {
        getUsername();
    }, []);

    const uploadPosToFire = (imageUrl, caption) => {
        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                caption: caption,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                comments: [],
                liked_by_users: [],
            })
            .then(() => navigation.goBack())

        return unsubscribe;
    }



    return (    
        <Formik
            initialValues={{imageUrl: '', caption: ''}}
            onSubmit={values => {
                uploadPosToFire(values.imageUrl, values.caption);
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (  
                <>
                    <View style={{margin: 20, justifyContent: "space-between", flexDirection:"row"}}>
                        <Image 
                            source={{uri: validUrl.isUri(thumbnailUrl)
                                ? thumbnailUrl
                                : PLACEHOLDER_IMG
                            }}
                            style={{width: 100, height: 100, marginLeft: -15}}
                        />
                        <View style={{flex:1, marginLeft:10}}>
                            <TextInput 
                                style={{color: 'white', fontSize: 18.5}}
                                placeholder="Write a caption..."
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                                multiline={true}
                            />
                        </View>
                    </View>
                        <Divider width={0.2} orientation="vertical" />
                            <TextInput 
                                onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                                style={{color: 'white', fontSize: 18}}
                                placeholder="Enter Image URL"
                                onChangeText={handleChange('imageUrl')}
                                onBlur={handleBlur('imageUrl')}
                                value={values.imageUrl}
                            />
                        {errors.imageUrl  &&
                            <Text style={{fontSize:10, color: "red"}}>
                                {errors.imageUrl}
                        </Text>}
                    <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
                </>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({})

export default FormicPostUploader;
