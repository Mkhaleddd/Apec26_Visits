
export {};

declare global {
   interface FeedbackForm {
  name: string;
  ushering: string;
  information: string;
  friendly: string;
  flyer: string;
  satisfied: string;
  design: string;
  comments?: string;
}
  type FormType = {
    fullName:string;
    university_code:string;
    email: string;
    phone: string;
    university: number;
    other_university:string;
    faculty: string;
    other_faculty:string;
    year: number;
    first_preference:string;
    second_preference:string;
    third_preference:string;
    preference_percentage: string;
    aboutUs: string;
    major: number;
    student_id:string
    program:string;
  };
  interface Slot {
  id: number;
  slot_time: string;
  capacity: number;
  created_at: string;
  updated_at: string;
}
interface ApplicantSearchPayload {
  email?: string;
  phone?: string;
}

type OptionType = { value: number | string; label: string };

type Visit= {
  id: number;
  visit_name: string;
  description: string;
  company_id: number;
  target_major_id: number;
  target_faculty_id: number;
  target_year_id: number;
  created_at: string; 
  updated_at: string; 
}

  type DataRes= {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };

  type StudentType = {
    apply_status: string;
    college: string;
    created_at: Date;
    cv: string | null;
    email: string;
    event_source: string;
    experience: string;
    first_pref: string | null;
    submission_time: Date | null;
    major: string;
    name: string;
    phone: string;
    pref_percentages: string;
    second_pref: string | null;
    third_pref: string | null;
    university: string;
    year: number;
    score: string | null;
  };

  type StudentTypeWithInterview = StudentType & {
    interviewer_name: string;
    interview_date: Date;
  };
}
