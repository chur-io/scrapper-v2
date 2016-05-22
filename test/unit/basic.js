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

    it('should return empty options with undefined if not set', (done) => {

        // test lib function
        const options = BasicHandlers.lib.horsemanOptions();

        expect(options).to.exist();

        done();
    });

    it('should return proxy options with undefined if SCRAPPER_PROXY is set', (done) => {

        process.env.SCRAPPER_PROXY = '127.0.0.1:8080';

        const options = BasicHandlers.lib.horsemanOptions();

        expect(options).to.exist();
        expect(options.proxy).to.equal(process.env.SCRAPPER_PROXY);
        expect(options.proxyType).to.equal('http');

        done();
    });

    it('should return phantomPath options with undefined if SCRAPPER_PHANTOMPATH is set', (done) => {

        process.env.SCRAPPER_PHANTOMPATH = '/app/node_modules/phantomjs-prebuilt/bin/phantomjs';

        const options = BasicHandlers.lib.horsemanOptions();

        expect(options).to.exist();
        expect(options.phantomPath).to.equal(process.env.SCRAPPER_PHANTOMPATH);

        done();
    });
});
