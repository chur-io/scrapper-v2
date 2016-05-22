'use strict';

//
// We should store all of our shared schemas in one place
//

const Joi = require('joi');

module.exports.Error = Joi.object({
    error: {
        msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
        type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
    }
}).label('Error');

module.exports.BasicPayload = Joi.object({
    open:   Joi.string().required().uri().example('http://nz.indeed.com/'),
    actions: Joi.array().items(
        Joi.object().keys({
            'type': Joi.string().required(),
            'selector': Joi.string(),
            'text': Joi.string()
        }
    )).optional(),
    results: Joi.array().items(
        Joi.object().keys({
            'type': Joi.string().required(),
            'selector': Joi.string()
        })
    )
});

module.exports.BasicResult = Joi.object({
    results: Joi.any()
});

