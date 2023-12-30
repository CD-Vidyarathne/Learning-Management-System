import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
	subject:{
		type:String,
		required:true
	},
	grade:{
		type:String,
		required:true
	},
    time:{
		type:String,
		required:true
	},
    date:{
		type:String,
		required:true
	},
    link:{
		type:String,
		required:true
	},
},{
	timestamps:true
})

const classModal = mongoose.model('classes',classSchema);

export default classModal