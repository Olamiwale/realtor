import React,{useState} from "react";
import image1 from "../assets/image.png";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";

export default function ForgotPassword() {

  const [email, setEmail] = useState('') 

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold uppercase">Forget password</h1>

      <div className="flex justify-center gap-10 md:flex-row flex-col items-center p-12 max-w-6xl mx-auto">
        <div className="">
          <img src={image1} alt="key" className="w-full rounded-2xl" />
        </div>

        <div className="w-[250px] md:w-[300px]">
          <form>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email address"
              className="mb-6 w-full p-2 md:p-4 text-gray-700 border-gray-300 rounded"
            />


            <div className="flex justify-between mx-6 mb-6 md:text-[12px] items-center ">
              <p>
                <Link to="/sign-up">
                  <span>Register </span>
                </Link>
              </p>

              <p>
                <Link to="/sign-in">
                <span className="text-blue-400"> Login</span></Link>
              </p>
            </div>
           
            <Auth />
          </form>
        </div>
      </div>
    </div>
  );
}
