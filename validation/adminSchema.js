const joi = require('@hapi/joi')

const validateadmin = data => {

    const schema = joi.object({


        email: joi
            .string()
            .email()
            .required()
            
            
        ,

        password: joi
            .string()
            .min(6)
            .alphanum()
            .required()

    })

    return schema.validate(data, { abortEarly: false })

}


    
const ValidateResetPasswordData = data => {
    const schema = joi.object({
        password: joi
            .string()
            .min(6)
            .alphanum()
            .required()
        ,
        confirm: joi
            .string()
            .min(6)
            .alphanum()
            .required()
    })


    return schema.validate(data, { abortEarly: false })

}

module.exports = {
    validateadmin,
    ValidateResetPasswordData
}