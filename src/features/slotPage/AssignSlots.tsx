import { useQuery } from "@tanstack/react-query";
import { assignSlot, getApplicantByEmailPhone, getSlots } from "../../services/apiServices";
import { useState, useContext, useEffect } from "react";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { FormDataContext } from "../../context/FormContext";
import InputGroup from "../../ui/InputGroup";
import InputCol from "../../ui/InputCol";

interface Slot {
  id: number;
  slot_time: string;
}

interface Applicant {
  visit_form_id: number;
  slot_id?: number | null;
}

function AssignSlot() {
  const navigate = useNavigate();
  const { setSlot } = useContext(FormDataContext);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [studentData, setStudentData] = useState<Applicant | null>(null);

  const { data: slots = [], error, isLoading } = useQuery<Slot[]>({
    queryKey: ["slots"],
    queryFn: getSlots,
  });

  useEffect(() => {
    if (selectedSlot === null) return;
    const slotObj = slots.find(slot => slot.id === selectedSlot);
    if (slotObj) setSlot(slotObj.slot_time);
  }, [selectedSlot, slots, setSlot]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentData && !emailOrPhone.trim()) {
      toast.error("Please enter email or phone");
      return;
    }

    if (studentData && selectedSlot === null) {
      toast.error("Please select a slot");
      return;
    }

    try {
      setSubmitting(true);

      if (!studentData) {
        const payload = emailOrPhone.includes("@")
          ? { email: emailOrPhone }
          : { phone: emailOrPhone };

        const applicant = await getApplicantByEmailPhone(payload);

        if (!applicant) {
          toast.error("Applicant not found");
          return;
        }

        setStudentData(applicant);
        toast.success("Applicant found! Please select a slot.");
        return;
      }

      // Assign slot and get applicant_id
      const applicantId = await assignSlot(selectedSlot!, studentData.visit_form_id);

      // Save only applicant_id for ThankYou page
      localStorage.setItem("applicantId", JSON.stringify(applicantId));

      toast.success("Slot booked successfully!");
      navigate("/ThankYou");

    } catch (err) {
      toast.error("Error processing your request");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">Error fetching slots</div>;
  if (slots.length === 0) return <div className="text-center mt-10">No slots available</div>;

  const inputClasses = `
    form-input bg-white dark:bg-black
    text-red-400
    border border-red-300 dark:border-red-700
    rounded-xl p-3
    focus:outline-none focus:ring-2 focus:ring-red-500
    transition-all duration-300 shadow-sm
  `;

  return !studentData?.slot_id ? (
    studentData ? (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-black rounded shadow-md mt-10">
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
              <option value="" disabled>Select a slot</option>
              {slots.map(slot => (
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
    ) : (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-black rounded shadow-md mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">
          Type your Phone number or Email used in registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputGroup>
            <InputCol>
              <input
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email or Phone"
                className={inputClasses}
              />
            </InputCol>
          </InputGroup>

          <button
            type="submit"
            disabled={submitting}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded w-full disabled:opacity-50"
          >
            {submitting ? "Finding..." : "Submit"}
          </button>
        </form>
      </div>
    )
  ) : (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-black rounded shadow-md mt-10 text-center">
      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
        You already have a booked slot!
      </p>
    </div>
  );
}

export default AssignSlot;
