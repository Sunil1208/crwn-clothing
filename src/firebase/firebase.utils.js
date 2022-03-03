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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config); //initiate the firebase app

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log('collection Ref is ', collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log('newDoc Ref is ', newDocRef)
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const converCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title , items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  console.log('transformed collection is ', transformedCollection)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

