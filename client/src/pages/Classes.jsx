
import { useEffect, useState } from 'react';
import './Classes.css';
import axios from 'axios';

const Classes = () => {
    const [data, setData] = useState([])
    const getAllClasses = async () => {
        try {
            const response = await axios.post('/api/class/get-all-classes', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            setData(response.data.classes);
            console.log(response.data.classes);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClasses();
    }, [])

  const openLinksMessage = "Note: All join links will be open 30 minutes before the class.";

  return (
    <div className="classes-container main-section">
      <h1>Classes</h1>
      <p className="open-links-message">{openLinksMessage}</p>
      <table className="classes-table">
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Time</th>
            <th>Date</th>
            <th>Join Link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.name}</td>
              <td>{classItem.subject}</td>
              <td>{classItem.grade}</td>
              <td>{classItem.time}</td>
              <td>{classItem.date}</td>
              <td><a className='join-link' href={classItem.joinLink} target="_blank" rel="noopener noreferrer">Join</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;
