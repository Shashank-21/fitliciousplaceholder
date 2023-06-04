import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

function MiddlePage() {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  useEffect(() => {
  if (currentUser) {
    localStorage.setItem('user',JSON.stringify(currentUser));
    navigate(`/dashboard/${currentUser.user._id}`);
  }
  }, [currentUser,navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-3xl font-semibold w-fit px-5 py-3 bg-stone-200 shadow-xl rounded-xl">
        Loading
      </div>
    </div>
  );
}

export default MiddlePage;
