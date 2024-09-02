import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";




export default function Auth() {

  const [user, setUser] = useState(null);
 

  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user)
      alert('Sign in successful')
        navigate('/')
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }


    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('No account found with this email. Please sign up')
       } else if (error.code === 'auth/wrong-password'){
        alert('Incorrect password')
       } else {
        alert(`Error: ${error.message}`)
       }
    }
  };
   
  return (
    <button onClick={handleGoogleSignIn}
      type="button"
      className="flex items-center justify-center w-full bg-red-700 text-white p-2 md:p-4 uppercase font-medium hover:bg-red-800 rounded"
    >
      <FcGoogle className="text-2xl  bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  )
}
