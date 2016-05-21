'use strict';

const Promise = require('promise');
// const _ = require('lodash');
const Horseman = require('node-horseman');
const Co = require('co');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

Lib.processHorseman = function (url, actions, results) {

    return new Promise((resolve, reject) => {

        const horseman = new Horseman();

        Co(function* () {

            yield horseman.open(url);

            let i = 0;
            while (i < actions.length) {
                switch (actions[i].type) {
                    case 'click':
                        yield horseman.click(actions[i].selector);
                        break;
                    case 'type':
                        yield horseman.type(actions[i].selector, actions[i].text, actions[i].options);
                        break;
                    case 'waitForNextPage':
                        yield horseman.waitForNextPage();
                        break;
                };
                i++;
            }

            let j = 0;
            while (j < results.length) {
                switch (results[j].type) {
                    case 'text':
                        results[j].result = yield horseman.text(results[j].selector);
                        break;
                    case 'html':
                        results[j].result = yield horseman.html(results[j].selector);
                        break;
                };
                j++;
            }
            yield horseman.close();
            resolve(results);
        });
    });
};

// hapi route handler
// only this function can call reply
Handlers.basic = function basic(req, reply) {

    // call business function
    Lib.processHorseman(req.payload.open, req.payload.actions, req.payload.results).done((products) => {
        // api success
        reply({ result: products }).code(200);
    }, (err) => {
        // api error
        reply(err).code(400);
    });
};

module.exports = {
    handlers: Handlers,
    // we only export lib for tests
    lib: (process.env.NODE_ENV === 'test') ? Lib : null
};
