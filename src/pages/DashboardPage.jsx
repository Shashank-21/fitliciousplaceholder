import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { listAllSlots } from "../store";
import SlotBookingSection from "../components/SlotBookingSection";
import SlotReleaseSection from "../components/SlotReleaseSection";

function DashboardPage() {
  const [doListAllSlots, listAllSlotsLoading, listAllSlotsError] =
    useThunk(listAllSlots);
  const currentUser = useSelector((state) => state.user.currentUser);
  const allSlots = useSelector((state) => state.slots.allSlots)?.map((slot) => {
    return {
      ...slot,
      timeRef:
        slot.timeRef +
        (slot.host.timezoneOffset - currentUser.user.timezoneOffset) * 60000,
    };
  });
  console.log(currentUser);

  const currentUserSlots = allSlots?.filter(
    (slot) => slot.host === currentUser?.user._id
  );
  console.log("All slots:", allSlots);

  console.log("Current user slots:", currentUserSlots);

  useEffect(() => {
    const interval = setTimeout(() => {
      doListAllSlots(currentUser.token);
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [doListAllSlots, currentUser]);

  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <h3 className="text-3xl font-semibold mt-24 py-5 mb-5 w-full text-center">
        Welcome, {currentUser?.user.name}!
      </h3>
      <SlotBookingSection allSlots={allSlots} doListAllSlots={doListAllSlots} />
      <SlotReleaseSection allSlots={allSlots} doListAllSlots={doListAllSlots} />
    </div>
  );
}

export default DashboardPage;
