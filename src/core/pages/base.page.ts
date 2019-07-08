import * as fs from 'fs';
import * as log4js from 'log4js';
import { browser, promise } from 'protractor';
import { config } from '../../../run_config';

const logger: log4js.Logger = log4js.getLogger('Base page logger');

/**
 * Wrapper class for each protractor functions
 */
export abstract class BasePage {

	/**
	 * Resize window frame by coordinates
	 * @param width The desired window width.
	 * @param height The desired window width.
	 */
	public resizeWindow(width: number, height: number): promise.Promise<void> {
		return browser.manage().window().setSize(width, height);
	}

	/**
	 * Styles element by css selector.
	 */
	public async styleElement(selector, style): Promise<void> {
		// tslint:disable-next-line:no-shadowed-variable
		await browser.executeScript((selector, style) => {
			Object.assign(document.querySelector(selector).style, style);
		},                          selector, style);
	}

	/**
	 * Verify that file is exist in downloads folder
	 */
	public async verifyFileInDownloadsFolder(file: string) {
		const filePath = `${config.downloadsPath}/${file}`;
		logger.info(filePath);
		await browser.wait(async () => fs.existsSync(filePath), 5000, 'File does not appear!');
		await expect(fs.existsSync(filePath)).toBe(true);
	}
}
