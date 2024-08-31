import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc'


export default function Auth() {

  const [user, setUser] = useState(null);
 

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      alert('Google sign-in successful');
    } catch (error) {
      console.error('Error during Google sign-in:', error.message);
      alert('Google sign-in failed');
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
