var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passport = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    season: {
        type: Schema.Types.ObjectId,
        ref: 'Season'
    },
    figure: {
        type: Schema.Types.ObjectId,
        ref: 'Figure'
    }
});

var Passport = mongoose.model('Passport', passport);
