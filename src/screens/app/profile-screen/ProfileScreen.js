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

const ProfileScreen = ({navigation}) => {
  const {userProfile, loading, error, handleLogout} = useProfile(navigation);

  if (loading) {
    return (
      <DefaultWrap MainContainer={layout.center}>
        <ActivityIndicator size="large" color="#3182CE" />
      </DefaultWrap>
    );
  }

  return (
    <DefaultWrap MainContainer={layout.center}>
      <View style={styles.cardContainer}>
        {/* Profile Avatar */}
        {userProfile?.photoURL ? (
          <Image source={{uri: userProfile.photoURL}} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Texts.pt20 style={styles.avatarText}>
              {userProfile?.fullName
                ? userProfile.fullName.charAt(0).toUpperCase()
                : 'U'}
            </Texts.pt20>
          </View>
        )}

        {/* Display Name */}
        <Texts.pt20 style={[layout.fontWeight.extraBold, styles.nameText]}>
          {userProfile?.fullName || 'User Name'}
        </Texts.pt20>

        {/* Display Email */}
        <Texts.pt14 style={styles.emailText}>
          {userProfile?.email || 'No email provided'}
        </Texts.pt14>

        {/* Display Optional Age if present */}
        {userProfile?.age && (
          <Texts.pt14 style={styles.infoText}>
            Age: {userProfile.age}
          </Texts.pt14>
        )}

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
  cardContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3182CE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nameText: {
    color: '#1A202C',
    marginBottom: 4,
  },
  emailText: {
    color: '#718096',
    marginBottom: 8,
  },
  infoText: {
    color: '#4A5568',
    marginBottom: 12,
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
