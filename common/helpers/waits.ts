import { browser, ElementFinder, ExpectedConditions as EC } from '../../src/core/baseComponents/node_modules/protractor';

import { config } from '../../run_config';

/**
 * Waits for different cases on page.
 */
class Waits {

	/**
	 * Wait for element visible on the page.
	 * @param locator Element finder on the page.
	 * @param ms Time for condition.
	 */
	public async waitForElementVisible(locator: ElementFinder, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.visibilityOf(locator), ms, `Element "${locator.locator()}" is not visible on the page`);
	}

	/**
	 * Wait for element is not visible on the page.
	 * @param locator Element finder on the page.
	 * @param ms Time for condition.
	 */
	public async waitForElementIsNotVisible(locator: ElementFinder, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.invisibilityOf(locator), ms, `Element "${locator.locator()}" stays visible on the page`);
	}

	/**
	 * Wait for element present in DOM.
	 * @param locator Element finder on the page.
	 * @param ms Time for condition.
	 */
	public async waitForElementPresentInDom(locator: ElementFinder, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.presenceOf(locator), ms, `Element "${locator.locator()}" is not present in DOM`);
	}

	/**
	 * Wait for element clickable.
	 * @param locator Element finder on the page.
	 * @param ms Time for condition.
	 */
	public async waitForElementClickable(locator: ElementFinder, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.elementToBeClickable(locator), ms, `Element "${locator.locator()}" is not clickable in DOM`);
	}

	/**
	 * Wait for element selected.
	 * @param locator Element finder on the page.
	 * @param ms Time for condition.
	 */
	public async waitForElementSelected(locator: ElementFinder, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.elementToBeSelected(locator), ms, `Element "${locator.locator()}" is not selected in DOM`);
	}

	/**
	 * Wait for url contains.
	 * @param url url or it's part.
	 * @param ms Time for condition.
	 */
	public async waitForUrlContains(url: string, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.urlContains(url), ms, `Url "${url}" is not contained`);
	}

	/**
	 * Wait for text to be present in element's value.
	 * @param locator Element finder on the page.
	 * @param text Text in element's value
	 * @param ms Time for condition.
	 */
	public async waitForTextToBePresentInElementValue(locator: ElementFinder, text: string, ms: number = config.defaultExplicitTimeouts.medium): Promise<boolean> {
		return browser.wait(EC.textToBePresentInElementValue(locator, text), ms, `Value ${text} is not present in element ${locator.locator()}`);
	}

}

export const waits = new Waits();
