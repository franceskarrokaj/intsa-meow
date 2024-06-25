import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text , Image, TextInput, Button} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import {db, firebase, auth} from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const PLACEHOLDER_IMG = "https://via.placeholder.com/300";

const uploadPostSchema = Yup.object().shape({
    caption: Yup.string().max(2200, "Caption has reached the maximum character limit of 2200").required("Caption is required"),
});

const FormicPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    
    const getUsername = () => {

        const user = auth.currentUser;
        console.log(user.photoURL);

        // const unsubscribe = db
        //     .collection('users')
        //     .where("owner_uid", "==", user.uid).limit(1).onSnapshot (
        //         snapshot => snapshot.docs.map(doc => { 
        //             setCurrentLoggedInUser({
        //                 username: doc.data().username,
        //                 profilePicture: doc.data().profilePicture
        //             }
        //         )})
        //     
        }

    useEffect(() => {
        getUsername();
    }, []);

    const uploadPosToFire = async (caption) => {
        try {
            await addDoc(collection(db, 'posts'), {
                caption: caption,
                imageUrl: imageUrl,
              });
        } catch (error) {
            console.error('Error adding post: ', error);
        }
    }

    return (  
        <>
        {/* <View style={{flex:1, justifyContent: "center", alignItems: "center"}}> */}
        <TextInput 
                    value={imageUrl}
                    style={{color: 'white', fontSize: 18}}
                    placeholder="Enter Image URL"
                    onChange={(e) => setImageUrl(e.nativeEvent.text)}
                />
            <Divider width={0.2} orientation="vertical" />
            {/* </View> */}
        <Formik
            initialValues={{imageUrl: '', caption: ''}}
            onSubmit={values => {
                uploadPosToFire(values.caption);
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (  
                <>
                    <View style={{margin: 20, justifyContent: "space-between", flexDirection:"row"}}>
                        <Image 
                            source={{uri: validUrl.isUri(thumbnailUrl)
                                ? imageUrl
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
                    <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
                </>
            )}
        </Formik>
        </>  
    );
}

const styles = StyleSheet.create({})

export default FormicPostUploader;
