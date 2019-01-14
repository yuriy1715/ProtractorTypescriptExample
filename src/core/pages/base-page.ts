import { browser, ElementFinder, ExpectedConditions, promise } from 'protractor';
const EC = ExpectedConditions;

export class BasePage {

	// ExpectedConditions helper
	public waitForElementVisible(locator: ElementFinder, ms: number): promise.Promise<void> {
		return browser.wait(EC.visibilityOf(locator), ms);
	}

	public waitForElementIsNotVisible(locator: ElementFinder, ms: number): promise.Promise<void> {
		return browser.wait(EC.invisibilityOf(locator), ms);
	}

	public waitForElementPresentInDom(locator: ElementFinder, ms: number): promise.Promise<void> {
		return browser.wait(EC.presenceOf(locator), ms);
	}

	public waitForElementClickable(locator: ElementFinder, ms: number): promise.Promise<void> {
		return browser.wait(EC.elementToBeClickable(locator), ms);
	}

	public waitForElementSelected(locator: ElementFinder, ms: number): promise.Promise<void> {
		return browser.wait(EC.elementToBeSelected(locator), ms);
	}

	public waitForTextToBePresentInElement(locator: ElementFinder, text: string, ms: number): promise.Promise<void> {
		return browser.wait(EC.textToBePresentInElement(locator, text), ms);
	}

	public waitForTextToBePresentInElementValue(locator: ElementFinder, text: string, ms: number): promise.Promise<void> {
		return browser.wait(EC.textToBePresentInElementValue(locator, text), ms);
	}

}
