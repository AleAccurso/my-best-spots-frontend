import firebase from "firebase/app";
// import "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  porjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
export default function initFirebase() {
  if (!firebase.getApp.length) {
    firebase.initializeApp(config);
  }
}
