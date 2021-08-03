import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDIH6D3hDjt16wgTkRJ6SeuFZwhUvHr_eo",
    authDomain: "netflix-replica-f67e6.firebaseapp.com",
    projectId: "netflix-replica-f67e6",
    storageBucket: "netflix-replica-f67e6.appspot.com",
    messagingSenderId: "148375391464",
    appId: "1:148375391464:web:528e8479d170a015784d5d"
})

export const auth = app.auth()
export default app