const express = require("express");
const router = express.Router();
const mapper = require("../helpers/mapper");
const database = require("../db/database");
const encryptor = require("../helpers/encrypter");

router.post("/login", (request, response) => {
    const UserModel = database.models.User;
    const UserSchema = database.schemes.UserSchema;
    let user = new UserModel();

    mapper.mapProperties(request.body, user);
    UserSchema.findOne({ email: user.email }, (error, dbUser) => {
        const isAuth = false;
        if (!dbUser) {
            return response.json({ isAuth: isAuth, error: "User is not found" });
        }
        encryptor.check(user.password, dbUser.password, (result, error) => {
            if (error) {
                return response.json({ isAuth: isAuth, error: "Server error" });
            }

            if (result) {
                request.session.userId = dbUser._id;
                response.cookie("logged", true);
                response.cookie("userId", dbUser._id);
                response.json({ isAuth: true, nickName: dbUser.nickName, error: null });
            } else {
                response.json({ isAuth: false, error: "Wrong email or password" });
            }

        });
    });
});

router.post("/logout", (request, response) => {
    request.session.destroy(error => {
        if(error) {
            // ew
        }
        // 
    });
    response.cookie("logged", false);
    response.json({isAuth: false, error: null});
});

router.post("/registration", (request, response, next) => {
    const UserModel = database.models.User;
    const UserSchema = database.schemes.UserSchema;
    let user = new UserModel();
    mapper.mapProperties(request.body, user);
    UserSchema.findOne({ email: user.email }, (error, data) => {
        if(data) return response.json({error: "Email already exist"});
        encryptor.hashPassword(user, next, (user) => {
            new UserSchema(user).save((error) => {
                error ? response.json({message: "Error"}) : response.json({message: null});
            });
        });
    });
});


module.exports = router;