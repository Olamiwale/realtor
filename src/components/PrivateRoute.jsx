
import { Outlet, Navigate } from "react-router-dom";
import  useAuthStatus  from "../hook/useAuthStatus";
import Spinner from '../components/Spinner'
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
