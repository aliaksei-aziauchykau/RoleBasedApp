module.exports = {
    session: {
        secret: "ShowMustGoOn",
        key: "sid",
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 60000 * 60 * 2
        }
    },
    external: {},
    salt: 10
}