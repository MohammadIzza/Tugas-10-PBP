import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useAuth } from '../context/AuthContext';

export default function MahasiswaScreen() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { signOut, user } = useAuth();

  // Fetch data mahasiswa dari Firestore
  const fetchMahasiswa = async () => {
    try {
      const q = query(collection(db, 'mahasiswa'), orderBy('nim', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      setMahasiswa(data);
      console.log('✅ Data mahasiswa berhasil diambil:', data.length, 'records');
    } catch (error) {
      console.error('❌ Error fetching mahasiswa:', error);
      Alert.alert('Error', 'Gagal mengambil data mahasiswa: ' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMahasiswa();
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await signOut();
          }
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nim}>NIM: {item.nim}</Text>
        <View style={styles.semesterBadge}>
          <Text style={styles.semesterText}>Sem {item.semester}</Text>
        </View>
      </View>
      
      <Text style={styles.nama}>{item.nama}</Text>
      <Text style={styles.jurusan}>{item.jurusan}</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>IPK:</Text>
        <Text style={styles.ipkValue}>{item.ipk}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.emailValue}>{item.email}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>📚 Data Mahasiswa</Text>
          <Text style={styles.headerSubtitle}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total Mahasiswa: <Text style={styles.statsNumber}>{mahasiswa.length}</Text>
        </Text>
      </View>

      <FlatList
        data={mahasiswa}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📭</Text>
            <Text style={styles.emptyTitle}>Tidak ada data</Text>
            <Text style={styles.emptySubtitle}>
              Belum ada data mahasiswa di database.{'\n'}
              Tambahkan data di Firebase Console.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsText: {
    fontSize: 16,
    color: '#666',
  },
  statsNumber: {
    fontWeight: 'bold',
    color: '#007AFF',
    fontSize: 18,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nim: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  semesterBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  semesterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  nama: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  jurusan: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  ipkValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
  emailValue: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});