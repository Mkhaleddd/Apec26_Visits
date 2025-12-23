import { useFormContext, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { FormDataContext } from "../../context/FormContext";
import InputGroup from "../../ui/InputGroup";
import InputCol from "../../ui/InputCol";
import {
  getUniversities,
  getFaculties,
  getMajorsbyFaculty,
  getYears,
} from "../../services/apiServices";


const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <svg
      className="w-4 h-4 text-red-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </components.DropdownIndicator>
);
const IndicatorSeparator = () => null;

function Step2() {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { setFaculty, setMajor, setYear, setUni } = useContext(FormDataContext);

  const selectedUniversity = watch("university");
  const selectedFaculty = watch("faculty");


  const { data: universities } = useQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
  });

  const { data: faculties } = useQuery({
    queryKey: ["faculties"],
    queryFn: getFaculties,
  });

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: getYears,
  });

  const facultyObj = faculties?.find(
    (f) => f.id === Number(selectedFaculty)
  );

  const { data: majors } = useQuery({
    queryKey: ["majors", selectedFaculty],
    queryFn: () => getMajorsbyFaculty(facultyObj?.id as number),
    enabled: !!facultyObj && selectedFaculty !== "other",
  });

  const majorObj = majors?.find((m) => m.id === Number(watch("major")));
  const yearObj = years?.find((y) => y.id === Number(watch("year")));
  const uniObj = universities?.find(u => u.id === Number(watch("universities")))

  useEffect(() => {
    if (facultyObj) setFaculty(facultyObj.id);
    if (majorObj) setMajor(majorObj.id);
    if (yearObj) setYear(yearObj.id);
    if (uniObj) setUni(uniObj.id);


  }, [facultyObj, majorObj, yearObj, setFaculty, setMajor, setYear]);


  const inputClasses = `
    form-input bg-white dark:bg-black
    text-red-400
    border border-red-300 dark:border-red-700
    rounded-xl p-3
    focus:outline-none focus:ring-2 focus:ring-red-500
    transition-all duration-300 shadow-sm
  `;

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "48px",
      padding: "0 0.6rem",
      borderRadius: "1rem",
      borderColor: "#f87171",
      backgroundColor: "#ffffff",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#f87171",
    }),
  };

  const universityOptions =
    universities?.map((u) => ({ value: u.id, label: u.name })) || [];

  const facultyOptions =
    faculties?.map((f) => ({ value: f.id, label: f.name })) || [];

  return (
    <>
      {/* ================= FULL NAME ================= */}
      <InputGroup>
        <InputCol>
          <input
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              pattern: {
                value: /^[A-Za-z\s-]+$/,
                message: "Full name must not contain numbers",
              },
            })}
            placeholder="Full Name"
            className={inputClasses}
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message as string}</p>
        </InputCol>
      </InputGroup>

      {/* ================= PHONE ================= */}
      <InputGroup>
        <InputCol>
          <input
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 11,
                message: "Phone must be at least 11 digits",
              },
              pattern: {
                value: /^[0-9+\-() ]+$/,
                message: "Invalid phone number",
              },
            })}
            placeholder="Phone Number"
            className={inputClasses}
          />
          <p className="text-red-500 text-sm">{errors.phone?.message as string}</p>
        </InputCol>
      </InputGroup>

      {/* ================= EMAIL ================= */}
      <InputGroup>
        <InputCol>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                const domain = value.split("@")[1]?.toLowerCase();
                if (!domain) return "Invalid email format";

                if (domain.endsWith(".edu") || domain.endsWith(".edu.eg")) {
                  return "University emails are not allowed";
                }
                const egyptianUniversities = [
                  "asu.edu.eg",
                  "eng.asu.edu.eg",
                  "cu.edu.eg",
                  "alexu.edu.eg",
                  "mans.edu.eg",
                  "bu.edu.eg",
                  "aun.edu.eg",
                  "suezuniv.edu.eg",
                  "fue.edu.eg",
                  "guc.edu.eg",
                  "miuegypt.edu.eg",
                  "ksu.edu.eg",
                  "hti.edu.eg",
                  "aast.edu",
                  "aucegypt.edu",
                ];

                if (egyptianUniversities.some((u) => domain === u || domain.endsWith(`.${u}`))) {
                  return "University emails are not allowed";
                }

                return true;
              }

            })}
            placeholder="Email Address"
            className={inputClasses}
          />
          <p className="text-red-500 text-sm">{errors.email?.message as string}</p>
        </InputCol>
      </InputGroup>

      {/* ================= PROGRAM ================= */}
      <InputGroup>
        <InputCol>
          <fieldset className="border border-red-500 rounded-xl p-4">
            <legend className="text-red-600 font-semibold">Program</legend>
            {["mainstream", "credit", "ahlia "].map((p) => (
              <label key={p} className="flex gap-2 items-center">
                <input
                  type="radio"
                  value={p}
                  {...register("program", {
                    required: "Program is required",
                  })}
                />
                {p}
              </label>
            ))}
          </fieldset>
          <p className="text-red-500 text-sm">{errors.program?.message as string}</p>
        </InputCol>
      </InputGroup>

      {/* ================= UNIVERSITY ================= */}
      <InputGroup>
        <InputCol>
          <Controller
            name="university"
            control={control}
            rules={{ required: "University is required" }}
            render={({ field }) => {
              const selectedOption =
                universityOptions.find(u => u.value === field.value) ||
                (field.value === "other" ? { value: "other", label: "Other" } : null);

              return (
                <Select
                  value={selectedOption}
                  onChange={opt => field.onChange(opt?.value)}
                  options={[...universityOptions, { value: "other", label: "Other" }]}
                  placeholder="Select University"
                  components={{ DropdownIndicator, IndicatorSeparator }}
                  styles={customStyles}
                />
              );
            }}
          />
          {selectedUniversity === "other" && (
            <input
              {...register("otherUniversity", { required: "Please enter your university" })}
              placeholder="Enter University"
              className={`${inputClasses} mt-2`}
            />
          )}
          <p className="text-red-500 text-sm">
            {(errors.university?.message || errors.otherUniversity?.message) as string}
          </p>
        </InputCol>

        {/* ================= FACULTY ================= */}
        <InputCol>
          <Controller
            name="faculty"
            control={control}
            rules={{ required: "Faculty is required" }}
            render={({ field }) => {
              const selectedOption =
                facultyOptions.find(f => f.value === field.value) ||
                (field.value === "other" ? { value: "other", label: "Other" } : null);

              return (
                <Select
                  value={selectedOption}
                  onChange={opt => field.onChange(opt?.value)}
                  options={[...facultyOptions, { value: "other", label: "Other" }]}
                  placeholder="Select Faculty"
                  components={{ DropdownIndicator, IndicatorSeparator }}
                  styles={customStyles}
                />
              );
            }}
          />
          {selectedFaculty === "other" && (
            <input
              {...register("otherFaculty", { required: "Please enter your faculty" })}
              placeholder="Enter Faculty"
              className={`${inputClasses} mt-2`}
            />
          )}
          <p className="text-red-500 text-sm">
            {(errors.faculty?.message || errors.otherFaculty?.message) as string}
          </p>
        </InputCol>
      </InputGroup>

      {/* ================= STUDENT ID ================= */}
      <InputGroup>
        <InputCol>
          <input
            {...register("student_id", {
              required: "Student ID is required",
              minLength: {
                value: 3,
                message: "Student ID must be at least 3 characters",
              },
            })}
            placeholder="Student ID"
            className={inputClasses}
          />
          <p className="text-red-500 text-sm">
            {errors.student_id?.message as string}
          </p>
        </InputCol>
      </InputGroup>

      {/* ================= YEAR & MAJOR ================= */}
      <InputGroup>
        <InputCol>
          <select
            {...register("year", { required: "Year is required" })}
            className={inputClasses}
          >
            <option value="">Select Year</option>
            {years?.map((y) => (
              <option key={y.id} value={y.id}>
                {y.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.year?.message as string}</p>
        </InputCol>

        {selectedFaculty !== "other" && majors?.length !== 0 && (
          <InputCol>
            <select
              {...register("major", { required: "Major is required" })}
              className={inputClasses}
            >
              <option value="">Select Major</option>
              {majors?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm">{errors.major?.message as string}</p>
          </InputCol>
        )}
      </InputGroup>
    </>
  );
}

export default Step2;
