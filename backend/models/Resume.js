const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        extractedText: {
            type: String,
            required: true
        },

        atsScore: {
            type: Number,
            default: 0
        },

        skills: [
            {
                type: String
            }
        ],

        suggestions: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Resume",
    resumeSchema
);