var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seasonSchema = new Schema({
	name : {type: String, required: true},
	colors: [{
		color: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'SeasonColor'
		},
	}]
});

seasonSchema.path('name').required(true, 'Name must be set');

var Season	= mongoose.model('Season', seasonSchema);