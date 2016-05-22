'use strict';

const Joi           = require('joi');
const Handlers      = require('../handlers/basic');
const SCHEMAS       = require('../lib/schemas');

const API_BASE_PATH = '/api/basic';

const routes = [];

// GET /api/basic/scrape
routes.push({
    method: 'POST',
    path: API_BASE_PATH + '/scrape',
    config: {
        auth: false,
        handler: Handlers.handlers.basic,
        description: 'scrape a basic web page',
        notes: 'first end point',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': { description: 'Success', schema: Joi.object({
                        results: SCHEMAS.BasicResult.label('Response')
                    }).label('Response') },
                    '400': { description: 'Bad Request', schema: SCHEMAS.Error }
                },
                security: {}
            }
        },
        tags: ['api'],
        validate: {
            payload: SCHEMAS.BasicPayload
        },
        response: {
            schema: SCHEMAS.BasicResult.label('Response')
        }
    }
});

module.exports = routes;
