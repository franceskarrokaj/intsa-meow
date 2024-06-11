import React, {useState} from 'react';
import { StyleSheet, View, Text , Image, TextInput, Button} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Divider } from 'react-native-elements';

const PLACEHOLDER_IMG = "https://via.placeholder.com/300";

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("Image URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the maximum character limit of 2200").required("Caption is required"),
});

const FormicPostUploader = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    
    return (    
        <Formik
            initialValues={{imageUrl: '', caption: ''}}
            onSubmit={(values) => console.log(values)}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (  
                <>
                    <View style={{margin: 20, justifyContent: "space-between", flexDirection:"row"}}>
                        <Image 
                            source={{uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG}}
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
