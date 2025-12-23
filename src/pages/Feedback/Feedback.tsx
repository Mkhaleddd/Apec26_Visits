import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addFeedback } from '../../services/apiServices';
import { memberOptions } from '../../member';
import './Feedback.css'

type FormDataType = {
  name: string;
  ushering: string;
  information: string;
  friendly: string;
  flyer: string;
  satisfied: string;
  design: string;
  comments: string;
};

const Feedback: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    ushering: '',
    information: '',
    friendly: '',
    flyer: '',
    satisfied: '',
    design: '',
    comments: ''
  });

  const ratingOptions = ["Excellent", "Very Good", "Good", "Fair", "Weak"];
  const yesNoOptions = ["Yes", "No"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof FormDataType]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addFeedback(formData);
      navigate('/ThankYouFeedback');
    } catch (error) {
      console.error("Submission failed:", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-center my-4">
        <h1 className="heading1 text-black">APEC'26 <span className="heading2">Visits</span></h1>
        <h1 className="heading1 text-black">Ushering & Registration <span className="heading2">Feedback</span></h1>
      </div>

      <div className="card shadow p-4" id="forrms">
        <form onSubmit={handleSubmit}>
          {/* Member select with optgroups */}
          <div className="form-group myclass">
            <label>Ushering member name:</label>
            <select
              className="form-control form-control-sm"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Choose a member</option>
              {memberOptions.map(group => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map(member => (
                    <option key={member.value} value={member.value}>
                      {member.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Rating questions */}
          {[
            { label: "Communication skills?", name: "ushering", options: ratingOptions },
            { label: "Information explained clearly?", name: "information", options: ratingOptions },
            { label: "Friendly?", name: "friendly", options: ratingOptions },
            { label: "Flyer's content?", name: "flyer", options: ratingOptions },
            { label: "Satisfied with registration?", name: "satisfied", options: yesNoOptions },
            { label: "Overall design?", name: "design", options: ratingOptions }
          ].map((field, index) => (
            <div className="form-group myclass" key={index}>
              <label>{field.label}</label>
              <select
                className="form-control form-control-sm"
                name={field.name}
                value={formData[field.name as keyof FormDataType]}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>Choose</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Comments */}
          <div className="form-group myclass">
            <label>Other comments to improve?</label>
            <textarea
              name="comments"
              className="form-control form-control-sm"
              placeholder="Write your answer ..."
              rows={8}
              value={formData.comments}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary px-5 btn-red">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
