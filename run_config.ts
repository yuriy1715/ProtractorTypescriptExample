import { Config, browser } from 'protractor';
import * as HtmlReporter from 'protractor-beautiful-reporter';
import { SpecReporter } from 'jasmine-spec-reporter';

export let config: Config =  {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specs/*/*spec.js'],

    directConnect: true,

    baseUrl: 'http://localhost:4444',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--test-type',
                '--use-fake-ui-for-media-stream',
                '--use-fake-device-for-media-stream',
                '--disable-popup-blocking',
                '--disable-notifications',
                '--unsafely-treat-insecure-origin-as-secure={urlOrigin}',
                '--no-default-browser-check',
                '--disable-infobars',
                '--no-proxy-server',
                '--disable-desktop-notifications',
                '--disable-geolocation',
                '--disable-web-security',
                '--allow-file-access',
                '--disable-extensions',
                '--ignore-certificate-errors',
                '--lang=ENU',
                '--window-size=1920,1080'
            ],
            binary: ''
        },
        loggingPrefs: {
            browser: 'ALL'
        }
    },

    onPrepare: async () => {
        await browser.get(browser.baseUrl);
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reporter',
            takeScreenShotsForSkippedSpecs: true,
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());
    },
    logLevel: 'ERROR',

    SELENIUM_PROMISE_MANAGER: false,

    noGlobals: false,

    /*  multiCapabilities: [{
          browserName: 'chrome'
      }, {
          browserName: 'firefox'
      }],*/

    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        displaySpecDuration: true,
        silent: true,
        defaultTimeoutInterval: 50000,
        print: () => {},
    },
};
