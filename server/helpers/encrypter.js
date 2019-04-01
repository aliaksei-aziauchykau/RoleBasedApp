const bcrypt = require("bcrypt");
const appConfig = require("../configs/app.config");

class Encryptor {
    static hashPassword(user, next, toSave) {
        bcrypt.genSalt(appConfig.salt, function(err, salt){
            if(err) return next(err);
     
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
     
                user.password = hash;
                toSave(user);
            });
        });
    }

    static check(password, hash, callback) {
        bcrypt.compare(password, hash, function(error, result) {
            callback(result, error)
        });
    }
}

module.exports = Encryptor;