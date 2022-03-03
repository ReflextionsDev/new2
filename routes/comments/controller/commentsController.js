const Comment = require('../model/Comment')
const Post = require('../../posts/model/Post')
const { getUserFromToken } = require('../../users/utils/userFunctions')

const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body
        const user = await getUserFromToken(res.locals.decodedToken)
        const post = await Post.findById(postId)

        let newComment = new Comment({
            comment: comment,
            post: post._id,
            owner: user._id
        })
        const savedComment = await newComment.save()

        user.commentHistory.push(savedComment.id)
        await user.save()

        post.commentHistory.push(savedComment.id)
        await post.save()

        res.status(200).json(
            {
                message: "New comment has been saved",
                payload: newComment,
                user: user,
                post: post
            })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateComment = async (req, res) => {
    try {
        const { commentId, comment } = req.body
        
        const user = await getUserFromToken(res.locals.decodedToken)

        const commentObj = await Comment.findById(commentId)
        if (commentObj === null) throw { message: "Comment not found" }

        if (commentObj.owner.toString() !== user._id.toString()) throw { message: "You don't have permission for this."}

        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true })

        res.status(200).json({ Message: "Post has been updated", payload: updatedComment })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllComments = async (req, res) => {
    try {

        const allComments = await Comment.find()
        res.status(200).json({ message: "All Comments", payload: allComments })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {

        // Get comment
        const { id } = req.params
        const comment = await Comment.findById(id)
        if (comment === null) throw { message: "Comment not found" }

        // Pull comment from user
        const user = await getUserFromToken(res.locals.decodedToken)

        console.log(comment.owner)
        console.log(user._id)
        if (comment.owner.toString() !== user._id.toString()) throw { message: "You don't have permission for this."}
        user.commentHistory.pull(id)
        await user.save()

        // Pull comment from post
        const post = await Post.findById(comment.post)
        post.commentHistory.pull(id)
        await post.save()

        // Delete comment
        await Comment.findByIdAndDelete(id)

        res.status(200).json({ "Deleted comment": comment, "Comment removed from user": user, "Comment removed from post": post })
        // res.send("YOO!")

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createComment,
    updateComment,
    getAllComments,
    deleteComment
}