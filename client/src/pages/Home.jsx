
import './Home.css'
import {useNavigate} from 'react-router-dom'
const Home = ()=>{
	
	const navigate = useNavigate();


	return(
		<div className='main-section'>
			    <div className='mid-container home-cont'>
      <h1 className='home-title'>Welcome to eLearn!</h1>
      <p className='home-p'>Learning for everyone.</p>
					<button className='home-b' onClick={()=>navigate('/about')}>About Us</button>
    </div>
		</div>
	)
}

export default Home;
