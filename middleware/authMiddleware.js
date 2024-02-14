const authenticate = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = authenticate;
