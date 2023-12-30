
import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	subject:{
		type:String,
		required:true
	},
	qualification:{
		type:String,
		required:true
	},
	grade:{
		type:String,
		required:true
	},
	isVerified:{
		type:Boolean,
		default:false
	}
},{
	timestamps:true
})

const teacherModal = mongoose.model('teachers',teacherSchema);

export default teacherModal
