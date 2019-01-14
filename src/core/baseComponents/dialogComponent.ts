import { browser, by, element } from 'protractor';
import { BasePage } from '../pages/base-page';

export class DialogComponent extends BasePage {

	public readonly removeFolderDialog = element(by.css('[data-qa=removeFolderDialog]'));
	public readonly removeFolderYes = element(by.css('[data-qa=removeFolderYes]'));
	public readonly removeFolderNo = element(by.css('[data-qa=removeFolderNo]'));

	public async selectDialogOption(actions: 'yes' | 'no') {
		await browser.switchTo().activeElement();
		switch (actions) {
			case 'yes':
				await this.removeFolderYes.click();
				break;
			case 'no':
				await this.removeFolderNo.click();
			default:
				break;
		}
	}
}
