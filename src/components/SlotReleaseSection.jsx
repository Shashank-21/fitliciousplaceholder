import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { createSlot } from "../store";
import { useState } from "react";
import { timeDisplay } from "../helpers/timeDisplay";
import Button from "./Button";

function SlotReleaseSection({ allSlots, doListAllSlots }) {
  const [doCreateSlot, createSlotLoading, createSlotError] =
    useThunk(createSlot);
  const [dateTimeRef, setDateTimeRef] = useState(0);
  const currentUser = useSelector((state) => state.user.currentUser);

  const userSlotsOnDate = allSlots?.filter((slot) => {
    let flag;

    if (slot.host._id === currentUser.user._id) {
      flag = true;
      const start = new Date(dateTimeRef);
      const end = new Date(dateTimeRef);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      if (start.getTime() <= slot.timeRef && end.getTime() >= slot.timeRef) {
        flag = true;
      } else {
        flag = false;
      }
    } else {
      flag = false;
    }

    return flag;
  });

  console.log(userSlotsOnDate);

  const handleDateTimeChange = (event) => {
    const timeRef = new Date(event.target.value).getTime();
    setDateTimeRef(timeRef);
  };

  const handleSlotReleaseClick = () => {
    doCreateSlot({ timeRef: dateTimeRef, token: currentUser?.token });
    setTimeout(() => {
      doListAllSlots(currentUser?.token);
    }, 1000);
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl py-10 font-semibold text-center">
        Want your peers to discover you?
      </h3>
      <h4 className="text-center text-xl pb-10">
        Go ahead, tell them when they can connect wiith you!
      </h4>
      <div className="flex flex-col md:flex-row justify-center w-full">
        <input
          type="datetime-local"
          onChange={handleDateTimeChange}
          className="text-xl bg-stone-100 shadow-lg rounded-lg px-10 py-3 open:backdrop:bg-stone-400"
        />
        <Button primary className="ml-10" onClick={handleSlotReleaseClick}>
          Create Slot
        </Button>
      </div>
      <h4 className="text-center text-xl pb-10 mt-10 font-semibold">
        Slots Released for selected date:
      </h4>
      <div className="my-5 px-20 py-3 w-full">
        {userSlotsOnDate?.map((slot) => {
          return (
            <div
              key={slot._id}
              className="px-5 py-3 bg-stone-300 font-semibold text-xl w-fit rounded-lg shadow-lg"
            >
              {timeDisplay(new Date(slot.timeRef).toLocaleTimeString())}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SlotReleaseSection;
