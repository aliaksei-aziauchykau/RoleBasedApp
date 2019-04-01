const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    if(request.session) {
        response.status(200).json({
            userId: request.session.userId
        })
    } else {
        response.status(404).json();
    }
});

module.exports = router;