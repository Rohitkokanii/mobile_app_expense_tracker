import {useState} from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {getFirestore, doc, setDoc} from '@react-native-firebase/firestore';

export const useSignup = navigation => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigateToHome = () => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'TabGroup',
            params: {screen: 'HomeScreen'},
          },
        ],
      });
    }
  };

  const handleSignup = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      const db = getFirestore();

      // 1. Create authentication user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;

      // 2. Store extra user profile details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: fullName.trim(),
        email: user.email,
        age: age ? Number(age) : null,
        createdAt: new Date().toISOString(),
      });

      console.log('User registered and profile created:', user.uid);

      // Navigate to main app tab group
      navigateToHome();
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    if (navigation) {
      navigation.navigate('LoginScreen');
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    age,
    setAge,
    loading,
    error,
    handleSignup,
    handleNavigateToLogin,
  };
};
