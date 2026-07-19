exports.profile = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected Route Accessed",
        user: req.user,
    });

};