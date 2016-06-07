var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pepdag = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    naam: {
        type: String,
        required: true,
        unique: true
    },
    telefoonnummer: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    geboortedatum: {
        required: true,
        type: Date
    },
    voorkeursdatum: {
        type: Schema.Types.ObjectId,
        ref: 'pepdagdates'
    }
});

var Pepdag = mongoose.model('Pepdag', pepdag);
