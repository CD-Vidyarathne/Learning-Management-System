// ApplyTeacher.js

import React, { useState } from 'react';
import './ApplyTeacher.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { toast } from 'react-toastify'

const ApplyTeacher = () => {
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [grade, setGrade] = useState('');
  const dispatch = useDispatch();
  const clearData = () => {
    setSubject('');
    setQualification('');
    setGrade('');
  };

  const showToast = (t, m) => {
    if (t) {
      toast.success(m, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      return;
    } else {
      toast.error(m, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }

  }

  const submitData = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const values = {
      name: currentUser.name,
      subject,
      qualification,
      grade
    }
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/teacher/apply-as-teacher', values);
      dispatch(hideLoading());
      if (response.data.success) {
        showToast(true, `${response.data.message}`);
        clearData();
        return;
      } else {
        showToast(false, response.data.message);
        return;
      }

    } catch (error) {
      dispatch(hideLoading());
      showToast(false, 'Process Failed.');
    }
    
  };

  return (
    <div className="main-section apply-teacher-container">
      <h1>Apply as a Teacher</h1>
      <form className="apply-teacher-form">
        <div className="form-group">
          <label htmlFor="subject" className="label">
            Subject:
          </label>
          <select
            id="subject"
            className="select-field"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="qualification" className="label">
            Qualification:
          </label>
          <input
            type="text"
            id="qualification"
            className="input-field"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade" className="label">
            Grade:
          </label>
          <select
            id="grade"
            className="select-field"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Select Grade</option>
            <option value="OL">O/L</option>
            <option value="AL">A/L</option>
          </select>
        </div>

        <div className="buttons-container">
          <button type="button" className="clear-button" onClick={clearData}>
            Clear Data
          </button>
          <button type="button" className="submit-button" onClick={submitData}>
            Submit Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyTeacher;
