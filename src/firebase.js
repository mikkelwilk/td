import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDeAyn2p05nCtoP0RGPhrEWgOm8MLXiHMU",
    authDomain: "bamboo-clone-291507.firebaseapp.com",
    projectId: "bamboo-clone-291507",
    storageBucket: "bamboo-clone-291507.appspot.com",
    messagingSenderId: "341345385884",
    appId: "1:341345385884:web:c32574fe5ad41f92319c59",
    measurementId: "G-9ZGCSXFJ3T"
}
firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;