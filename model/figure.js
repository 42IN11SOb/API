var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var figure = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: String
    },
    advice: {
        type: String
    },
    dos: {
        type: [String]
    },
    donts: {
        type: [String]
    },
    img: {
        type: String
    },
});

var Figure = mongoose.model('Figure', figure);
