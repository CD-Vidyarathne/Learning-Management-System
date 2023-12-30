import { useState } from "react"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Authentication.css'
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from "../redux/alertsSlice"
const Login = ()=>{
	
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const navigate = useNavigate();

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
	  if(email==='' || password===''){
		  showToast(false,'Please Enter All the Details.');
		  return;
	  }
	  const values = {
		  email,
		  password
	  }

	  try{
		dispatch(showLoading());	
		const response = await axios.post('/api/user/login',values);
		dispatch(hideLoading());
		  if(response.data.success){
			showToast(true,`${response.data.message} Redirecting to home page....`);
				localStorage.setItem('token',response.data.token);
			navigate('/');
			return;
		  }else{
			showToast(false,response.data.message);
			  return;
		  }
	  }catch(error){
		  dispatch(hideLoading());
			showToast(false,'Login Process Failed.');
		  return;
	  }

  };

	return(
		<div className='mid-container'>
     <div className='authentication'>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Login</button>
      </form>
		 <Link to='/register'>New to eLearn ? Register Now.</Link>
    </div>		
		</div>	
	)
}

export default Login
