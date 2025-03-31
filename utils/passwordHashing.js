const bcrypt = require('bcrypt');

module.exports.hashPassword = (password)=>{
    let hash = bcrypt.hashSync(password,10);
    return hash;
}


module.exports.comparePassword = (password, hashedPassword)=>{
    let isMatch = bcrypt.compareSync(password,hashedPassword);
    return isMatch;
}


