const Post = require('../model/Post')
const User = require('../../users/model/User')

const { getUserFromToken } = require('../../users/utils/globalFunctions')
const { findByIdAndDelete } = require('../model/Post')

const createPost = async (req, res) => {
    try {
        const postOwner = await getUserFromToken(res.locals.decodedToken)
        const { title, post } = req.body

        let newPost = new Post({
            title: title,
            post: post,
            commentHistory: [],
            owner: postOwner._id
        })

        let savedPost = await newPost.save()

        postOwner.postHistory.push(savedPost.id)
        await postOwner.save()
        console.log(postOwner)
        console.log(savedPost)

        res.status(200).json({ message: "New post has been saved", payload: savedPost })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId, title, post } = req.body
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true })
        res.status(500).json({ Message: "Post has been updated", payload: updatedPost })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllPosts = async (req, res) => {
    try {

        const allPosts = await Post.find()
        res.status(200).json({ message: "All Posts", payload: allPosts })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const deletedPost = await Post.findByIdAndDelete(id)
        if (deletedPost === null) throw { message: "Post not found"}

        const postOwner = await getUserFromToken(res.locals.decodedToken)
        postOwner.postHistory.pull(id)
        await postOwner.save()

        res.status(200).json({ "Deleted post": deletedPost, "Post removed from user": postOwner})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    deletePost
}