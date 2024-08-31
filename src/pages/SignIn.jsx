import React,{useState} from "react";
import image1 from "../assets/image.png";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Auth from "../components/Auth";


export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(true)

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold uppercase">Sign In</h1>

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
              className="mb-6 w-full p-4 text-gray-700 border-gray-300 rounded transition ease-in-out"
            />
            <div className="relative mb-6">
              <input
              type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
                className="w-full p-4 text-gray-700 border-gray-300 rounded transition ease-in-out"

                
              />
              <div className="absolute top-1/3 right-2" onClick={() => setShowPass(!showPass)}>

              {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                
                
              </div>
              
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 ml-1"
                >
                  Register
                </Link>
              </p>

              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 px-2"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white font-medium uppercase rounded hover:bg-blue-700 p-2 md:p-4"
              type="submit"
            >
              Sign in
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Auth />
          </form>
        </div>
      </div>
    </div>
  );
}
