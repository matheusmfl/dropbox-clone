import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-Z6wAETtKAm1zgheT2tFixphaoJkt8y8",
  authDomain: "dropbox-clone-29417.firebaseapp.com",
  projectId: "dropbox-clone-29417",
  storageBucket: "dropbox-clone-29417.appspot.com",
  messagingSenderId: "633058963518",
  appId: "1:633058963518:web:98d3a7113a385cff43e16f"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }