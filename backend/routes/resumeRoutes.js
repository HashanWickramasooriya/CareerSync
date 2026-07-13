const express =
    require("express");

const router =
    express.Router();

const upload =
    require(
        "../config/multer"
    );

const {

    uploadResume,

    getAllResumes,

    getResumeById,

    deleteResume

} = require(
    "../controllers/resumeController"
);


// Upload
router.post(
    "/upload",
    upload.single(
        "resume"
    ),
    uploadResume
);


// Get all resumes
router.get(
    "/all",
    getAllResumes
);


// Get resume by id
router.get(
    "/:id",
    getResumeById
);


// Delete resume
router.delete(
    "/:id",
    deleteResume
);


module.exports =
    router;