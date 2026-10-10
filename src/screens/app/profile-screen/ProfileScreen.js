import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import DefaultWrap from '../../../components/wrappers/DefaultWrap';
import layout from '../../../theme/layout';
import {Texts} from '../../../components/common/Texts';
import {useProfile} from './useProfile';
import SizedView from '../../../components/common/SizedView';
import {rhp, rwp} from '../../../utils/helpers/responsivePixelHelper';
import DeviceInfo from 'react-native-device-info';
import {navigate} from '../../../navigation/RootNavigation';
import Icons from '../../../components/common/Icons';
const ProfileScreen = ({navigation}) => {
  const {userProfile, loading, error, handleLogout} = useProfile(navigation);

  const getAvatarSource = () => {
    if (userProfile?.photoURL) {
      return {uri: userProfile.photoURL};
    }
  };

  const menuOption = [
    {
      id: '1',
      title: 'Salary Splitter (Coming Soon)',
      icon: 'wallet-outline',
    },
    {
      id: '2',
      title: 'Udhar Reminder (Coming Soon)',
      icon: 'people-outline',
    },
    {
      id: '3',
      title: 'Budget Planner (Coming Soon)',
      icon: 'pie-chart-outline',
    },
    {
      id: '4',
      title: 'Savings Goals (Coming Soon)',
      icon: 'trophy-outline',
    },
    {
      id: '5',
      title: 'Bill Reminders (Coming Soon)',
      icon: 'calendar-outline',
    },
    {
      id: '6',
      title: 'EMI Tracker (Coming Soon)',
      icon: 'card-outline',
    },
    {
      id: '7',
      title: 'Recurring Expenses (Coming Soon)',
      icon: 'repeat-outline',
    },
    {
      id: '8',
      title: 'Spending Analytics (Coming Soon)',
      icon: 'stats-chart-outline',
    },
    {
      id: '9',
      title: 'Debt Tracker (Coming Soon)',
      icon: 'trending-down-outline',
    },
    {
      id: '10',
      title: 'Export Reports (Coming Soon)',
      icon: 'document-text-outline',
    },
    {
      id: '11',
      title: 'Notifications (Coming Soon)',
      icon: 'notifications-outline',
    },
    {
      id: '12',
      title: 'Privacy (Coming Soon)',
      icon: 'shield-checkmark-outline',
    },
    {
      id: '13',
      title: 'About',
      icon: 'information-circle-outline',
    },
  ];
  if (loading) {
    return (
      <DefaultWrap MainContainer={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </DefaultWrap>
    );
  }

  return (
    // <DefaultWrap MainContainer={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Profile Avatar */}
        <View
          style={[layout.rowBetween, {width: '80%', alignSelf: 'flex-start'}]}>
          <Image source={getAvatarSource()} style={styles.avatar} />

          <View>
            {/* Display Name */}
            <Texts.pt20 style={[layout.fontWeight.extraBold, styles.nameText]}>
              {userProfile?.fullName || 'User Name'}
            </Texts.pt20>
            {/* Display Email */}
            <Texts.pt14 style={styles.emailText}>
              {userProfile?.email || 'No email provided'}
            </Texts.pt14>
          </View>
        </View>

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
      </View>
      <SizedView height={20} />
      <View style={styles.cardContainer}>
        {menuOption.map(item => (
          <Pressable key={item.id} style={styles.menuOption}>
            {/* <Icons.AntDesign name={'account-book'} /> */}
            <Texts.pt15 children={item.title} style={styles.menuOptionTitle} />
          </Pressable>
        ))}
        <SizedView
          style={{backgroundColor: '#ebebeb', width: '100%', height: 0.3}}
        />
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Texts.pt16 style={styles.logoutText}>Log Out</Texts.pt16>
        </TouchableOpacity>
      </View>
      <SizedView height={20} />
      <View style={styles.cardContainer}>
        <Texts.pt11
          style={styles.appVersion}
          children={`App Version : ${DeviceInfo.getVersion()} (Beta)`}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    // paddingVertical: rhp(70),
    // paddingHorizontal: rwp(13),
    // justifyContent: 'center', // Centers card vertically
    // alignItems: 'center', // Centers card horizontally
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardContainer: {
    width: '95%',
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  avatar: {
    width: rwp(50),
    height: rwp(50),
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
  menuOption: {
    padding: rwp(14),
    borderBottomWidth: 0.3,
    borderColor: '#989898',
    width: '100%',
  },
  menuOptionTitle: {
    color: '#ffffff',
  },
  appVersion: {
    color: '#cacaca',
    fontWeight: '600',
  },
});
