const joi = require('@hapi/joi')

const validatecondidature = data => {

    const schema = joi.object({

        name: joi
            .string()
            .required()
        ,

        lastname: joi

            .string()
            .required()
        ,

        email: joi
            .string()
            .email()
            .required()
        ,

        phone: joi
            .string()
            .length(8)
            .pattern(/^[0-9]+$/)
            .required(),

        


        offre: joi
            .string()


    })

    return schema.validate(data, { abortEarly: false })

}

module.exports = {
    validatecondidature
}