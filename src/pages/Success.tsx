import { useQuery } from "@tanstack/react-query";
import { assignSlot, getSlots } from "../services/apiServices";
import { useState, useContext, useEffect } from "react";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import Error from "./Error";
import { useNavigate } from "react-router";
import { FormDataContext } from "../context/FormContext";

interface Slot {
  id: number;
  slot_time: string;
  capacity: number;
  created_at: string;
  updated_at: string;
}

function Success() {
  const navigate = useNavigate();

  const studentDataString = localStorage.getItem("studentData");
  const studentData = studentDataString
    ? JSON.parse(studentDataString)
    : null;

  const { setSlot } = useContext(FormDataContext);

  if (!studentData) return <Error />;

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    data: slots = [],
    error,
    isLoading,
  } = useQuery<Slot[]>({
    queryKey: ["slots"],
    queryFn: getSlots,
  });


  useEffect(() => {
    if (!selectedSlot) return;

    const slotObj = slots.find(
      (slot: Slot) => slot.id === selectedSlot
    );

    if (slotObj) {
      setSlot(slotObj.slot_time);
    }
  }, [selectedSlot, slots, setSlot]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSlot) {
      toast.error("Please select a slot");
      return;
    }

    try {
      setSubmitting(true);
      await assignSlot(selectedSlot, studentData.id);
      toast.success("Slot booked successfully!");
      navigate("/ThankYou");
    } catch (err) {
      toast.error("Error booking slot");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400">
        Error fetching slots
      </div>
    );

  if (slots.length === 0)
    return (
      <div className="text-gray-700 dark:text-gray-300 text-center mt-10">
        No slots available
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-black rounded shadow-md dark:shadow-red-500 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Select Your Slot
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-900 dark:text-gray-100">
            Available Slots
          </label>

          <select
            value={selectedSlot ?? ""}
            onChange={(e) => setSelectedSlot(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-700 rounded p-3 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled>
              Select a slot
            </option>

            {slots.map((slot: Slot) => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.slot_time).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-6 py-2 rounded w-full transition-colors disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Book Slot"}
        </button>
      </form>
    </div>
  );
}

export default Success;
