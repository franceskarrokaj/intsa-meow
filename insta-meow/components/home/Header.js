import React from 'react';
import { StyleSheet, View , Text, Image, TouchableOpacity} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
                <TouchableOpacity>
                    <Image
                        style={styles.logo} 
                        source={require('../../assets/instagram-logo.png')}
                    />
                </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Image
                        source={{
                            url : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={{
                            url : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={{
                            url : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'
                        }}
                        
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,

    },

    iconsContainer: {
        flexDirection: 'row',
    },

    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
        color: 'white',
    },

    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 10,
        //color: 'white',
    },
})

export default Header;
