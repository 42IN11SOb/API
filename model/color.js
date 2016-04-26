var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorSchema = new Schema({
	r : {type: Number, required: true},
	g : {type: number, required: true},
	b : {type: number, required: true},
});

var Color	= mongoose.model('Color', colorSchema);