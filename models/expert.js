var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var expertSchema = new Schema({
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    numtel: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

expertSchema.pre('save', function (next) {
    var expert = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(expert.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                expert.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

expertSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('expert', expertSchema) //here we change the name of collection (admins or experts or users)

