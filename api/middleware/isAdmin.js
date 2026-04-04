const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json("Access denied");
    }
    next();
};
export default isAdmin;