import { useState } from "react";
import Button from "./Button";
import { timeDisplay } from "../helpers/timeDisplay";
import Modal from "./Modal";
import { useThunk } from "../hooks/useThunk";
import { bookSlot } from "../store";
import { useSelector } from "react-redux";

function SlotBookingCard({ user, slotsOnDate, dateSelected, doListAllSlots }) {
  const [error, setError] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [doBookSlot, bookSlotLoading, bookSlotError] = useThunk(bookSlot);
  const [purpose, setPurpose] = useState("");
  const userSlots = slotsOnDate?.filter((slot) => {
    let flag;
    if (slot.host._id === user?._id) {
      if (slot.attendee) {
        flag = false;
      } else {
        flag = true;
      }
    } else {
      flag = false;
    }

    return flag;
  });
  const dateObj = new Date(dateSelected);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleSlotBooking = () => {
    if (!purpose) {
      setError(true);
      return;
    }
    doBookSlot({
      slotId: selectedSlot._id,
      token: currentUser?.token,
      purpose,
    });
    setTimeout(() => {
      doListAllSlots(currentUser?.token);
    }, 2000);
    setPurpose("");
    setSelectedSlot(null);
    setShowModal(false);
  };

  const modalBooking = (
    <Modal
      onClose={handleModalClose}
      actionBar={
        <Button primary onClick={handleSlotBooking}>
          Book Slot
        </Button>
      }
    >
      <form className="w-full h-full grid place-items-center">
        <textarea
          className="w-4/5 h-3/5 mx-auto p-3 text-xl border-2 border-stone-300 rounded-xl"
          placeholder="Purpose for booking the slot"
          value={purpose}
          onChange={handlePurposeChange}
        />
      </form>
    </Modal>
  );

  return (
    <div className="flex flex-col items-center justify-around p-10 bg-stone-200 rounded-xl shadow-xl 2xl:w-1/4 md:w-1/3">
      {showModal && modalBooking}
      <p className="mb-5 text-2xl font-semibold ">{user.name}</p>
      <p className="mb-5 text-lg">Founder, {user.businessDetails[0].name}</p>
      <p className="text-lg mb-5">Email: {user.email}</p>
      {selectedSlot && (
        <div className="my-5 flex flex-row items-center justify-center">
          <div className="px-5 py-3 bg-yellow-300 font-semibold text-lg w-fit rounded-lg shadow-lg">
            {timeDisplay(new Date(selectedSlot.timeRef).toLocaleTimeString())}
          </div>
          <Button
            primary
            className="text-lg ml-20"
            onClick={() => setShowModal(true)}
          >
            Book Slot
          </Button>
        </div>
      )}
      {error && (
        <p className="text-red-600 text-xl">
          You must enter why you're booking a slot
        </p>
      )}
      <p className="mb-5 text-xl font-semibold ">
        {selectedSlot
          ? `Other slots on ${dateObj.toLocaleDateString()}`
          : `Available slots on ${dateObj.toLocaleDateString()}`}
      </p>

      <div className="w-full flex flex-row items-center justify-start flex-wrap">
        {userSlots
          ?.filter((slot) => slot._id !== selectedSlot?._id)
          .map((slot) => {
            console.log(new Date(slot.timeRef).toISOString());
            return (
              <div
                key={slot._id}
                className="px-5 py-3 bg-yellow-300 font-semibold text-lg w-fit rounded-lg shadow-lg cursor-pointer"
                onClick={() => {
                  setSelectedSlot(slot);
                }}
              >
                {timeDisplay(new Date(slot.timeRef).toLocaleTimeString())}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SlotBookingCard;
