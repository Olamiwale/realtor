import React, { useState } from "react";
import image1 from "../assets/image.png";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Auth from "../components/Auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(true);

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    if (!password) {
      alert("Please enter a password.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      alert("Sign up successful");
      navigate('/')
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered");
      } else {
        alert(`Error: ${error.Message}`);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold uppercase">Sign up</h1>

      <div className="flex justify-center gap-10 flex-wrap items-center p-12 max-w-6xl mx-auto">
      <div className="flex justify-center">
          <img src={image1} alt="key" className="w-[380px] h-[300px] rounded-2xl" />
        </div>

        <div>
          <form onSubmit={handleSignUp}>
            <input
              value={name}
              type="name"
              id="name"
              placeholder="Name"
              className="custom-input"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              value={email}
              type="email"
              id="email"
              placeholder="Email address"
              className="custom-input"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative mb-6">
              <input
                type={!showPass ? "text" : "password"}
                value={password}
                id="password"
                placeholder="Password"
                className="custom-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/3 right-2"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            <div className="flex justify-center mb-6 text-sm md:text-[12px] items-center ">
              <p>
                Don't have a account?
                <Link to="/sign-up">Register </Link>
              </p>

              <p className="px-2 text-red-700">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>

            <button className="blue-btn">Sign up</button>
            <div className="opt">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Auth />
          </form>
        </div>
      </div>
    </div>
  );
}
