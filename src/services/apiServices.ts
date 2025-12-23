import axios from "axios";

const URL ="https://api.apeceg.com/api";


export async function getVisits(faculty_id:number,year_id:number,major_id:number){
  try {
    const response = await axios.get(
      `${URL}/visits?faculty_id=${faculty_id}&year_id=${year_id}&major_id=${major_id}`
    );
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch visits");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching visits, try later");
    throw error;
  }
}


export async function addStudent(formData: FormType) {

  const {
    fullName,
    student_id,
    email,
    phone,
    university,
    other_university,
    faculty,
    other_faculty,
    year,
    major,
    first_preference,
    second_preference,
    third_preference,
    preference_percentage,
    program,
    aboutUs
  } = formData;

  const finalForm = {
    name: fullName,
    email,
    phone,
    attendance_time: null,
    major_id: Number(major),
    year_id: Number(year),
    first_preference: first_preference || null,
    second_preference: second_preference || null,
    third_preference: third_preference || null,
    university_id: Number(university),
    university_code: student_id, 
    faculty_id: Number(faculty),
    other_university: other_university || null,
    other_faculty: other_faculty || null,
    program,
    preference_percentage,
    heard_about_us:aboutUs
  };

 // console.log(finalForm);

  try {
    const response = await axios.post(`${URL}/applicants`, finalForm);
    return response.data;
  } catch (error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    const formattedError=Object.entries(error.response.data.errors).map(e=>(`${e[0]}:${e[1]}`))
   throw { message: "Validation failed", errors: formattedError };
  }

  throw { message: "Unknown error" };
}

}


export async function getUniversities(): Promise<DataRes[]> {
  try {
    const response = await axios.get(
      `${URL}/universities`
    );
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch universities");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching universities, try later");
    throw error;
  }
}

export async function getFaculties(): Promise<DataRes[]> {
  try {
    const response = await axios.get(
      `${URL}/faculties`
    );
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch faculties");
    }
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching faculties, try later");
    throw error;
  }
}

export async function getMajorsbyFaculty(
  facultyId: number
): Promise<DataRes[]> {
  try {
    const response = await axios.get(
      `${URL}/faculties/${facultyId}/majors`
    );
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch majors");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching majors, try later");
    console.log(facultyId);
    throw error;
  }
}   
export async function getYears(): Promise<DataRes[]> {
  try {
    const response = await axios.get(
      `${URL}/years`
    );
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch years");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching years, try later");
    throw error;
  }
}   

export async function getSlots(){
  try {
    const response = await axios.get(
      `${URL}/slots`
    );
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    const message =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";
    throw new Error(message);
  }
}

export async function assignSlot(
  slot_id: number,
  applicant_id: number
) {
  try {
    console.log(applicant_id, slot_id);
    const response = await axios.post(`${URL}/applicants/assign-slot`, {
      slot_id,
      applicant_id,
    });

    console.log(response.data);
    return response.data.applicant_id;
  } catch (error: any) {
    const message =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Unknown error";
    console.error("Error assigning slot:", error);
    throw new Error(message);
  }
}




export const addFeedback = async (formData: FeedbackForm) => {
  try {
  
    if (!formData.name) throw new Error("Member name is required");
    
    const response = await axios.post(`${URL}/feedback`, formData);
    
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to submit feedback");
    }

    return response.data;
  } catch (error: unknown) {
    console.error("Add feedback error:", error);

    if (axios.isAxiosError(error)) {

      throw new Error(error.response?.data?.message || "Failed to submit feedback");
    }

    throw new Error((error as Error).message || "Unknown error submitting feedback");
  }
};

export const getApplicantByEmailPhone = async (
  payload: ApplicantSearchPayload
): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/applicants/search`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};