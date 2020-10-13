var mongoose = require("../config/mongooseConnection");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var usuarioSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    }
}, {
    collection: 'users'
},
    {strict: false}
);

usuarioSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})
usuarioSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch)
    })
}
var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports.Usuario = Usuario;
