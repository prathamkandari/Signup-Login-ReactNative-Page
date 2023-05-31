import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import Background from '../../assets/Background.png'
import { button1 } from '../common/button'
import React, { useEffect, useState } from 'react'
import { head1, formgroup, input, label, link, link2, errormessage, bwmessage } from '../common/formcss'
import { head2 } from '../common/formcss'


const Verification = ({ navigation, route }) => {

    const {userdata} = route.params;
    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');
    const [actualCode, setActualCode] = useState(null);

    useEffect(() => {
        setActualCode(userdata[0]?.VerificationCode);
    },[])

    const Sendtobackend = () => {
        // console.log(userCode);
        // console.log(actualCode); 

        if(userCode == 'XXXX' || userCode == ''){
            setErrormsg('Please enter the code');
            return;            
        }

        else if (userCode == actualCode) {
            // console.log('Correct code');
            const fdata = {
                email: userdata[0]?.email,
                password: userdata[0]?.password,
                name: userdata[0]?.name,
                dob: userdata[0]?.dob,
            }

            fetch('http://192.168.29.73:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if(data.message == 'User Registered Successfully'){
                    alert(data.message);
                    navigation.navigate('login');
                } 
                else {
                    alert("Something went wrong !! Try Again");
                }
            }) 
        }

        else if (userCode != actualCode) {
            setErrormsg('Incorrect code');
            return;
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={Background} />

            <View style={styles.container1}>
                <View style={styles.s1}>
                    <Text style={styles.h1}>Welcome to my Application</Text>
                </View>
                <View style={styles.s2}>
                    <Text style={head1}>Verification</Text>
                    <Text style={bwmessage}>A code has been sent to your Email</Text>
                    {
                        errormsg ? <Text style={errormessage}>
                            {errormsg}</Text> : null
                    }

                    <View style={formgroup}>
                        <Text style={label}>Code</Text>
                        <TextInput style={input} placeholder='Enter 6 digit Verification Code'
                            secureTextEntry={true}
                            onChangeText={(text) => setUserCode(text)}
                            onPressIn={() => setErrormsg(null)}

                        />
                    </View>
                    <View style={styles.fp}>
                        <Text style={link}>Forgot Password</Text>
                    </View>
                    <Text style={button1}
                        onPress={() => Sendtobackend()}
                    >Verify</Text>
                    <Text style={link2}>Don't have an account?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('signup')}>Create a new account</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Verification

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
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
