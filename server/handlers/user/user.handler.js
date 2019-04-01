const express = require("express");
const router = express.Router();
const dbHandler = require("../db/db.handler");
const stripeHandler = require("../stripe/stripe.handler");
const configProvider = require("../../helpers/config.provider");

router.get("/", (request, response, next) => {

    if(request.query.code) {

        const updateStripeDetailsByUserId = (updateData) => dbHandler.updateByQuery(
            { userId: request.session.userId }, 
            Object.assign(updateData, { userId: request.session.userId }),
            schemes => schemes.StripeDetailSchema
        );
        
        updateStripeDetailsByUserId({ token: request.query.code });
        stripeHandler.linkAccount({
            client_secret: configProvider.config.stripePrivateKey, 
            code: request.query.code
        }, data => updateStripeDetailsByUserId({ 
            stripeUserId: data.stripe_user_id, 
            accessToken: data.access_token 
        }));

        response.redirect("/user");
        return;
    }

    next();
});


module.exports = router;