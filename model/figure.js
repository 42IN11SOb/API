var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var figure = new Schema({
    figure: {
        title: {
            type: String,
            required: true
        },
        advice: {
            type: String,
            required: true
        },
        dos: {
            type: [String],
            required: true
        },
        donts: {
            type: [String],
            required: true
        },
        img: {
            type: String,
            required: true
        },
    }
});

var Figure = mongoose.model('Figure', figure);