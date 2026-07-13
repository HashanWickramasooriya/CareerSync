const express =
    require("express");

const router =
    express.Router();

const {

    createJob,

    getAllJobs,

    getJobById,

    deleteJob,

    matchJobs

} = require(
    "../controllers/jobController"
);


// Create Job
router.post(
    "/create",
    createJob
);


// Get All Jobs
router.get(
    "/all",
    getAllJobs
);


// AI Job Matching
router.get(
    "/match/:resumeId",
    matchJobs
);


// Get Job By ID
router.get(
    "/:id",
    getJobById
);


// Delete Job
router.delete(
    "/:id",
    deleteJob
);

module.exports =
    router;