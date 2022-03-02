const User = require('../model/User')

const getUserFromToken = async(decodedToken) => {
    return await User.findOne({ email: decodedToken.email })
 }

module.exports = {
    getUserFromToken,
}