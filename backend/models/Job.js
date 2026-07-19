const mongoose =
    require("mongoose");

const jobSchema =
    new mongoose.Schema(

    {

        title: {
            type: String,
            required: true
        },

        company: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        salary: {
            type: String,
            default: "Negotiable"
        },

        employmentType: {
            type: String,
            default: "Full Time"
        },

        experience: {
            type: String
        },

        skills: [{
            type: String
        }],

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Open"
        }

    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Job",
        jobSchema
    );