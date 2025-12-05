import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper functions untuk menyimpan data auth
export const saveAuthData = async (userId, email, token) => {
  try {
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('userEmail', email);
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }
    console.log('✅ Auth data saved to AsyncStorage');
  } catch (error) {
    console.error('❌ Error saving auth data:', error);
  }
};

// Get auth data dari AsyncStorage
export const getAuthData = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const userEmail = await AsyncStorage.getItem('userEmail');
    const authToken = await AsyncStorage.getItem('authToken');
    return { userId, userEmail, authToken };
  } catch (error) {
    console.error('❌ Error getting auth data:', error);
    return {};
  }
};

// Clear auth data dari AsyncStorage
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('authToken');
    console.log('✅ Auth data cleared from AsyncStorage');
  } catch (error) {
    console.error('❌ Error clearing auth data:', error);
  }
};

// Check apakah user sudah login
export const isLoggedIn = async () => {
  const userId = await AsyncStorage.getItem('userId');
  return !!userId;
};