const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractResumeText = async (filePath) => {

    try {

        const extension =
            path.extname(filePath)
                .toLowerCase();

        // PDF
        if (extension === ".pdf") {

            const buffer =
                fs.readFileSync(
                    filePath
                );

            const data =
                await pdf(buffer);

            return data.text;
        }

        // DOCX
        if (extension === ".docx") {

            const result =
                await mammoth
                    .extractRawText({
                        path: filePath
                    });

            return result.value;
        }

        throw new Error(
            "Unsupported file format"
        );

    } catch (error) {

        console.error(
            "Resume Parse Error:",
            error
        );

        throw error;
    }
};

module.exports =
    extractResumeText;