import {useState, useEffect} from 'react';
import {getAuth, signOut} from '@react-native-firebase/auth';
import {getFirestore, doc, getDoc} from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Import removeToken helper from local storage
import {removeToken} from '../../../store/local-store/localDB';

export const useProfile = navigation => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      const db = getFirestore();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError('No authenticated user found.');
        setLoading(false);
        return;
      }

      // Fetch user profile from Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        setUserProfile(userSnap.data());
      } else {
        // Fallback to Auth payload if Firestore record doesn't exist
        setUserProfile({
          uid: currentUser.uid,
          fullName: currentUser.displayName || '-',
          email: currentUser.email || '-',
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();

      // Sign out from Google if logged in via Google
      const isGoogleSignedIn = await GoogleSignin.isSignedIn();
      if (isGoogleSignedIn) {
        await GoogleSignin.signOut();
      }

      await signOut(auth);

      await removeToken();

      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{name: 'WelcomeScreen'}],
        });
      }
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return {
    userProfile,
    loading,
    error,
    fetchUserProfile,
    handleLogout,
  };
};
