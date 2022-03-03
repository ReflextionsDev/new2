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
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true })
        res.status(200).json({ Message: "Post has been updated", payload: updatedComment })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllComments = async (req, res) => {
    try {

        const allPosts = await Post.find()
        res.status(200).json({ message: "All Posts", payload: allPosts })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params

        const deletedPost = await Post.findByIdAndDelete(id)
        if (deletedPost === null) throw { message: "Post not found" }

        const postOwner = await getUserFromToken(res.locals.decodedToken)
        postOwner.postHistory.pull(id)
        await postOwner.save()

        res.status(200).json({ "Deleted comment": deletedPost, "Post removed from user": postOwner })
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