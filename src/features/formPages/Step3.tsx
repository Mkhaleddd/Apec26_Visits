import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import InputGroup from "../../ui/InputGroup";
import InputCol from "../../ui/InputCol";
import { getVisits } from "../../services/apiServices";
import { FormDataContext } from "../../context/FormContext";
import { useContext} from "react";

function Step3() {
  const { faculty, major, year} = useContext(FormDataContext);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const firstPref = watch("first_preference") as number | undefined;
  const secondPref = watch("second_preference") as number | undefined;
  const { data: visits, error, isLoading } = useQuery({
    queryKey: ["visits", faculty, major, year],
    queryFn: () => getVisits(faculty, year, major),
  });



  if (isLoading) return <Spinner />;
  if (error || !visits || visits.length === 0)
    return (
      <p className="text-3xl text-center my-10">
        Oops! No Companies Here Right Now. 🙃
      </p>
    );

  const secondOptions = visits.filter((v: Visit) => v.id !== firstPref);
  const thirdOptions = visits.filter(
    (v: Visit) => v.id !== firstPref && v.id !== secondPref
  );

  return (
    <>
      <span className="text-red-600 font-semibold tracking-wide block mb-4">
        IT IS POSSIBLE TO BE ACCEPTED IN EACH VISIT
      </span>

      {/* FIRST PREFERENCE */}
      <InputGroup>
        <InputCol>
          <select
            {...register("first_preference", {
              required: "Please select a visit",
              setValueAs: (v) => Number(v),
            })}
            defaultValue={0}
            className={`w-full border px-4 py-3 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 ${errors.first_preference ? "border-red-500" : "border-gray-300"
              }`}
          >
            <option value={0} disabled>
              Select Your First Preference
            </option>
            {visits.map((visit: Visit) => (
              <option key={visit.id} value={visit.id}>
                {visit.visit_name}
              </option>
            ))}
          </select>
          {errors.first_preference && (
            <p className="text-red-500 mt-1">
              {errors.first_preference.message as string}
            </p>
          )}
        </InputCol>
      </InputGroup>

      {/* SECOND PREFERENCE */}
      {secondOptions.length > 0 && (
        <InputGroup>
          <InputCol>
            <select
              {...register("second_preference", {
                required: "Please select a visit",
                setValueAs: (v) => Number(v),
              })}
              defaultValue={0}
              className={`w-full border px-4 py-3 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-blue-500 ${errors.second_preference ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value={0} disabled>
                Select Your Second Preference
              </option>
              {secondOptions.map((visit: Visit) => (
                <option key={visit.id} value={visit.id}>
                  {visit.visit_name} 
                </option>
              ))}
            </select>
            {errors.second_preference && (
              <p className="text-red-500 mt-1">
                {errors.second_preference.message as string}
              </p>
            )}
          </InputCol>
        </InputGroup>
      )}

      {/* THIRD PREFERENCE */}
      {thirdOptions.length > 0 && (
        <InputGroup>
          <InputCol>
            <select
              {...register("third_preference", {
                required: "Please select a visit",
                setValueAs: (v) => Number(v),
              })}
              defaultValue={0}
              className={`w-full border px-4 py-3 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-blue-500 ${errors.third_preference ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value={0} disabled>
                Select Your Third Preference
              </option>
              {thirdOptions.map((visit: Visit) => (
                <option key={visit.id} value={visit.id}>
                  {visit.visit_name}
                </option>
              ))}
            </select>
            {errors.third_preference && (
              <p className="text-red-500 mt-1">
                {errors.third_preference.message as string}
              </p>
            )}
          </InputCol>
        </InputGroup>
      )}

      {/* PREFERENCE PERCENTAGE */}
      <InputGroup>
        <InputCol>
          <label className="block text-sm font-medium mb-1">
            Preference Percentage
          </label>
          <select
            {...register("preference_percentage", {
              required: "Please select preference percentage",
            })}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Select preference percentage --</option>
            {[
              "0:0:100",
              "0:20:80",
              "0:40:60",
              "0:60:40",
              "0:80:20",
              "0:100:0",
              "20:0:80",
              "20:20:60",
              "20:40:40",
              "20:60:20",
              "20:80:0",
              "40:0:60",
              "40:20:40",
              "40:40:20",
              "40:60:0",
              "40:30:30",
              "60:0:40",
              "60:20:20",
              "60:40:0",
              "80:0:20",
              "80:20:0",
              "100:0:0",
            ].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.preference_percentage && (
            <p className="text-red-500 mt-1">
              {errors.preference_percentage.message as string}
            </p>
          )}
        </InputCol>
      </InputGroup>
    </>
  );
}

export default Step3;
