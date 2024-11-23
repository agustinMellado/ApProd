// Import the functions you need from the SDKs you need
import {initializeApp,} from "firebase/app";
import{createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc,getDoc,getFirestore,serverTimestamp,setDoc,} from "firebase/firestore";


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
export const db = getFirestore(app);
// Funciones Auth

//Create User with email and password
export const CreateUser= async(user:{email:string, password:string})=>{
  return await createUserWithEmailAndPassword(auth, user.email,user.password)
}

//Sign In with email and password
export const signIn= async(user:{email:string, password:string})=>{
    return await signInWithEmailAndPassword(auth, user.email,user.password)
}
// Update user's displayName and photoURL
export const updateUser= (user: {
  displayName?: string | null;
  photoURL?: string | null;
} )=>{
  if(auth.currentUser) return updateProfile(auth.currentUser,user )
}



//Database functions

//Get a document in a collection 
export const getDocument= async (path:string)=>{

  return (await getDoc(doc(db,path))).data();
}


//Set a document in a collection 
export const setDocument= (path:string, data:any)=>{
  data.createdAt=serverTimestamp();
  return setDoc(doc(db,path),data);
}