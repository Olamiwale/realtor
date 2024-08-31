import React,{useState} from "react";
import image1 from "../assets/image.png";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Auth from "../components/Auth";

export default function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(true)

  

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold uppercase">Sign up</h1>

      <div className="flex justify-center gap-10 flex-wrap items-center p-12 max-w-6xl mx-auto">
        <div className="">
          <img src={image1} alt="key" className="w-full rounded-2xl" />
        </div>

        <div>
          <form>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email address"
              className="mb-6 w-full p-2 md:p-4 text-gray-700 border-gray-300 rounded transition ease-in-out"
            />

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              id="email"
              placeholder="Email address"
              className="mb-6 w-full p-2 md:p-4 text-gray-700 border-gray-300 rounded transition ease-in-out"
            />

            <div className="relative mb-6">
              <input
              type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
                className="w-full p-2 md:p-4 text-gray-700 border-gray-300 rounded transition ease-in-out"                
              />
              <div className="absolute top-1/3 right-2" onClick={() => setShowPass(!showPass)}>

              {showPass ? <AiFillEye /> : <AiFillEyeInvisible />} 
                
              </div>
              
            </div>

            <div className="flex justify-center mb-6 text-sm md:text-[12px] items-center ">
              <p> Don't have a account?
                <Link to="/sign-up">
                  <span className="px-2">Register </span>
                </Link>
              </p>

              <p>
                <Link to="/forgot-password">
                <span> Forgot password?</span></Link>
              </p>
            </div>


            <button
              className="w-full bg-blue-600 text-white p-2 md:p-4 font-medium uppercase rounded hover:bg-blue-700"
              type="submit"
            >
              Sign in
            </button>
            <div className="flex items-center  p-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Auth />
          </form>
        </div>
      </div>
    </div>
  );
}
