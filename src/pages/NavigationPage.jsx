import { useOutlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useSelector } from "react-redux";

function NavigationPage() {
  const currentOutlet = useOutlet();
  const business = useSelector((state) => state.business);
  console.log(business);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="text-blue-950">
      <NavigationBar currentUser={currentUser} />
      {currentOutlet}
    </div>
  );
}
export default NavigationPage;
