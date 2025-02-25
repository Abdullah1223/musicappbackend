

const Logout=(req,res)=>{
    res.clearCookie('token', {
        httpOnly: true, // Ensures it can only be accessed by the server
        secure: true, // Ensures it's only sent over HTTPS in production
        //sameSite:'Strict'
        sameSite: 'None', // Restrict the cookie to same-site requests
    });
    res.status(200).send({message:'LoggedOut'})
}

module.exports = Logout;