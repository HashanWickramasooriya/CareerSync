const calculateMatch =
    (
        resumeSkills,
        jobSkills
    ) => {

    let matched = 0;

    resumeSkills
        .forEach(skill => {

        if (

            jobSkills.includes(
                skill
            )

        ) {

            matched++;
        }
    });

    const percentage =
        Math.round(

            (
                matched /
                jobSkills.length
            ) * 100

        );

    return percentage;
};

module.exports =
    calculateMatch;