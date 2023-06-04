import { useDispatch } from "react-redux";
import Button from "./Button";
import { loginUser } from "../store";
import { useNavigate } from "react-router-dom";

function NavigationBar({ currentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(loginUser(null));
    localStorage.removeItem("user");
    navigate("/");
  };

  const logoutButton = (
    <Button secondary outline className="text-md" onClick={logoutUser}>
      Logout
    </Button>
  );
  const buttonToShow = currentUser ? logoutButton : null;
  console.log(currentUser);
  return (
    <div className="w-full h-24 p-10 bg-yellow-300 text-black text-center hidden md:flex md:flex-row md:items-center md:justify-between fixed">
      <h3 className="text-2xl font-bold">I support your Business</h3>
      <div className="flex flex-row w-fit items-center justify-center">
        {buttonToShow}
      </div>
    </div>
  );
}

export default NavigationBar;
