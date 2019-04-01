

module.exports = function (request, response, next) {

    if (!request.session || !request.session.userId) {
        response.cookie("logged", false);
        response.redirect("/login");
        return;
    } else {
        next();
    }
}
  