import { useEffect } from 'react';
import './Navbar.css'; 
import {Link,useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  
  setTimeout(()=>{if(!currentUser)window.location.reload(false)},2000)

  const studentMenu = [   { text: 'Classes', link: '/classes' },
    { text: 'Apply as a Teacher', link: '/apply-teacher' },
  ];
  
  const teacherMenu = [
    { text: 'Create Class', link: '/create-class' },
  ];
  
  const adminMenu = [
    { text: 'Confirm Teacher', link: '/confirm-teacher' },
  ];

  const getMenu = ()=>{
    if(currentUser?.isAdmin){
      return adminMenu;
    }else if(currentUser?.isTeacher){
      return teacherMenu;
    }else{
      return studentMenu;
    }
  }

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
	  <>
<div className='hr-line'>{`${currentUser?.name}`}</div>
		<div className="navbar">
      <div className="logo">eLearn</div>
      <div className="nav-links">
        <div className="nav-link"><Link to='/'>Home</Link></div>
        {getMenu()?.map((el,i)=>{
         return <div className="nav-link" key={i}><Link to={`${el.link}`}>{el.text}</Link></div>
        })}
        <div className="nav-link logout" onClick={handleLogout}>Logout</div>
      </div>
    </div>
	  </>
      );
};

export default Navbar;
