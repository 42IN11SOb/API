var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pepdagdates = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    plaats: {
        type: String,
        required: true
    },
    datum: {
        type: Date,
        required: true
    },
    man: {
    	type: Boolean,
    	required: true,
    	default: false
    }
});

var Pepdagdates = mongoose.model('Pepdagdates', pepdagdates);
