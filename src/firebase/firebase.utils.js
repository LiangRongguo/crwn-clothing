import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCLWAwEz-5457ZmmvCHn_OMntxNRtYA_G4",
  authDomain: "crwn-db-bcd54.firebaseapp.com",
  databaseURL: "https://crwn-db-bcd54.firebaseio.com",
  projectId: "crwn-db-bcd54",
  storageBucket: "crwn-db-bcd54.appspot.com",
  messagingSenderId: "85562940421",
  appId: "1:85562940421:web:0a96b398161c4e2513d06c",
  measurementId: "G-T7C8T1J8QQ",
};

// store data in firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
