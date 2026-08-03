import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import DefaultWrap from '../../../components/wrappers/DefaultWrap';
import layout from '../../../theme/layout';
import {Texts} from '../../../components/common/Texts';
import {useProfile} from './useProfile'; // Adjust path according to your structure

// Sample gender-based default avatar URLs
const BOY_AVATAR_URL =
  'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';
const GIRL_AVATAR_URL =
  'https://cdn-icons-png.flaticon.com/512/4140/4140047.png';
const DEFAULT_AVATAR_URL =
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

const ProfileScreen = ({navigation}) => {
  const {userProfile, loading, error, handleLogout} = useProfile(navigation);

  // Helper to determine avatar image source
  const getAvatarSource = () => {
    if (userProfile?.photoURL) {
      return {uri: userProfile.photoURL};
    }
    // const gender = userProfile?.gender?.toLowerCase();
    // console.log('gender', userProfile);

    // if (gender === 'female' || gender === 'girl') {
    //   return {uri: GIRL_AVATAR_URL};
    // }
    // if (gender === 'male' || gender === 'boy') {
    //   return {uri: BOY_AVATAR_URL};
    // }
    // return {uri: DEFAULT_AVATAR_URL};
  };

  if (loading) {
    return (
      <DefaultWrap MainContainer={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </DefaultWrap>
    );
  }

  return (
    <DefaultWrap MainContainer={styles.container}>
      <View style={styles.cardContainer}>
        {/* Profile Avatar */}
        <Image source={getAvatarSource()} style={styles.avatar} />

        {/* Display Name */}
        <Texts.pt20 style={[layout.fontWeight.extraBold, styles.nameText]}>
          {userProfile?.fullName || 'User Name'}
        </Texts.pt20>

        {/* Display Email */}
        <Texts.pt14 style={styles.emailText}>
          {userProfile?.email || 'No email provided'}
        </Texts.pt14>

        {/* Display Optional Age */}
        {userProfile?.age ? (
          <Texts.pt14 style={styles.infoText}>
            Age: {userProfile.age}
          </Texts.pt14>
        ) : null}

        {/* Display Error if any */}
        {error ? (
          <Texts.pt14 style={styles.errorText}>{error}</Texts.pt14>
        ) : null}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Texts.pt16 style={styles.logoutText}>Log Out</Texts.pt16>
        </TouchableOpacity>
      </View>
    </DefaultWrap>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center', // Centers card vertically
    alignItems: 'center', // Centers card horizontally
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '85%',
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  nameText: {
    color: '#F8FAFC',
    marginBottom: 4,
  },
  emailText: {
    color: '#94A3B8',
    marginBottom: 8,
  },
  infoText: {
    color: '#CBD5E1',
    marginBottom: 12,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 16,
    width: '50%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
