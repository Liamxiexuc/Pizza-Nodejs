module.exports = (req, res, next) => {
    console.log(req);
    const user = req.user;
    console.log(user);
    const userType = user.userType;
    if (userType === "0") {
        return next();
    }
    return res.status(401).json("Access denied, insufficient privileges");
}