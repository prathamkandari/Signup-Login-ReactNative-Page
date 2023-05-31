import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import Background from '../../assets/Background.png'
import { button1 } from '../common/button'

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={Background} />
            {/* <Text style={styles.head}>Hello this is Pratham</Text> */}
            <View style={styles.container1}>
                <Text style={styles.head}>Welcome Back!</Text>
                <Text style={button1}
                    onPress={() => navigation.navigate('login')}>Login</Text>
                <Text style={button1}
                    onPress={() => navigation.navigate('signup')}>Sign Up</Text>

            </View>
        </View >
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    patternbg: {
        position: 'absolute',
        top: '0%',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    head: {
        color: '#fff',
        paddingTop: 10,
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
})