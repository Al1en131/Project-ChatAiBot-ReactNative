import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {db} from '../config/firebase'; // Pastikan ini mengarah ke file konfigurasi Firebase Anda


const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || 'AIzaSyBbA68A7kv0LpPJl1mPd7Nhffv_hRUy28U';

type Message = {
  text: string;
  sender: 'user' | 'gemini';
  timestamp: Timestamp; // Tambahkan timestamp untuk urutan pesan
};

export function Friends({user, onLogout}: any) {
  const [msg, setMsg] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Fungsi untuk menyimpan pesan ke Firestore
  const saveMessageToFirestore = async (message: Message) => {
    try {
      const messagesRef = collection(db, 'messages'); // "messages" adalah nama koleksi
      await addDoc(messagesRef, {
        text: message.text,
        sender: message.sender,
        timestamp: Timestamp.fromDate(new Date()), // Menyimpan timestamp
        userEmail: user.email, // Menyimpan email pengguna
      });
      console.log('Message saved to Firestore:', message);
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
    }
  };

  // Menangani klik tombol kirim
  const handleButtonClick = async () => {
    if (!msg.trim()) {
      Alert.alert('Validation', 'Message cannot be empty.');
      return;
    }

    const userMessage: Message = {
      text: msg,
      sender: 'user',
      timestamp: Timestamp.fromDate(new Date()),
    };
    setMessages(prevMessages => [userMessage, ...prevMessages]);
    setMsg('');

    // Simpan pesan pengguna ke Firestore
    await saveMessageToFirestore(userMessage);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: {
              text: msg,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Full API Response:', data);

      const reply = data?.candidates?.[0]?.output || 'No response';
      const geminiMessage: Message = {
        text: reply,
        sender: 'gemini',
        timestamp: Timestamp.fromDate(new Date()),
      };
      setMessages(prevMessages => [geminiMessage, ...prevMessages]);

      // Simpan pesan Gemini ke Firestore
      await saveMessageToFirestore(geminiMessage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        text: 'Error occurred. Try again later.',
        sender: 'gemini',
        timestamp: Timestamp.fromDate(new Date()),
      };
      setMessages(prevMessages => [errorMessage, ...prevMessages]);
      await saveMessageToFirestore(errorMessage);
    }
  };

  // Menyimpan input pesan pengguna
  const messageSave = (text: string) => {
    setMsg(text);
    console.log('Message input:', text);
  };

  useEffect(() => {
    console.log('Current logged in user:', user); // Cek user di console
  }, [user]);

  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.message,
        item.sender === 'user' ? styles.userMessage : styles.geminiMessage,
      ]}>
      <Text
        style={[
          styles.messageText,
          item.sender === 'user'
            ? styles.userMessageText
            : styles.geminiMessageText,
        ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Menampilkan Percakapan */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      {/* Input Pesan Pengguna */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Query...."
          value={msg}
          onChangeText={messageSave}
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#494F55',
  },
  messagesContainer: {
    padding: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
  },
  userMessageText: {
    color: 'white',
  },
  geminiMessageText: {
    color: 'black',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#494F55',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Friends;
