import {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import realtor from "../assets/th.jpeg";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {

const [pageState, setPageState] = useState('Sign In')

  const location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  const auth = getAuth()

  useEffect(() => {
   onAuthStateChanged(auth, (user) => {
    if (user){
      setPageState('Profile')
    } else{
      setPageState('Sign In')
    }
   })
 
  }, [auth])
  



  return (
    <div className="border-b shadow-sm sticky bg-white top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={realtor}
            alt="logo"
            className="h-[50px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold${
                pathMatchRoute("/") &&
                "text-gray-400 border-b-[3px] border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/offers") && "text-gray-400 border-b-[3px] border-b-red-500"
              }`}onClick={() => navigate("/offers")}>Offers
            </li>
            
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/rent") && "text-gray-400 border-b-[3px] border-b-red-500"
              }`}onClick={() => navigate("/rent")}>Rent
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/sell") && "text-gray-400 border-b-[3px] border-b-red-500"
              }`}onClick={() => navigate("/sell")}>Sell
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-gray-400 border-b-[3px] border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
             {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
