const Post = require('../model/Post')
const { getUserFromToken } = require('../../users/utils/userFunctions')
const { userLogin } = require('../../users/controller/usersController')

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
        // Get post and owner
        const { postId, title, post } = req.body
        const postObj = await Post.findById(postId)
        const postOwner = await getUserFromToken(res.locals.decodedToken)

        // Error handling
        if (post === null) throw { message: "Post not found" }
        if (postObj.owner.toString() !== postOwner._id.toString()) throw { message: "You do not have permission for this" }

        // Update post and return       
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true })
        res.status(200).json({ Message: "Post has been updated", payload: updatedPost })

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
        const post = await Post.findById(id)
        const postOwner = await getUserFromToken(res.locals.decodedToken)

        if (post === null) throw { message: "Post not found" }

        if (post.owner.toString() !== postOwner._id.toString()) throw { message: "You do not have permission for this" }

        postOwner.postHistory.pull(id)
        await postOwner.save()

        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(200).json({ "Deleted post": deletedPost, "Post removed from user": postOwner })
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