import { useEffect, useState } from "react";
import { useThunk } from "../hooks/useThunk";
import { fetchAllUsers } from "../store";
import { useSelector } from "react-redux";
import SlotBookingCard from "./SlotBookingCard";

function SlotBookingSection({ allSlots, doListAllSlots }) {
  const [dateSelected, setDateSelected] = useState(0);
  const [doFetchAllUsers, fetchAllUsersLoading, fetchAllUsersError] =
    useThunk(fetchAllUsers);
  const currentUser = useSelector((state) => state.user.currentUser);
  const slotsOnDate = allSlots?.filter((slot) => {
    const dateRef = new Date(dateSelected);
    dateRef.setHours(0, 0, 0);
    const startTime = dateRef.getTime();
    dateRef.setHours(23, 59, 59);
    const endTime = dateRef.getTime();
    return slot.timeRef >= startTime && slot.timeRef <= endTime;
  });
  console.log(dateSelected);
  const remainingUsers = useSelector((state) => state.user.allUsers)?.filter(
    (user) => {
      let flag;
      if (user._id !== currentUser?.user._id) {
        flag = true;
      } else {
        flag = false;
        return flag;
      }
      const slotsForUser = slotsOnDate?.find((slot) => {
        return slot.host._id === user._id;
      });
      if (slotsForUser) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    }
  );

  const handleDateChange = (event) => {
    setDateSelected(event.target.value);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      doFetchAllUsers(currentUser?.token);
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchAllUsers, currentUser]);

  return (
    <div className="flex flex-row items-center justify-around flex-wrap my-5 p-10 w-full">
      <h3 className="text-3xl font-semibold w-full text-center py-10">
        Your peers are waiting to connect with you!
      </h3>
      <h3 className="text-2xl font-medium w-full text-center py-10">
        Select a date:
      </h3>
      <input
        type="date"
        onChange={handleDateChange}
        className="bg-stone-100 text-lg px-5 py-3 shadow-lg rounded-lg"
      />
      <div className="flex flex-row items-center justify-around flex-wrap my-5 w-full">
        {remainingUsers?.map((user) => {
          return (
            <SlotBookingCard
              user={user}
              key={user._id}
              slotsOnDate={slotsOnDate}
              dateSelected={dateSelected}
              doListAllSlots={doListAllSlots}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SlotBookingSection;
