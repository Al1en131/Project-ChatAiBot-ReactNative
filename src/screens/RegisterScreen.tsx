import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000';

export default function RegisterScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Email and Password are required.');
      return;
    }

    try {
      await axios.post(`${API_URL}/register`, {email, password});
      Alert.alert('Success', 'Registered successfully!');
      navigation.navigate('Login'); // Navigate to Login after successful registration
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong!',
      );
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('../assets/images/auth.png')}
          style={styles.logo}
        /> */}
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up</Text>
          <View style={styles.border}></View>
        </View>
        <View style={styles.inputContainer}>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            {/* <Image
              source={require('../assets/images/icon-message.png')}
              style={styles.icon}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#616161"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            {/* <Image
              source={require('../assets/images/icon-password.png')}
              style={styles.icon}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#616161"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
{/* 
        {error && <Text style={styles.error}>{error}</Text>} */}

        <TouchableOpacity
          style={styles.btnlogin}
          onPress={handleRegister}
          activeOpacity={0.8}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
        

        <Text style={styles.signUpText}>
          Already have an Account!{' '}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('Login')}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: '30%',
  },
  logo: {
    width: '100%',
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 40,
  },
  header: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  border: {
    borderBottomWidth: 3,
    borderBottomColor: '#FB9EC6',
    width: '25%',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FB9EC6',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    width: 18,
    height: 18,
  },
  btnlogin: {
    paddingVertical: 12,
    backgroundColor: '#FB9EC6',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    width: '100%',
  },
  signUpLink: {
    color: '#FB9EC6',
    fontWeight: 'bold',
  },
});
