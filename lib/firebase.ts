// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTmlak8SzexstqYz4OQqdUgxuLhZ-O7YE",
  authDomain: "product-admin-nextjs-477e1.firebaseapp.com",
  projectId: "product-admin-nextjs-477e1",
  storageBucket: "product-admin-nextjs-477e1.appspot.com",
  messagingSenderId: "65761637956",
  appId: "1:65761637956:web:995a7e42728b044219ae11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth= getAuth(app);