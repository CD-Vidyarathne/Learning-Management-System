import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import {ToastContainer} from 'react-toastify'
import {useSelector} from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import About from './pages/About.jsx'
import ApplyTeacher from './pages/ApplyTeacher.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ConfirmTeacher from './pages/ConfirmTeacher.jsx'
import CreateClass from './pages/CreateClass.jsx'
import Classes from './pages/Classes.jsx'

function App() {
	const {loading} = useSelector(state=>state.alerts);
	const [start, setStart] = useState(false)
	const getData = async()=>{
		setStart(true);
		try{
			const response = await axios.post('/api/user/get-user-info-by-id',
			{},	
			{
				headers:{
					Authorization:'Bearer ' + localStorage.getItem('token')
				}
			})
			
			localStorage.setItem('user',JSON.stringify(response.data.user));
		}catch(error){
			console.log(error);	
		}
		setStart(false);
	}

	useEffect(()=>{
		getData();
	},[])

  return (
	  <>
		<BrowserRouter>

			{
				loading && <div className='loader-parent'>
				<div className="loader"></div>
				<p className='loading'>Loading...</p>
			</div>

			}			
			<ToastContainer/>
			{start ? <div className='loader-parent'>
				<div className="loader"></div>
				<p className='loading'>Loading...</p>
			</div> : 			<Routes>
				<Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
				<Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
				<Route path = '/' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
				<Route path = '/apply-teacher' element = {<ProtectedRoute><ApplyTeacher/></ProtectedRoute>}/>
				<Route path='/about' element = {<About/>}/>
				<Route path = '/confirm-teacher' element = {<ProtectedRoute><ConfirmTeacher/></ProtectedRoute>}/>
				<Route path = '/create-class' element = {<ProtectedRoute><CreateClass/></ProtectedRoute>}/>
				<Route path = '/classes' element = {<ProtectedRoute><Classes/></ProtectedRoute>}/>
			</Routes>}

		</BrowserRouter>
	  </>
  );
}

export default App;
