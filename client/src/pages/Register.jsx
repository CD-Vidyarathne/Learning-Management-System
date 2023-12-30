import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Authentication.css'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from "../redux/alertsSlice"

const Register = ()=>{

	const navigate = useNavigate();
	const dispatch = useDispatch();	
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const showToast = (t,m)=>{
		if(t){
			toast.success(m,{
				position:toast.POSITION.BOTTOM_RIGHT
			})
			return;
		}else{
	    toast.error(m, {
			position: toast.POSITION.BOTTOM_RIGHT,
		 })
		}
		
	}
	

  const handleSubmit = async(e) => {
    e.preventDefault();
	  if(name==='' || email==='' || password===''){
		  showToast(false,'Please Enter All the Details.')
		  return;
	  }

	  const values = {
		  name,
		  email,
		  password
	  }

	  try{
		dispatch(showLoading());	
		const response = await axios.post('/api/user/register',values);
		dispatch(hideLoading());	
		  if(response.data.success){
			showToast(true,`${response.data.message} Redirecting to login page....`);
			navigate('/login');
			return;
		  }else{
			showToast(false,response.data.message);
			  return;
		  }
	  }catch(error){
		  dispatch(hideLoading());
			showToast(false,'Registration Process Failed.');
		  return;
	  }
  };

	return(
		<div className='mid-container'>
     <div className='authentication'>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Register</button>
      </form>
		<Link to='/login'>Already have an account ? Please Login</Link>
    </div>		
		</div>	
	)
}

export default Register
