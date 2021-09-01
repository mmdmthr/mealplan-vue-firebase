import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA5elnRZVJ4WI2TnUNylP4LmLcAJhtaQ7s',
  authDomain: 'meal-prep-vue-7aa82.firebaseapp.com',
  projectId: 'meal-prep-vue-7aa82',
  storageBucket: 'meal-prep-vue-7aa82.appspot.com',
  messagingSenderId: '826378224379',
  appId: '1:826378224379:web:d97b012fb224e37fc2665e',
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
