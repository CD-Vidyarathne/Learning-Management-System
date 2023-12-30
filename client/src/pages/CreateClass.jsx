import React, { useState } from 'react';
import './CreateClass.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { toast } from 'react-toastify'
const CreateClass = () => {
  const [time, setTime] = useState('');
  const [grade, setGrade] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [subject, setSubject] = useState('');
    const dispatch = useDispatch();
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

  const clearData = () => {
    setSubject('');
    setTime('');
    setDate('');
    setLink('');
    setGrade('');
  };

  const submitData = async() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const values = {
        name:currentUser.name,
        subject,
        grade,
        time,
        date,
        link
      }
      try {
        dispatch(showLoading());
        const response = await axios.post('/api/class/add-class', values);
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
    <div className="main-section create-class-container">
      <h1>Create Class</h1>
      <form className="create-class-form">
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
        <div className="form-group">
          <label htmlFor="time" className="label">
            Time:
          </label>
          <input
            type="time"
            id="time"
            className="input-field"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="label">
            Date:
          </label>
          <input
            type="date"
            id="date"
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="joinLink" className="label">
            Join Link:
          </label>
          <input
            type="text"
            id="joinLink"
            className="input-field"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
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

export default CreateClass;