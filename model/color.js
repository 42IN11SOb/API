var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    r: {
        type: Number,
        required: true
    },
    g: {
        type: Number,
        required: true
    },
    b: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

var Color = mongoose.model('Color', colorSchema);
