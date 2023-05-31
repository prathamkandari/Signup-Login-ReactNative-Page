import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { button1 } from '../common/button'
import { head1 } from '../common/formcss'
import Background from '../../assets/Background.png'


const Homepage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={Background} />
            <Text
                style={head1}>This is Homepage</Text>

            <Text style={button1}
                onPress={
                    () => { navigation.navigate('login') }
                }
            >Logout</Text>
        </View>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }
})