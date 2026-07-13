const express = require("express");

const router = express.Router();

const {
    profile,
} = require(
    "../controllers/userController"
);

const {
    protect,
} = require(
    "../middleware/authMiddleware"
);

const {
    authorize,
} = require(
    "../middleware/roleMiddleware"
);

router.get(
    "/profile",
    protect,
    profile
);

router.get(
    "/admin",
    protect,
    authorize("admin"),
    (req, res) => {

        res.json({
            success: true,
            message:
                "Admin Dashboard",
        });

    }
);

module.exports = router;