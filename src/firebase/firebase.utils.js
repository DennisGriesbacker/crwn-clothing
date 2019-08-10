import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyA0YFMEK77IRkaoIX8sJRDNBcQUXj2Fv4A',
  authDomain: 'crwn-db-1c8b3.firebaseapp.com',
  databaseURL: 'https://crwn-db-1c8b3.firebaseio.com',
  projectId: 'crwn-db-1c8b3',
  storageBucket: '',
  messagingSenderId: '990816048253',
  appId: '1:990816048253:web:f7c343206022de35'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = await firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
