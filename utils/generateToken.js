const jwt = require('jsonwebtoken');
const genarateToken = (user)=>{
    let token = jwt.sign({id:user._id, email: user.email}, process.env.JWT_KEY,{expiresIn:'1h'});
    return token


}

module.exports = genarateToken