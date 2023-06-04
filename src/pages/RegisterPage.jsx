import { useEffect } from "react";
import RegistrationForm from "../components/RegistrationForm";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { fetchGoogleUser } from "../store";

function RegisterPage() {
  const [doFetchGoogleUser, fetchGoogleUserLoading, fetchGoogleUserError] =
    useThunk(fetchGoogleUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const interval = setTimeout(() => {
      doFetchGoogleUser(urlParams.get("access_token"));
    }, 1000);
    if(currentUser){
      localStorage.setItem('user',JSON.stringify(currentUser));
    }
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchGoogleUser]);
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <RegistrationForm
        name={currentUser?.user.name}
        email={currentUser?.user.email}
        token={currentUser?.token}
      />
    </div>
  );
}

export default RegisterPage;
