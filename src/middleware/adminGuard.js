module.exports = (req, res, next) => {
    const user = req.user;
    const userType = user.userType;
    if (userType === "0") {
        return next();
    }
    return res.status(401).json("Access denied, insufficient privileges");
}