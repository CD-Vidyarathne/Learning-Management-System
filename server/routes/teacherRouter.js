import express from 'express';
import Teacher from '../models/teacherModal.js';
//import User from '../models/UserModal.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply-as-teacher',async(req,res)=>{
	try{
		const newTeacher = new Teacher(req.body);
		await newTeacher.save();
		res.status(200).send({message:'Applied Successfully.',success:true});
	}catch(error){
		console.log(error);	
		res.status(500).send({message:'Error Applying Teacher.',success:false});
	}
})

router.post('/get-all-unverified-teachers',auth,async(req,res)=>{
	try{
		const teachers = await Teacher.find({isVerified:false});
		console.log(teachers);
		return res.status(200).send({success:true,teachers:teachers})
	}catch(error){
		console.log(error);
	}
})

router.post('/approve',async(req,res)=>{
	try{
		 await Teacher.updateOne({_id:req.body.teacherId},{$set:{'isVerified':true}});
		const teacher = await Teacher.findOne({_id:req.body.teacherId});
		res.status(200).send({message:'Teacher Approved',success:true});
	}catch(error){
		console.log(error);
	res.status(500).send({message:'Process Failed',success:false})
	}
})

export default router;
