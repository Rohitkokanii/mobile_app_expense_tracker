import {useState, useEffect} from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {saveToken, removeToken} from '../../../store/local-store/localDB';

export const useLogin = navigation => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '42444510774-uehkr5d7fb3cpbumkamcu6bau96n4qh6.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  // Helper function to handle navigation to DrawerGroup -> TabGroup -> HomeScreen
  // Matches the exact navigation structure used in SplashScreen
  const navigateToHome = () => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'DrawerGroup',
            state: {
              routes: [
                {
                  name: 'TabGroup',
                  state: {
                    routes: [
                      {
                        name: 'HomeScreen',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      });
    }
  };

  // 1. Standard Email/Password Login
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      const db = getFirestore();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;

      // Get Firebase ID Token and save locally
      const idToken = await user.getIdToken();
      await saveToken(idToken);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        await getDoc(userDocRef);
      } catch (firestoreErr) {
        console.warn('Firestore fetch warning:', firestoreErr.message);
      }

      console.log('Login successful for user:', user.uid);

      // Navigate to Home
      navigateToHome();
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Google Sign-In Handler
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const response = await GoogleSignin.signIn();

      let idToken = response?.data?.idToken || response?.idToken;
      let accessToken = response?.data?.accessToken || response?.accessToken;

      if (!idToken || !accessToken) {
        const tokens = await GoogleSignin.getTokens();
        idToken = idToken || tokens.idToken;
        accessToken = accessToken || tokens.accessToken;
      }

      if (!idToken) {
        throw new Error('Could not retrieve Google ID Token.');
      }

      const auth = getAuth();
      const db = getFirestore();
      const googleCredential = GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;

      // Get Firebase ID Token and save locally
      const firebaseToken = await user.getIdToken();
      await saveToken(firebaseToken);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          const userData = {
            uid: user.uid,
            fullName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            createdAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, userData);
        }
      } catch (firestoreErr) {
        console.warn('Firestore sync warning:', firestoreErr.message);
      }

      console.log('Google login successful:', user.uid);

      // Navigate to Home
      navigateToHome();
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // 3. Logout Handler
  const handleLogout = async () => {
    try {
      const auth = getAuth();

      const isGoogleSignedIn = await GoogleSignin.isSignedIn();
      if (isGoogleSignedIn) {
        await GoogleSignin.signOut();
      }

      await signOut(auth);
      await removeToken(); // Clear token from AsyncStorage

      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  const handleNavigateToSignup = () => {
    if (navigation) {
      navigation.navigate('SignupScreen');
    } else {
      console.log('Navigate to Signup screen');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    googleLoading,
    error,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    handleNavigateToSignup,
  };
};
