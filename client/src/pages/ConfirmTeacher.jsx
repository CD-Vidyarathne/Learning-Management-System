import React, { useEffect, useState } from 'react';
import './ConfirmTeacher.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { hideLoading, showLoading } from '../redux/alertsSlice';
const ConfirmTeacher = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

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

    const getUnverifiedTeachers = async () => {
        try {
            console.log('getting teachers');
            const response = await axios.post('/api/teacher/get-all-unverified-teachers', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            setData(response.data.teachers);
            console.log(response.data.teachers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUnverifiedTeachers();
    }, [])

    const handleApprove = async (teacherId, teacherName) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/teacher/approve', { teacherId });
            const anResponse = await axios.post('/api/user/approve', { teacherName });
            dispatch(hideLoading());
            if (response.data.success) {
                showToast(true, `${response.data.message}`);
                const updatedTeachers = data.filter((teacher) => teacher.id !== teacherId);
                setData(updatedTeachers);
                return;
            } else {
                showToast(false, response.data.message);
                return;
            }
        } catch (error) {
            dispatch(hideLoading());
            showToast(false, 'Process Failed.');
            return;
        }

    };

    const handleReject = async (teacherId) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/teacher/reject', teacherId);
            dispatch(hideLoading());
            if (response.data.success) {
                showToast(true, `${response.data.message}`);
                const updatedTeachers = data.filter((teacher) => teacher.id !== teacherId);
                setData(updatedTeachers);

                return;
            } else {
                showToast(false, response.data.message);
                return;
            }
        } catch (error) {
            dispatch(hideLoading());
            showToast(false, 'Process Failed.');
            return;
        }

    };

    return (
        <div className="confirm-teacher-container main-section">
            <h1>Confirm Teacher</h1>
            <table className="teacher-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Qualification</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((teacher) => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.subject}</td>
                            <td>{teacher.grade}</td>
                            <td>{teacher.qualification}</td>
                            <td>
                                <button onClick={() => handleApprove(teacher._id, teacher.name)}>Approve</button>
                                <button onClick={() => handleReject(teacher._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConfirmTeacher;
