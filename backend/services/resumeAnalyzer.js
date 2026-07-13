const analyzeResume = async (resumeText) => {

    const text = resumeText.toLowerCase();

    let atsScore = 0;

    const skills = [];
    const suggestions = [];

    // ==========================
    // EDUCATION (20)
    // ==========================
    if (
        text.includes("degree") ||
        text.includes("graduate") ||
        text.includes("bsc") ||
        text.includes("honours") ||
        text.includes("university")
    ) {
        atsScore += 20;
    } else {
        suggestions.push(
            "Add educational qualifications"
        );
    }

    // ==========================
    // EXPERIENCE (20)
    // ==========================
    if (
        text.includes("experience") ||
        text.includes("intern") ||
        text.includes("present") ||
        text.includes("worked")
    ) {
        atsScore += 20;
    } else {
        suggestions.push(
            "Add work experience section"
        );
    }

    // ==========================
    // TECHNICAL SKILLS (25)
    // ==========================
    const technicalSkills = [
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "mysql",
        "java",
        "python",
        "html",
        "css",
        "bootstrap",
        "php",
        "figma",
        "git",
        "github",
        "wordpress"
    ];

    let technicalCount = 0;

    technicalSkills.forEach(skill => {

        if (text.includes(skill)) {

            skills.push(skill);
            technicalCount++;
        }
    });

    if (technicalCount >= 5)
        atsScore += 25;
    else if (technicalCount >= 3)
        atsScore += 20;
    else if (technicalCount >= 1)
        atsScore += 10;
    else
        suggestions.push(
            "Add more technical skills"
        );

    // ==========================
    // PROJECTS (15)
    // ==========================
    if (
        text.includes("project") ||
        text.includes("portfolio") ||
        text.includes("github")
    ) {

        atsScore += 15;

    } else {

        suggestions.push(
            "Add project experience section"
        );
    }

    // ==========================
    // CERTIFICATIONS (10)
    // ==========================
    if (
        text.includes("certificate") ||
        text.includes("certification") ||
        text.includes("diploma")
    ) {

        atsScore += 10;

    } else {

        suggestions.push(
            "Add certifications section"
        );
    }

    // ==========================
    // PROFESSIONAL SUMMARY (5)
    // ==========================
    if (
        text.includes("profile") ||
        text.includes("summary") ||
        text.includes("objective") ||
        text.includes("motivated")
    ) {

        atsScore += 5;

    } else {

        suggestions.push(
            "Add professional summary"
        );
    }

    // ==========================
    // ACHIEVEMENTS (5)
    // ==========================
    if (
        text.includes("award") ||
        text.includes("achievement") ||
        text.includes("honours")
    ) {

        atsScore += 5;

    } else {

        suggestions.push(
            "Add measurable achievements"
        );
    }

    // ==========================
    // SOFT SKILLS
    // ==========================
    const softSkills = [
        "communication",
        "leadership",
        "teamwork",
        "problem solving",
        "coordination",
        "administration",
        "organizational"
    ];

    softSkills.forEach(skill => {

        if (text.includes(skill)) {

            skills.push(skill);
        }
    });

    // Remove duplicates
    const uniqueSkills =
        [...new Set(skills)];

    return {

        atsScore,

        skills:
            uniqueSkills,

        suggestions
    };
};

module.exports =
    analyzeResume;