import { initializeApp } from 'firebase/app'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCENOUjf4fIlUVKLD6xpvCY9wvKgkgvK1w',
  authDomain: 'cloud-cafe-56e1c.firebaseapp.com',
  projectId: 'cloud-cafe-56e1c',
  storageBucket: 'cloud-cafe-56e1c.appspot.com',
  messagingSenderId: '742498563240',
  appId: '1:742498563240:web:8ef5c143cb8fde546abe9d',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
// db.settings({ timestampsInSnapshots: true })