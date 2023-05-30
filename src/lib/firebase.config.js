// import { initializeApp, getApps, FirebaseApp, fb } from "firebase/app";
// import 'firebase/firestore'
// import "firebase/auth";

// // .envファイルで設定した環境変数をfirebaseConfigに入れる
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID
// };
// // appの初期化
// if (typeof window !== 'undefined' && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// }

// export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app()
// export const firestore = firebase.firestore()


// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

// if (typeof window !== 'undefined' && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initializeFirebaseApp = () =>
  !getApps().length ? initializeApp(firebaseConfig) : getApp()
