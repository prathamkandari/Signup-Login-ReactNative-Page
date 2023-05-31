import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import Background from '../../assets/Background.png'
import { button1 } from '../common/button'
import React, { useState } from 'react'
import { head1, formgroup, input, label, link, link2, errormessage } from '../common/formcss'
import { head2 } from '../common/formcss'


const Login = ({ navigation }) => {
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })

    const [errormsg, setErrormsg] = useState(null);

    const Sendtobackend = () => {
        // console.log(fdata);
        if (fdata.email == '' || fdata.password == '') {
            setErrormsg('All fields are required');
            return;
        }
        else {
            fetch('http://192.168.29.73:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json()).then(
                    data => {
                        // console.log(data);
                        if (data.error) {
                            setErrormsg(data.error);
                        }
                        else {
                            alert('Login successful');
                            navigation.navigate('homepage');
                        }
                    }
                )
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={Background} />

            <View style={styles.container1}>
                <View style={styles.s1}>
                    {/* <Text style={styles.h1}>Welcome to my Application</Text> */}
                </View>
                <View style={styles.s2}>
                    <Text style={head1}>Login</Text>
                    <Text style={head2}>Sign in to continue</Text>
                    {
                        errormsg ? <Text style={errormessage}>
                            {errormsg}</Text> : null
                    }
                    <View style={formgroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input} placeholder='Enter your Email'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input} placeholder='Enter your Password'
                            secureTextEntry={true}
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        />
                    </View>
                    <View style={styles.fp}>
                        <Text style={link}>Forgot Password</Text>
                    </View>
                    <Text style={button1}
                        onPress={() => Sendtobackend()}
                    >Login</Text>
                    <Text style={link2}>Don't have an account?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('signup')}>Create a new account</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Login

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
        fontsize: 30,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    s2: {
        display: 'flex',
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 30,
        marginVertical: 20,
    },
    label: {
        fontSize: 17,
        color: '#fff',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFB0CC",
        borderRadius: 20,
        padding: 10,
    },
    fp: {
        display: "flex",
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    }
})
