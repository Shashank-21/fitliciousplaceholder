import { useState } from "react";
import { useThunk } from "../hooks/useThunk";
import { updateUser } from "../store";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";

function RegistrationForm({ name, email, token }) {
  const navigate = useNavigate();
  const locations = useSelector((state) => state.user.locations).map(
    (location) => {
      return { label: location, value: location };
    }
  );
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);
  const [doUpdateUser, updateUserPending, updateUserError] =
    useThunk(updateUser);
  const regExpPhone = /(\+[0-9]{1,3}-)?\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}/;

  const dateHandle = new Date();
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    dateHandle.toISOString().substring(0, 10)
  );

  const handleLocationChange = (option) => {
    setLocation(option);
  };

  const handlePhoneChange = (event) => {
    if (event.target.value.match(regExpPhone)) {
      setError(false);
    }
    setPhone(event.target.value);
  };

  const handleDateChange = (event) => {
    const dateString = event.target.value.split("-");
    dateHandle.setFullYear(dateString[0]);
    dateHandle.setMonth(dateString[1] - 1);
    dateHandle.setDate(dateString[2]);
    setDateOfBirth(dateHandle.toISOString().substring(0, 10));
  };

  const handleUserRegistration = (event) => {
    event.preventDefault();
    if (!phone.match(regExpPhone)) {
      setError(true);
      return;
    }
    doUpdateUser({ phone, dob: dateOfBirth, token, location });
    setTimeout(() => {
      navigate("business-details");
    }, 1500);
  };

  return (
    <form
      className="w-2/5 px-10 py-5 bg-stone-300 text-stone-700 rounded-lg shadow-xl text-2xl flex flex-col items-center justify-center"
      onSubmit={handleUserRegistration}
    >
      <div className="px-5 py-3 text-stone-500 bg-stone-200 rounded-xl my-5 w-5/6">
        {name}
      </div>
      <div className="px-5 py-3 text-stone-500 bg-stone-200 rounded-xl mb-5 w-5/6">
        {email}
      </div>
      <input
        type="text"
        value={phone}
        placeholder="Phone"
        onChange={handlePhoneChange}
        className={`w-5/6 mb-5 px-5 py-3 rounded-xl bg-white`}
      />
      <label className="mb-2 w-5/6 text-left">Date of Birth:</label>
      <input
        type="date"
        value={dateOfBirth}
        onChange={handleDateChange}
        className={`w-5/6 mb-5 px-5 py-3 rounded-xl bg-white`}
      />
      {error && (
        <p className="my-3 text-red-700">
          Valid Phone Number Formats:
          <br />
          XXXXXXXXXX
          <br />
          [+Country Code]-XXXXXXXXXX
          <br />
          [+Country Code]-XXX-XXX-XXXX
          <br />
          [+Country Code]-(XXX)-XXX-XXXX
        </p>
      )}
      <Dropdown
        options={locations}
        value={location}
        onChange={handleLocationChange}
      />
      <Button primary>Submit</Button>
    </form>
  );
}
export default RegistrationForm;
