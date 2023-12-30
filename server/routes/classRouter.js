import express from 'express';
import Class from '../models/classModal.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-class',async(req,res)=>{
	try{
		const newClass = new Class(req.body);
		await newClass.save();
		res.status(200).send({message:'Class Created Successfully.',success:true});
	}catch(error){
		console.log(error);	
		res.status(500).send({message:'Error Applying Teacher.',success:false});
	}
})

router.post('/get-all-classes',auth,async(req,res)=>{
	try{
		const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}/${month}/${day}`;

        console.log(formattedDate);
        const classes = await Class.find({});
        const fc = classes.filter((c)=>{
            const cd = new Date(c.date);
            const fd = new Date(formattedDate)
            return cd >= fd;
        })
        console.log(classes);
        console.log(fc)
		res.status(200).send({success:true,classes:fc})
	}catch(error){
		console.log(error);
        res.status(500).send({success:false})
	}
})

export default router;