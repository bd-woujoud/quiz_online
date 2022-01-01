
const jwt = require('jsonwebtoken')//methode de creation de jwt

const SignToken = (uid , role) => {
    return jwt.sign({
        id: uid,
        role  : role ,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });// sauvegarde de cle secret jwt_secret dans le dossier dotenv
}

const signTokenWithoutExpiration = (uid) => {

    return jwt.sign({
        id: uid
    }, process.env.JWT_SECRET);

}


module.exports = {
    SignToken,
    signTokenWithoutExpiration
}