import { useState } from "react";
import CheckboxInput from "./CheckboxInput";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { createBusiness, fetchGoogleUser } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BusinessForm() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [doAddBusiness, addBusinessLoading, addBusinessError] =
    useThunk(createBusiness);
  const [doFetchGoogleUser] = useThunk(fetchGoogleUser);
  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    isPrimary: false,
    website: "",
    description: "",
    category: "",
    socials: [],
  });

  const [primary, setPrimary] = useState({
    options: ["Mark Primary"],
    selectedOptions: [],
  });

  const handleNameChange = (event) => {
    setBusinessDetails({ ...businessDetails, name: event.target.value });
  };
  const handleWebsiteChange = (event) => {
    setBusinessDetails({ ...businessDetails, website: event.target.value });
  };
  const handleDescriptionChange = (event) => {
    setBusinessDetails({ ...businessDetails, description: event.target.value });
  };

  const handlePrimaryChange = (event) => {
    if (primary.selectedOptions.includes(event.target.value)) {
      setPrimary({
        ...primary,
        selectedOptions: primary.selectedOptions.filter(
          (option) => option !== event.target.value
        ),
      });
      setBusinessDetails({ ...businessDetails, isPrimary: false });
    } else {
      setPrimary({
        ...primary,
        selectedOptions: [...primary.selectedOptions, event.target.value],
      });
      setBusinessDetails({ ...businessDetails, isPrimary: true });
    }
  };

  const handleBusinessAddition = (event) => {
    event.preventDefault();
    doAddBusiness({ businessDetails, token: currentUser.token });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <form
      className="w-2/5 px-10 py-5 bg-stone-300 text-stone-700 rounded-lg shadow-xl text-2xl flex flex-col items-center justify-center"
      onSubmit={handleBusinessAddition}
    >
      <p className="text-3xl font-semibold mt-10 mb-5">
        Enter business details
      </p>
      <input
        type="text"
        value={businessDetails.name}
        placeholder="Business Name"
        onChange={handleNameChange}
        className={`w-5/6 my-5 px-5 py-3 rounded-xl bg-white`}
      />
      <CheckboxInput
        className={`w-5/6 mb-5 px-5 py-3 rounded-xl bg-inherit`}
        question={primary}
        onInputChange={handlePrimaryChange}
      />
      <input
        type="text"
        value={businessDetails.website}
        placeholder="Business Website"
        onChange={handleWebsiteChange}
        className={`w-5/6 mb-5 px-5 py-3 rounded-xl bg-white`}
      />
      <textarea
        value={businessDetails.description}
        placeholder="Tell us about your business"
        onChange={handleDescriptionChange}
        className={`w-5/6 mb-5 px-5 py-3 h-72 rounded-xl bg-white`}
      />
      <Button primary>Submit</Button>
    </form>
  );
}
export default BusinessForm;
