/* tslint:disable:variable-name no-empty */

process.env.TS_NODE_FILES = 'true';
require('ts-node').register();

Object.defineProperty(exports, '__esModule', {value: true});
const jasmineReporters = require('jasmine-reporters');
const jasmineSpecReporter = require('jasmine-spec-reporter');
const protractor = require('protractor');
const HtmlReporter = require('protractor-beautiful-reporter');
const path = require('path');
const join = require('path').join;
const fs = require('fs');
const log4js = require('log4js');
const loggerConfig = require('./logger.config');
const downloadsPath = path.resolve(__dirname, './downloads');
const screenshotPath = path.resolve(__dirname, './screenshots');
const AllureReporter = require('jasmine-allure-reporter');

let config = {

	baseUrl: '{baseUrl}',
	/**
	 * Global path to download folder
	 */
	downloadsPath: downloadsPath,

	/**
	 * Global path to screenshot folder
	 */
	screenshotPath: screenshotPath,
	
	/**
	 * Screenshot extension
	 */
	imageExtension: '1920x1080.png',

	suites: {
		'functional-tests': 'src/functional-tests/specs/**/*.spec.ts',
		'visual-tests': 'src/visual-tests/*.vi.ts'
	},

	framework: 'jasmine2',

	directConnect: true,

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
				'--lang=en-GB',
				'--window-size=1920,1080',
				'--no-first-run',
				'--disable-default-apps',
				'--disable-translate',
				'--disable-background-timer-throttling',
				'--disable-renderer-backgrounding',
				'--disable-device-discovery-notifications',
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--headless',
				'--disable-gpu'
			],
			prefs: {
				'download': {
					'prompt_for_download': false,
					'default_directory': downloadsPath,
					'directory_upgrade': true
				}
			},
			binary: ''
		},
		loggingPrefs: {
			browser: 'ALL'
		}
	},

	/**
	 * A callback function called once configs are read but before any
	 * environment setup. This will only run once, and before onPrepare.
	 */
	beforeLaunch: () => {
		if (fs.existsSync('./logs/Log4jsExecution.log')) {
			fs.unlinkSync('./logs/Log4jsExecution.log');
		}
		log4js.configure(loggerConfig);
	},

	/**
	 * A callback function called once protractor is ready and available, and
	 * before the specs are executed.
	 */
	onPrepare: async () => {
		if (process.env.JENKINS_URL) {
			jasmine.getEnv().addReporter(new AllureReporter({ resultsDir: 'allure-results' }));
			let addScreenShots = new function () {
			this.specDone = async function (result) {
				if (result.status === "failed") {
					const screenshot = await browser.takeScreenshot().catch(error => log4js.getLogger('add screens if test failed').warn(error));
					allure.createAttachment('Screenshot', function () {
						return new Buffer(screenshot, 'base64')
					}, 'image/png')();
					}
				}
			};
		jasmine.getEnv().addReporter(addScreenShots);
		const junitReporter = new jasmineReporters.JUnitXmlReporter({
			savePath: './jenkins_e2e_test_results',
			consolidateAll: true,
			captureStdout: true
		});
		jasmine.getEnv().addReporter(junitReporter);
	}
		await protractor.browser.manage().timeouts().implicitlyWait(1000);
		await browser.driver.sendChromiumCommand('Page.setDownloadBehavior', {
			behavior: 'allow',
			downloadPath: downloadsPath
		});
		jasmine.getEnv().addReporter(new jasmineSpecReporter.SpecReporter({spec: {displayStacktrace: true}}));
		jasmine.getEnv().addReporter(new HtmlReporter({
			baseDirectory: './reporter',
			takeScreenShotsForSkippedSpecs: false,
			takeScreenShotsOnlyForFailedSpecs: true
		}).getJasmine2Reporter());
	},

	logLevel: 'ERROR',
	getPageTimeout: 10000,
	allScriptsTimeout: 30000,

	/**
	 * Sets timeout (ms) for every waits.
	 * @example
	 * public waitForElementVisible(locator: ElementFinder, ms: number = config.defaultExplicitTimeouts.small): promise.Promise<void> {
	 * return browser.wait(EC.visibilityOf(locator), ms, `Element "${locator.locator()}" is not visible on the page`);}
	 */
	defaultExplicitTimeouts: {
		small: 5000,
		medium: 15000,
		large: 30000
	},

	/*
	Promise manager should be FALSE. https://www.protractortest.org/#/async-await
	*/
	SELENIUM_PROMISE_MANAGER: false,

	noGlobals: false,

	restartBrowserBetweenTests: false,

	jasmineNodeOpts: {
		showColors: true,
		displaySpecDuration: true,
		silent: true,
		defaultTimeoutInterval: 70000
	},

	plugins: [
		{
			package: 'protractor-image-comparison',
			options: {
				baselineFolder: join(process.cwd(), 'screenshots/expected/'),
				formatImageName: `{tag}-{logName}-{width}x{height}`,
				screenshotPath: join(process.cwd(), 'screenshots/'),
				savePerInstance: true,
				autoSaveBaseline: false,
				clearRuntimeFolder: false,
				debug: false,
			},
		},
	]
};

/**
 * Override config by custom config.
 * @example (run_config_custom.js):
 * exports.config = {
 * 		baseUrl: 'http://localhost:4200',
 * }
 */
const runCustomConfigFileName = 'run_config_custom';
let customRunConfig;
try {
	customRunConfig = require('./' + runCustomConfigFileName);
} catch (e) {
}
if (customRunConfig) {
	const deepmerge = require('deepmerge');
	config = deepmerge.all([config, customRunConfig.config]);
}
if (!config.baseUrl || config.baseUrl === '{' + 'baseUrl}') {
	throw new Error(`run_config.js: specify value config.baseUrl`);
}

exports.config = config;
