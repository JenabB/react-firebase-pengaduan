import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCmpy5549U_DwzPFBfzRjE_-VcATzbOUVU",
  authDomain: "react-hook-todo-5c8e7.firebaseapp.com",
  projectId: "react-hook-todo-5c8e7",
  storageBucket: "react-hook-todo-5c8e7.appspot.com",
  messagingSenderId: "901809634651",
  appId: "1:901809634651:web:f78bb3f85fe08bd3c66e7e",
  measurementId: "G-QVHT25YWSQ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
db.settings({ timestampsInSnapshots: true });
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, provider };
