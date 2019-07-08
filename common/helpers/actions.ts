import { by, element, ElementFinder, promise } from '../../src/core/baseComponents/node_modules/protractor';

import { config } from '../../run_config';
import { waits } from './waits';

/**
 * Wrappers for common used actions.
 */
class Actions {

	/**
	 * Click to the element, when he is ready in DOM.
	 * @param locator Element finder on the page.
	 */
	public async clickWhenElementClickable(locator: ElementFinder): Promise<void> {
		await waits.waitForElementVisible(locator, config.defaultExplicitTimeouts.small);
		await waits.waitForElementClickable(locator, config.defaultExplicitTimeouts.small);
		await locator.click();
	}

	/**
	 * Clear filed and type value into filed
	 * @param locator Element finder on the page.
	 * @param value Value into field
	 */
	public async clearAndSetValue(locator: ElementFinder, value: string): Promise<void> {
		await waits.waitForElementVisible(locator, config.defaultExplicitTimeouts.small);
		await locator.clear();
		await locator.sendKeys(value);
	}

	/**
	 * Checks whether the element is visible on page. Returns true or false.
	 * @param elementToCheck Selector or ElementFinder instance of the element to check.
	 * @param containedText Text containing in element.
	 */
	public isElementDisplayed(elementToCheck: string | ElementFinder, containedText?: string | RegExp): promise.Promise<boolean> {
		let elementFinder: ElementFinder;
		if (typeof elementToCheck === 'string') {
			elementFinder = containedText
				? element(by.cssContainingText(elementToCheck, containedText))
				: element(by.css(elementToCheck));
		} else {
			elementFinder = elementToCheck;
		}
		return elementFinder.isDisplayed().then(undefined, () => false);
	}

}

export const actions = new Actions();
