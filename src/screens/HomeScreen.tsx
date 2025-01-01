import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/blob-7.png')}
        style={styles.blob}
      />
      <Image
        source={require('../assets/image/blob-8.png')}
        style={styles.blob2}
      />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{uri: 'https://flagcdn.com/fr.svg'}}
            style={styles.flagIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardHeader}>
        <View style={styles.cardContent}>
          <Text style={styles.greeting}>Halo, Aku Pinkie!</Text>
          <Text style={styles.mainText}>
            Aku di sini untuk menjawab pertanyaanmu, menginspirasi harimu,
            menjelajahi dunia baru, dan membagikan resep lezat untuk dicoba.
          </Text>
        </View>
        <View style={styles.cardImageContainer}>
          <Image
            source={require('../assets/image/robot-ai.png')} // Sesuaikan path dengan lokasi gambar
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <Text style={styles.subheading}>Category AI</Text>
      <ScrollView
        contentContainerStyle={styles.lessonContainer}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChatBot')}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/image/Question.png')}
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>Tanya Apa Saja</Text>
            <Text style={styles.cardProgress}>
              Dapatkan jawaban instan untuk semua pertanyaanmu.
            </Text>
          </View>
        </TouchableOpacity>
        {/* Directly using TouchableOpacity for each card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChatBotQuote')}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/image/quote.png')}
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>Motivasi Harian</Text>
            <Text style={styles.cardProgress}>
              Mulai harimu dengan kata-kata inspiratif.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChatBotRecipe')}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/image/Recipe.png')}
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>Resep Masakan</Text>
            <Text style={styles.cardProgress}>
              Temukan resep lezat untuk setiap kesempatan.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChatBotCity')}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/image/Buildings.png')}
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>Jelajahi Kota</Text>
            <Text style={styles.cardProgress}>
              Temukan tempat menarik, acara, dan tips di sekitarmu.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
  },
  blob: {
    position: 'absolute',
    top: 0,
    zIndex: -0,
    right: 0,
  },
  blob2: {
    position: 'absolute',
    bottom: 0,
    zIndex: -0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    fontSize: 24,
    color: '#FA4B95',
  },
  flagIcon: {
    width: 30,
    height: 20,
    borderRadius: 5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  lessonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'rgba(253,89,213, 0.20)',
    width: '47%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    zIndex: 50
  },
  cardHeader: {
    backgroundColor: 'rgba(253,89,213, 0.20)',
    width: '100%',
    borderRadius: 15,
    zIndex: 50,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginBottom: 15,
    flexDirection: 'row', // Mengatur teks dan gambar sejajar
    alignItems: 'center', // Menyelaraskan konten secara vertikal
  },
  cardContent: {
    flex: 3, // Memberikan ruang lebih untuk teks
  },
  cardImageContainer: {
    flex: 2, // Memberikan ruang untuk gambar
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 180, // Sesuaikan dengan ukuran gambar yang diinginkan
    height: 190,
    borderRadius: 40, // Membuat gambar berbentuk lingkaran (opsional)
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FA4B95',
    marginBottom: 5,
  },
  mainText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },

  iconBackground: {
    width: 120, // Lebar background
    height: 120, // Tinggi background
    borderRadius: 60, // Membuat background bulat
    backgroundColor: 'rgba(255, 255, 255, 0.30);',
    alignItems: 'center', // Menengahkan ikon secara horizontal
    justifyContent: 'center', // Menengahkan ikon secara vertikal
    marginBottom: 10,
  },
  icon: {
    width: 100, // Lebar ikon
    height: 100, // Tinggi ikon
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardProgress: {
    fontSize: 14,
    color: '#FA4B95',
    textAlign: 'center',
  },
});
