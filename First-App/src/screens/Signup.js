import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Background2 from '../../assets/Background2.png'
import { button1 } from '../common/button'
import React, { useState } from 'react'
import { head1, formgroup, input, label, link, link2, errormessage } from '../common/formcss'
import { head2 } from '../common/formcss'

const Signup = ({ navigation }) => {

    const [fdata, setFdata] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        dob: '',
    })

    const [errormsg, setErrormsg] = useState(null);

    const Sendtobackend = () => {
        // console.log(fdata);
        if (fdata.name == '' ||
            fdata.email == '' ||
            fdata.password == '' ||
            fdata.cpassword == '' ||
            fdata.dobackend == '') {
            setErrormsg('All fields are required');
            return;
        }
        else {
            if (fdata.password != fdata.cpassword) {
                setErrormsg('Password and Confirm Password must be same');
                return;
            }
            else {
                fetch('http://192.168.29.73:3000/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)
                })
                    .then(res => res.json()).then(
                        data => {
                            // console.log(data);
                            if(data.error == 'Invalid Credentials') {
                                //alert('Invalid credentials')
                                setErrormsg('Invalid Credentials')
                            }
                            else if (data.message == 'Verification Code Sent to your Email') {
                                // console.log(data.udata);
                                alert(data.message);
                                navigation.navigate('verification', { userdata: data.udata })
                            }
                        }
                    )
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={Background2} />

            <View style={styles.container1}>
                <View style={styles.s1}>
                    {/* <Text style={styles.h1}>Welcome to my Application</Text> */}
                </View>
                <ScrollView style={styles.s2}>
                    <Text style={head1}>Get Started</Text>
                    <Text style={link2}>Already Registered?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('login')}>Login here</Text>
                    </Text>

                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formgroup}>
                        <Text style={label}>Name</Text>
                        <TextInput style={input} placeholder='Enter you Name'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, name: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input} placeholder='Enter you Email'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>DOB</Text>
                        <TextInput style={input} placeholder='Enter you Date of Birth'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, dob: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input} placeholder='Enter you Password'
                            secureTextEntry={true}
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Confirm Password</Text>
                        <TextInput style={input} placeholder='Confirm your Password'
                            secureTextEntry={true}
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, cpassword: text })} />
                    </View>
                    {/* <View style={styles.fp}>
                        <Text style={link}>Forgot Password</Text>
                    </View> */}

                    <TouchableOpacity
                        onPress={() => {
                            Sendtobackend();
                        }}>
                        <Text style={button1}

                        >Signup</Text>
                    </TouchableOpacity>
                    {/* <Text style={link2}>Already Registered?
                        <Text style={link}>Login here</Text>
                    </Text> */}
                </ScrollView>
            </View>
        </View>
    )
}

export default Signup

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
    s1: {
        marginTop: 120,
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