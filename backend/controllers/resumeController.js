const fs = require("fs");

const extractResumeText =
    require("../services/resumeParser");

const analyzeResume =
    require("../services/resumeAnalyzer");

const Resume =
    require("../models/Resume");


// ====================================
// Upload Resume
// ====================================

exports.uploadResume =
    async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "No resume uploaded"
            });
        }

        // Extract text
        const extractedText =
            await extractResumeText(
                req.file.path
            );

        // Analyze
        const analysis =
            await analyzeResume(
                extractedText
            );

        // Save
        const resume =
            await Resume.create({

                fileName:
                    req.file.filename,

                filePath:
                    req.file.path,

                extractedText,

                atsScore:
                    analysis.atsScore,

                skills:
                    analysis.skills,

                suggestions:
                    analysis.suggestions
            });

        res.status(201).json({

            success: true,

            message:
                "Resume uploaded and analyzed successfully",

            resumeId:
                resume._id,

            file: {

                originalName:
                    req.file.originalname,

                fileName:
                    req.file.filename,

                filePath:
                    req.file.path,

                fileSize:
                    req.file.size,

                mimeType:
                    req.file.mimetype
            },

            atsScore:
                analysis.atsScore,

            skills:
                analysis.skills,

            suggestions:
                analysis.suggestions,

            extractedText:
                extractedText.substring(
                    0,
                    1000
                )
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


// ====================================
// Get All Resumes
// ====================================

exports.getAllResumes =
    async (req, res) => {

    try {

        const resumes =
            await Resume
                .find()
                .sort({
                    createdAt: -1
                });

        res.status(200).json({

            success: true,

            count:
                resumes.length,

            resumes
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


// ====================================
// Get Resume By ID
// ====================================

exports.getResumeById =
    async (req, res) => {

    try {

        const resume =
            await Resume.findById(
                req.params.id
            );

        if (!resume) {

            return res.status(404).json({

                success: false,

                message:
                    "Resume not found"
            });
        }

        res.status(200).json({

            success: true,

            resume
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


// ====================================
// Delete Resume
// ====================================

exports.deleteResume =
    async (req, res) => {

    try {

        const resume =
            await Resume.findById(
                req.params.id
            );

        if (!resume) {

            return res.status(404).json({

                success: false,

                message:
                    "Resume not found"
            });
        }

        // Delete file
        if (
            fs.existsSync(
                resume.filePath
            )
        ) {

            fs.unlinkSync(
                resume.filePath
            );
        }

        // Delete database record
        await Resume.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message:
                "Resume deleted successfully"
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