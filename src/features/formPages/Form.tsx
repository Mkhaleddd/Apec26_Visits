import { useForm, FormProvider } from "react-hook-form";
import Button from "../../ui/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import toast from "react-hot-toast";
import { useAddStudent } from "./useAddStudent";
import { useNavigate } from "react-router";

const validateSteps: Record<number, (keyof FormType)[]> = {
  1: [],
  2: [
    "fullName",
    "university_code",
    "email",
    "phone",
    "university",
    "other_university",
    "faculty",
    "other_faculty",
    "year",
    "major",
    "student_id",
    "program"
  ],
  3: [
    "first_preference",
    "second_preference",
    "third_preference",
    "preference_percentage",
  ],
  4: ["aboutUs"],
};

function Form({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (steps: number) => void;
}) {
  const { isLoading, addStudent } = useAddStudent();
  const navigate = useNavigate();
  const methods = useForm<FormType>();

  function handleNext() {
    methods.trigger(validateSteps[currentStep]).then((isValid) => {
      if (isValid) {
        const firstPref = methods.getValues("first_preference");
        if (currentStep === 3 && (!firstPref || firstPref === "def")) return;
        setCurrentStep(currentStep + 1);
      }
    });
  }

  function handleBack() {
    setCurrentStep(currentStep - 1);
  }

  function onSubmit(formData: FormType) {
    addStudent(formData, {
      onSuccess: (data) => {
        toast.success("Form added successfully!");
        methods.reset();
        localStorage.setItem("studentData", JSON.stringify(data));
        //const studentDataString = localStorage.getItem("studentData");
        //const studentData = studentDataString ? JSON.parse(studentDataString) : null;
        //console.log(studentData)
        navigate("/success");
      },
      onError: () => {
        toast.error("Error submitting form");
      },
    });
  }


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="
          bg-white dark:bg-black
          border-2 dark:border-red-700
          w-[95%] lg:w-[85%] m-auto
          rounded-tl-[40px] rounded-br-[40px]
          p-6 md:p-10
          shadow-xl dark:shadow-red-900
          transition-colors duration-500
        "
      >
        {renderStep()}

        <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
          {currentStep > 1 && (
            <Button isLoading={isLoading} type="button" onClick={handleBack}>
              Previous
            </Button>
          )}

          {currentStep < 4 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}

          {currentStep === 4 && (
            <Button isLoading={isLoading} type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default Form;
