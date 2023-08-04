exports.getPosts = (req, res, next) => {
    res.status(200).json({
        data: [
            {
                name: "Approval"
            },
            {
                name: "working on it"
            },
            {
                name: "stuck"
            },
            {
                name: "Done"
            }
        ]
    });
};
