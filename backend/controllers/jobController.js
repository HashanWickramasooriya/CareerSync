const Job =
    require("../models/Job");

const Resume =
    require("../models/Resume");

const calculateMatch =
    require(
        "../services/jobMatcher"
    );


// ======================================
// Create Job
// ======================================

exports.createJob =
    async (req, res) => {

    try {

        const job =
            await Job.create(
                req.body
            );

        res.status(201).json({

            success: true,

            message:
                "Job created successfully",

            job
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};


// ======================================
// Get All Jobs
// ======================================

exports.getAllJobs =
    async (req, res) => {

    try {

        const jobs =
            await Job
                .find()
                .sort({
                    createdAt: -1
                });

        res.status(200).json({

            success: true,

            count:
                jobs.length,

            jobs
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};


// ======================================
// Get Job By ID
// ======================================

exports.getJobById =
    async (req, res) => {

    try {

        const job =
            await Job.findById(
                req.params.id
            );

        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found"
            });
        }

        res.status(200).json({

            success: true,

            job
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};


// ======================================
// Delete Job
// ======================================

exports.deleteJob =
    async (req, res) => {

    try {

        const job =
            await Job.findById(
                req.params.id
            );

        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found"
            });
        }

        await Job.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message:
                "Job deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};


// ======================================
// AI Job Matching
// ======================================

exports.matchJobs =
    async (req, res) => {

    try {

        const resume =
            await Resume.findById(
                req.params.resumeId
            );

        if (!resume) {

            return res.status(404).json({

                success: false,

                message:
                    "Resume not found"
            });
        }

        const jobs =
            await Job.find();

        const matchedJobs =
            jobs.map(job => {

                const matchPercentage =
                    calculateMatch(

                        resume.skills,

                        job.skills
                    );

                return {

                    jobId:
                        job._id,

                    title:
                        job.title,

                    company:
                        job.company,

                    location:
                        job.location,

                    skills:
                        job.skills,

                    matchPercentage
                };
            });

        matchedJobs.sort(

            (
                a,
                b
            ) =>

            b.matchPercentage -
            a.matchPercentage
        );

        res.status(200).json({

            success: true,

            resumeSkills:
                resume.skills,

            matchedJobs
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};