import Vue from 'vue'
import firebase from 'firebase/app'

Vue.use(firebase)

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "yourProjectConfig",
    authDomain: "yourProjectConfig",
    projectId: "yourProjectConfig",
    storageBucket: "yourProjectConfig",
    messagingSenderId: "yourProjectConfig",
    appId: "yourProjectConfig",
    measurementId: "yourProjectConfig"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Google Analytics
firebase.analytics()
// firebase Cloud Store
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const firebaseSDK = firebase
export const db = firebase.firestore()
export const fv = firebase.firestore.FieldValue
export const firebaseAuth = firebase.auth()
export const storage = firebase.storage
export const storageRef = firebase.storage().ref()

