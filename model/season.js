var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seasonSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    colors: [{
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color'
        }
    }]
});

seasonSchema.path('name').required(true, 'Name must be set');

var Season = mongoose.model('Season', seasonSchema);
