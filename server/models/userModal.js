import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	isTeacher:{
		type:Boolean,
		default:false,
	},
	isAdmin:{
		type:Boolean,
		default:false,
	}
},{
	timestamps:true
})

const userModal = mongoose.model('users',userSchema);

export default userModal
