var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id : Schema.Types.ObjectId,
	username : {type: String, required: true},
	password : {type: String, required: true},
	active : {type: Boolean, required: true, default: false},
	mustResetPassword : {type: Boolean, required: true, default: false},
	email : {type: Boolean, required: true},
	role : { type: Schema.Types.ObjectId, ref: 'User' }
});

var User	= mongoose.model('User', userSchema);