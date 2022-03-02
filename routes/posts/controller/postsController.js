const Post = require('../model/Post')
const User = require('../../users/model/User')

const { getUserFromToken } = require('../../users/utils/globalFunctions')

const createPost = async (req, res) => {
    try {
        const postOwner = await getUserFromToken(res.locals.decodedToken)
        const { title, post } = req.body

        let newPost = new Post ({
            title: title,
            post: post,
            commentHistory: [],
            owner: postOwner._id
        })

        let savedPost = await newPost.save()

        res.status(200).json({ message: "New post has been saved", payload: savedPost})

    } catch (error) {
        res.status(500).json({error: error.message})
    }    
}

const updatePost = async (req, res) => {
    
}

const getAllPosts = async (req, res) => {
    
}

const deletePost = async (req, res) => {
    
}



module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    deletePost
}