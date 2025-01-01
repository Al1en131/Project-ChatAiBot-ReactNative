import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function WelcomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/blob.png')} style={styles.blob} />
      <Image
        source={require('../assets/image/blob-2.png')}
        style={styles.blob2}
      />
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.buttonTitle}>
          <Text style={styles.text}>Pinkie Ai</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/image/robot.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>
          Chat, eksplorasi, dan inspirasi dalam satu aplikasi! Mulai percakapan
          sekarang dan rasakan serunya berbicara dengan AI yang cerdas
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
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
    paddingVertical: 10,
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
    height: '65%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FB9EC6',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 50,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.20);',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
  },
  buttonTitle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.20);',
    borderRadius: 30,
    width: '50%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF8EC7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
