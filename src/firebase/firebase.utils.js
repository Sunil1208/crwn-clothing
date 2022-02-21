import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCLQeny8KVD_NzH9CkPFKLsBkQN3R9_szk",
    authDomain: "crown-db-11f7a.firebaseapp.com",
    projectId: "crown-db-11f7a",
    storageBucket: "crown-db-11f7a.appspot.com",
    messagingSenderId: "19138029144",
    appId: "1:19138029144:web:1e15bcd9950a1afb17cc2d",
    measurementId: "G-61W4XBGFXD"
  };

firebase.initializeApp(config); //initiate the firebase app

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

