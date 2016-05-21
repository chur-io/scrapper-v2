'use strict';

// requires for testing
const Code        = require('code');
const expect      = Code.expect;
const Lab         = require('lab');
const lab         = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe    = lab.describe;
const it          = lab.it;
const after       = lab.after;

// require hapi server
const Server = require('../../app.js');

// tests
describe('functional tests - basic', { timeout: 10000 }, () => {

    it('should scrape', (done) => {

        const actions = [
            { 'type': 'type', selector: 'input[name="q"]', 'text': 'angular' },
            { 'type': 'click', selector: '#fj' },
            { 'type': 'waitForNextPage' }
        ];

        const results = [
            { 'type': 'html', selector: 'h2.jobtitle' },
            { 'type': 'text', selector: 'span.company' }
        ];


        // make API call to self to test functionality end-to-end
        Server.inject({
            method: 'POST',
            url: '/api/basic/scrape',
            payload: {
                open: 'http://nz.indeed.com/',
                actions,
                results
            }
        }, (response) => {

            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    after((done) => {

        // placeholder to do something post tests
        done();
    });
});

describe('functional tests - get documentation', () => {

    it('should return documentation html', (done) => {

        // make API call to self to test functionality end-to-end
        Server.inject({
            method: 'GET',
            url: '/'
        }, (response) => {

            expect(response.statusCode).to.equal(200);
            expect(response.result).to.be.a.string();
            done();
        });
    });

    after((done) => {

        // placeholder to do something post tests
        done();
    });
});
