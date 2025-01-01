import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
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
      navigation.navigate('Login');
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
      <Image source={require('../assets/image/blob.png')} style={styles.blob} />
      <Image
        source={require('../assets/image/blob-2.png')}
        style={styles.blob2}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/image/robot-ai.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../assets/image/mail.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#FA4B95"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../assets/image/password.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#FA4B95"
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
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    position: 'relative',
    paddingVertical: 20,
  },
  blob: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  blob2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  imageContainer: {
    alignItems: 'center',
    height: '40%',
    marginTop: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  formContainer: {
    padding: 20,
    height: '60%',
    flex: 1,
  },
  headerContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  border: {
    borderBottomWidth: 3,
    borderBottomColor: '#FA4B95',
    width: '40%',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FA4B95',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FA4B95',
    marginBottom: 26,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    color: '#FA4B95',
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
    paddingVertical: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.20);',
    borderRadius: 13,
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
    color: '#FA4B95',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxWrapper: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FB9EC6',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#FB9EC6',
  },
  checkMark: {
    fontSize: 10,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#616161',
  },
});
