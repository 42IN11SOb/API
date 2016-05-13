var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
            required: true
    },
    content: {
        type: String,
        required: true
    }
});

var Page = mongoose.model('Page', pageSchema);
