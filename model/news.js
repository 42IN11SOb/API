var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String
    },
    publish: {
        type: Boolean,
        required: true,
        default: false
    }
});

var News = mongoose.model('News', NewsSchema);
