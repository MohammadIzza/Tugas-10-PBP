# 🎓 Firebase x AsyncStorage - Mahasiswa App

Aplikasi React Native untuk manajemen data mahasiswa dengan Firebase Authentication dan Firestore.

> **⚠️ Catatan Penting**: Project ini awalnya direncanakan menggunakan MMKV untuk storage, namun karena kendala kompatibilitas dengan Expo, saya menggunakan **AsyncStorage** sebagai alternatif untuk menyimpan data autentikasi secara lokal.

## 📋 Fitur

- Login & Register dengan Firebase Auth
- Menampilkan data mahasiswa dari Firestore
- Auto-login menggunakan AsyncStorage
- Pull to refresh data
- Logout dengan konfirmasi

## 🛠️ Tech Stack

- React Native Expo
- Firebase (Auth & Firestore)
- AsyncStorage (Local Storage)
- React Navigation
- React Context API

## 🚀 Instalasi

```bash
npm install
npm start
```

## 🔧 Setup Firebase

1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password) dan Firestore
3. Update `firebase.config.js` dengan config Anda

## 📊 Struktur Data Mahasiswa

```javascript
{
  nim: "24060122130071",
  nama: "John Doe",
  jurusan: "Informatika",
  semester: 5,
  ipk: 3.75,
  email: "john@example.com"
}
```

## 💾 Mengapa AsyncStorage?

Awalnya project ini direncanakan menggunakan **react-native-mmkv** untuk performa storage yang lebih cepat. Namun, MMKV memerlukan native modules yang tidak kompatibel dengan Expo managed workflow tanpa menggunakan development builds atau custom native code.

**Solusi**: Menggunakan **AsyncStorage** sebagai alternatif karena:
- ✅ Kompatibel penuh dengan Expo
- ✅ Mudah digunakan dan stabil
- ✅ Cukup untuk kebutuhan menyimpan token auth
- ✅ Tidak perlu eject dari Expo

## 📁 File Penting

- `context/AuthContext.js` - Manajemen state autentikasi
- `utils/storage.js` - Helper functions AsyncStorage
- `screens/LoginScreen.js` - Halaman login
- `screens/MahasiswaScreen.js` - Tampilan data mahasiswa
- `firebase.config.js` - Konfigurasi Firebase

## 👨‍💻 Developer

Mohammad Izza Hakiki - PBP - Universitas Diponegoro  
Semester 5 - 2025

---

Made with ❤️ using React Native & Firebase
