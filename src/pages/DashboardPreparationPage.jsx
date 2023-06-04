import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { fetchGoogleUser } from "../store";
import { useNavigate } from "react-router-dom";

function DashboardPreparationPage() {
  const navigate = useNavigate();
  const [doFetchGoogleUser, fetchGoogleUserLoading, fetchGoogleUserError] =
    useThunk(fetchGoogleUser);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const interval = setTimeout(() => {
      doFetchGoogleUser(urlParams.get("access_token"));
      navigate(`middle`);
    }, 1000);
    
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchGoogleUser,navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-3xl font-semibold w-fit px-5 py-3 bg-stone-200 shadow-xl rounded-xl">
        Loading
      </div>
    </div>
  );
}

export default DashboardPreparationPage;
