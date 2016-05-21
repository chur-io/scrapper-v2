'use strict';

// requires for testing
const Code      = require('code');
const expect    = Code.expect;
const Lab       = require('lab');
const lab       = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe  = lab.describe;
const it        = lab.it;

// we require the handlers directly, so we can test the "Lib" functions in isolation
const BasicHandlers = require('../../handlers/basic');

describe('unit tests - basic lib', { timeout: 10000 }, () => {

    it('should return scrapped results', (done) => {

        const actions = [
            { 'type': 'type', selector: 'input[name="q"]', 'text': 'angular' },
            { 'type': 'click', selector: '#fj' },
            { 'type': 'waitForNextPage' }
        ];

        const results = [
            { 'type': 'html', selector: 'h2.jobtitle' },
            { 'type': 'text', selector: 'span.company' }
        ];

        // test lib function
        BasicHandlers.lib.processHorseman('http://nz.indeed.com/', actions, results).done((returnResults) => {

            console.log(returnResults);
            expect(returnResults).to.exist();
            done();
        }, (err) => {

            done(err);
        });
    });
});
