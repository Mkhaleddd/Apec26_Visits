import { useFormContext } from "react-hook-form";
import InputCol from "../../ui/InputCol";
import InputGroup from "../../ui/InputGroup";

function Step4() {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <InputGroup>
        <InputCol>
          <select
            {...register("aboutUs", {
              required: true,
              validate: (value) => value !== "def" || "Please select one",
            })}
            className="w-full placeholder:text-black p-2  border-b-2 border-primary focus:border-black focus:outline-none  bg-secondary"
          >
            <option value="def"> How do hear about the Event?</option>
            <option value="facebook">Facebook</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Whatsapp">Whatsapp Channel</option>
            <option value="Ushering">
              Ushering(some one from APEC spoke with you)
            </option>
            <option value="other">Other</option>
          </select>
          <p
            className={` ${
              errors.aboutUs ? "visible" : "invisible"
            }  text-red-500 text-sm mt-2 pl-1"`}
          >
            {String(errors?.aboutUs?.message)}
          </p>
        </InputCol>
      </InputGroup>

    
    </>
  );
}

export default Step4;
