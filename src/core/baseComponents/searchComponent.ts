import { browser, by, element, ExpectedConditions } from 'protractor';
import { BasePage } from '../pages/base-page';

export class SearchComponent extends BasePage {
	public readonly activateSearchBtn = element(by.css('[data-qa=activateSearch]'));
	public readonly startSearchBtn = element(by.css('[data-qa=startSearch]'));
	public readonly exitSearchBtn = element(by.css('[data-qa=exitSearch]'));
	public readonly searchField = element(by.css('[data-qa=searchInput]'));
	public readonly clearSearchBtn = element(by.css('[data-qa=clearSearch]'));
	public readonly blankSlate = element(by.css('.blankslate'));

	public async findItemInLibrary(text: string): Promise<void> {
		await this.waitForElementClickable(this.activateSearchBtn, 2000);
		await this.activateSearchBtn.click();
		await this.searchField.sendKeys(text);
	}

	public async clearResultAndStartNewSearch(text: string): Promise<void> {
		await this.clearSearchBtn.click();
		await this.searchField.sendKeys(text);
		await this.startSearchBtn.click();
	}
}
