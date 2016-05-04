var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
});

var Role = mongoose.model('Role', roleSchema);
