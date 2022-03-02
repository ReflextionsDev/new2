const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    post: { type: String, require: true },
    commentHistory: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
    owner: { type: mongoose.Schema.ObjectId, ref: "user" }
},
    { timestamps: true}
)

module.exports = mongoose.model('post', postSchema)