import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore, collectionGroup, collection, getDocs, query } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBe94yPPFPQtydjM_wO1HH6zRH38Gv2VCc",
  authDomain: "rn-instagram-clone-af1a9.firebaseapp.com",
  projectId: "rn-instagram-clone-af1a9",
  storageBucket: "rn-instagram-clone-af1a9.appspot.com",
  messagingSenderId: "1005685904744",
  appId: "1:1005685904744:web:bb949e373eaca3415b72dd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

async function getPosts() {
try {
  const postsCol = collection(db, 'posts');
  console.log("ekjrdkg");

  const postsSnapshot = await getDocs(postsCol);
  console.log('wefewfwefwef');

  } catch (error) {
    console.error("Error getting documents: ", error);
  };
}

export { app, auth, db, collectionGroup, getPosts };