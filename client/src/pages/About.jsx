import { Link } from 'react-router-dom'; 
import './About.css';

const Member = ({ name, role, description }) => {
  return (
    <div className="member">
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{description}</p>
    </div>
  );
};

const About = () => {
  const members = [
    {
      name: 'Chamindu Vidyarathne',
      role: 'KADSE222F - 048',
      description: 'Project Leader - 0716935097',
    },
    {
      name: 'Chamathka Nipuni ',
      role: 'KADSE222F - 026',
      description: 'Frontend & Database',
    },
    {
      name: 'Thisaru Gimhana',
      role: 'KADSE222F - 050',
      description: 'Frontend & Backend',
    },
    {
      name: 'Hashen Tharusha',
      role: 'KADSE222F - 009',
      description: 'Frontend',
    },
  ];

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="members-container">
        {members.map((member, index) => (
          <Member key={index} {...member} />
        ))}
      </div>
      <Link to="/" className="back-button">
        Back to Homepage
      </Link>
    </div>
  );
};

export default About;
