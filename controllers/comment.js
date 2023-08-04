const Comment = require('../models/comment');
const Team = require('../models/team');
const Task = require('../models/task');

exports.addComment = (req, res, next) => {
    try {
        const user = req.id
        const { taskId, tag, file, createdAt, updatedAt, seenBy, message } = req.body

        const comment = new Comment({
            user: user,
            tag: tag,
            file: file,
            createdAt: createdAt,
            updatedAt: updatedAt,
            seenBy: seenBy,
            message: message,
            taskId: taskId
        })

        comment.save()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        message: "comment Added Successfully"
                    });
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })

    } catch (err) {
    }
};


exports.getComment = async (req, res, next) => {
    try {
        const { taskId } = req.body
        const Comments = await Comment.find({ taskId: taskId }).sort({ createdAt: -1 })
        const Task_ = await Task.findOne({ _id: taskId })
        let arr = []
        if (Comments.length) {
            const users = await Team.find({ _id: { $in: Comments.map(comment => comment.user) } });
            for (let i = 0; i < Comments.length; i++) {
                const comment = Comments[i];
                const user = users.find(u => u._id.toString() === comment.user.toString());
                const tag = comment.tag ? await Team.findById(comment.tag) : ""
                let obj = {
                    file: comment?.file,
                    seenBy: comment?.seenBy,
                    message: comment?.message,
                    user: user?.name,
                    tag: tag ? tag?.name?.split(' ')[0] : "",
                    createdOn: comment?.createdAt
                }
                arr.push(obj)
            }
            res.status(200).json({
                Task: Task_,
                data: arr
            });
        } else {
            res.status(200).json({
                Task: Task_,
                data: []
            });
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
