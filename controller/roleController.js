var Role = require('mongoose').model('Role');
var roleController = exports;

roleController.createRole = function addRole(role, callback) {
    var newRole = new Role();

    // set the user's local credentials
    newRole.name = role.name;
    newRole.parent = role.parent;
    newRole.users = role.users;

    // save the user
    newRole.save(function (err) {
        if (err)
            throw err;
        return callback(newRole);
    });
}

roleController.editRole = function editRole(role, callback) {

}

roleController.removeRole = function removeRole(role, callback) {

}

roleController.getRoles = function getRoles(callback) {
    Role.find().populate('users parent').exec(function (err, roles) {
        callback(roles);
    });
}

roleController.getRole = function getRole(id, callback) {
    Role.findOne({
        _id: id
    }).populate('users parent').exec(function (err, roles) {
        callback(roles);
    });
}
