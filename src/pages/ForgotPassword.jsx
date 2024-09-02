import React,{useState} from "react";
import image1 from "../assets/image.png";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {

  const [email, setEmail] = useState('') 
  const [message, setMessage] = useState(null)

  const forgetPassword = async (e) => {
   e.preventDefault();
   const auth = getAuth();
    try {
     await sendPasswordResetEmail(auth, email);
     setMessage('Password reset email sent')
    
      setTimeout(() => setMessage(null), 10000);
      setEmail('')
    

    } catch (error) {
       if (error.code === 'auth/user-not-found') {
        setMessage("No user found with this email address.");
      } else if (error.code === 'auth/invalid-email') {
        setMessage("Invalid email address.");
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold uppercase">Forget password</h1>
     <div className="justify-center flex pt-8">
       {message && <p className="mb-4 font-normal text-xl text-red-500">{message}</p>}
     </div>
     

      <div className="flex justify-center gap-10 md:flex-row flex-col items-center p-12 max-w-6xl mx-auto">
        <div className="">
          <img src={image1} alt="key" className="w-full rounded-2xl" />
        </div>

        <div className="w-[250px] md:w-[300px]">
          <form onSubmit={forgetPassword}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email address"
              className="custom-input"
            />


            <div className="flex justify-between mx-6 mb-6 md:text-[12px] items-center ">
              <p>
                <Link to="/sign-up"> Register</Link>
              </p>

              <p className="text-blue-400"> 
                <Link to="/sign-in"> Login</Link>
              </p>
            </div>
            <button className="blue-btn">Send</button>
           <div className="opt font-medium"> OR</div>
            <Auth />
          </form>
        </div>
      </div>
    </div>
  );
}

