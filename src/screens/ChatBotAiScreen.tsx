import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TWINKLETALK_API_KEY = 'Your Gemini API';
const API_URL = 'http://10.0.2.2:5000';

type Message = {
  text: string;
  sender: 'user' | 'twinkletalk';
};

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Pinkie Ai</Text>
  </View>
);

const ChatBotAiScreen = ({navigate}: {navigate: (screen: string) => void}) => {
  const [msg, setMsg] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const saveMessageToBackend = async (message: Message) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        navigate('LoginScreen');
        return;
      }

      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Message saved successfully:', data);
      } else {
        Alert.alert('Error', data.message || 'Failed to save message');
      }
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const fetchTwinkleTalkReply = async (userMessage: string) => {
    // Deteksi pertanyaan tentang nama
    const keywords = ['nama', 'siapa kamu', 'what is your name', 'who are you'];
    const lowerCaseMessage = userMessage.toLowerCase();

    if (keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      return 'Saya adalah Pinkie Ai, asisten AI Anda!';
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${TWINKLETALK_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userMessage,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Pinkie Ai is here to help!';
      return reply;
    } catch (error) {
      console.error('Error fetching Pinkie Ai response:', error);
      return 'Error occurred in Pinkie Ai';
    }
  };

  const handleButtonClick = async () => {
    if (!msg.trim()) {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }

    const userMessage: Message = {text: msg, sender: 'user'};
    setMessages(prevMessages => [userMessage, ...prevMessages]);
    setMsg('');

    try {
      await saveMessageToBackend(userMessage);
      const twinkletalkReply = await fetchTwinkleTalkReply(msg);
      const twinkleMessage: Message = {
        text: twinkletalkReply,
        sender: 'twinkletalk',
      };
      setMessages(prevMessages => [twinkleMessage, ...prevMessages]);

      await saveMessageToBackend(twinkleMessage);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.message,
        item.sender === 'user' ? styles.userMessage : styles.twinkletalkMessage,
      ]}>
      <Text
        style={[
          styles.messageText,
          item.sender === 'user'
            ? styles.userMessageText
            : styles.twinkletalkMessageText,
        ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Image
        source={require('../assets/image/blob-3.png')}
        style={styles.blob}
      />
      <Image
        source={require('../assets/image/blob-4.png')}
        style={styles.blob2}
      />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Query...."
          value={msg}
          onChangeText={setMsg}
          placeholderTextColor="white"
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Image
            source={require('../assets/image/Send.png')}
            style={styles.send}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    height: '100%',
    width: '100%',
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
  blob3: {
    position: 'absolute',
    right: 0,
    top: 40,
  },
  blob4: {position: 'absolute', left: 0, top: 150},
  header: {
    backgroundColor: 'rgba(253,89,213, 0.25);',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  messagesContainer: {
    padding: 20,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: 'rgba(253,89,213, 0.25)', 
    alignSelf: 'flex-end', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 20, 
    borderTopRightRadius: 5, 
    marginVertical: 5, 
    maxWidth: '75%', 
  },

  twinkletalkMessage: {
    borderWidth: 1, 
    borderColor: '#FA4B95', 
    alignSelf: 'flex-start', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 20,
    borderTopLeftRadius: 5,
    marginVertical: 5, 
    maxWidth: '75%', 
  },

  messageText: {
    fontSize: 16, 
    lineHeight: 22, 
  },

  userMessageText: {
    color: 'white', 
  },

  twinkletalkMessageText: {
    color: '#FA4B95', 
  },

  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.20);',
    borderRadius: 29,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginRight: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.20);',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  send: {
    alignItems: 'center',
    width: 25,
    height: 25,
  },
});

export default ChatBotAiScreen;
