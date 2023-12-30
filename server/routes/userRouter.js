import express from 'express';
import User from '../models/userModal.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register',async(req,res)=>{
	
	try{
		const userExists = await User.findOne({email:req.body.email});
		if(userExists) return res.status(200).send({message:'User Already Exists.',success:false});
		const password = req.body.password;	
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password,salt);
		req.body.password =	hashedPassword; 
		const newUser = new User(req.body);
		await newUser.save();
		console.log('success');
		res.status(200).send({message:'Registration Process Successful.',success:true});
	}catch(error){
		console.log(error);
		res.status(500).send({message:'Error Creating User.',success:false});
	}

})

router.post('/login',async(req,res)=>{
	
	try{
		const user = await User.findOne({email:req.body.email});
		if(!user) return res.status(200).send({message:'User does not exist.',success:false});
		const isMatch = await bcrypt.compare(req.body.password,user.password);
		if(!isMatch) {
			return res.status(200).send({message:'Password is incorrect',success:false});
		}else{
			const token  = jwt.sign({id:user._id},process.env.JWT_SECRET,{
				expiresIn:'1d'
			})
			res.status(200).send({message:'Login successful',success:true,token:token})
		}
	}catch(error){
			console.log(error);
			res.status(500).send({message:'Error Login in',success:false})
	}

})

router.post('/get-user-info-by-id',auth,async(req,res)=>{
	try{
		const user = await User.findOne(({_id:req.body.userId}))	
		if(!user){
			res.status(200).send({message:'User Not Found',success:false});
		}else{
			res.status(200).send({success:true,user:{
				name:user.name,
				email:user.email,
				isTeacher:user.isTeacher,
				isAdmin:user.isAdmin,
			}})
		}
	}catch(error){

	}
})

router.post('/approve',async(req,res)=>{
		try{
		 await User.updateOne({name:req.body.teacherName},{$set:{'isTeacher':true}});
			res.status(200).send({success:true});
	}catch(error){
		console.log(error);
	res.status(500).send({message:'Process Failed',success:false})
	}

})



export default router
