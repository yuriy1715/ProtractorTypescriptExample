import { by, element } from 'protractor';

import { waits } from '../../../common/helpers/waits';
import { BasePage } from '../pages/base.page';

/**
 * API for all actions in Search component
 */
export class SearchComponent extends BasePage {
	/**
	 * Activate search button locator
	 */
	public readonly activateSearchBtn = element(by.css('[data-qa=activateSearch]'));
	/**
	 * Start search button locator
	 */
	public readonly startSearchBtn = element(by.css('[data-qa=startSearch]'));
	/**
	 * Exit search button locator
	 */
	public readonly exitSearchBtn = element(by.css('[data-qa=exitSearch]'));
	/**
	 * Search field
	 */
	public readonly searchField = element(by.css('[data-qa=searchInput]'));
	/**
	 * Clear search button locator
	 */
	public readonly clearSearchBtn = element(by.css('[data-qa=clearSearch]'));
	/**
	 * Results of search default text
	 */
	public readonly blankSlate = element(by.css('.blankslate'));

	/**
	 * Search some element in library by search button
	 * @param text Text searched item
	 */
	public async findItemInLibrary(text: string): Promise<void> {
		await waits.waitForElementClickable(this.activateSearchBtn, 2000);
		await this.activateSearchBtn.click();
		await this.searchField.sendKeys(text);
	}

	/**
	 * Clear results in search and try search again
	 * @param text Text searched item
	 */
	public async clearResultAndStartNewSearch(text: string): Promise<void> {
		await this.clearSearchBtn.click();
		await this.searchField.sendKeys(text);
		await this.startSearchBtn.click();
	}
}
