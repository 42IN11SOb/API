var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    male: {
        type: Boolean,
        required: true,
        default: false
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    mustResetPassword: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: Boolean,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: "574c284cbc1dbc594b03e288"
    },
    passport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passport'
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
