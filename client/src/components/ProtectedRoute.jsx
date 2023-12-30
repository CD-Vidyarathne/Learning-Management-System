import {Navigate} from 'react-router-dom'
import Navbar from '../components/Navbar'

const ProtectedRoute = (props)=>{
	if(localStorage.getItem('token')){
		return (
			<>
				<Navbar/>
				{props.children}
			</>
		);
	}else{
		return <Navigate to='/login'/>;	
	}
}

export default ProtectedRoute;
