import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { actions } from '../../../common/helpers/actions';
import { waits } from '../../../common/helpers/waits';
import { SearchComponent } from '../baseComponents/search.component';
import { filterElementsByText } from '../utils/base-actions';
import { BasePage } from './base.page';

interface Point {
	/**
	 * X offset.
	 */
	x: number;

	/**
	 * Y offset.
	 */
	y: number;
}

/**
 * API for all actions in Left panel of app
 */
export class LeftPanelPage extends BasePage {
	/**
	 * Process area component locator.
	 */
	public readonly processLibToolsArea = element(by.css('[data-qa=process_lib_tools]'));

	/**
	 * Process library area location
	 */
	public readonly processLibArea = element.all(by.css('[data-qa=processLibArea]'));

	/**
	 * List of all web elements processes
	 */
	public readonly processList = element.all(by.css('[data-qa=processList]'));

	/**
	 * List of all web elements folders
	 */
	public readonly folderList = element.all(by.css('[data-qa=folderList]'));

	/**
	 * List of all web elements processes with text
	 */
	public readonly processListWithCaption = element.all(by.css('[data-qa=processList] .node-caption'));

	/**
	 * List of all web elements folders with text
	 */
	public readonly folderListWithCaption = element.all(by.css('[data-qa=folderList] .node-caption'));

	/**
	 * List of all web elements processes after search
	 */
	public readonly processListSearchResult = element.all(by.css('[data-qa=processLibSearchResultsArea] .node-caption'));

	/**
	 * Menu button on some element in library
	 */
	public readonly menuProcessLibElement = element(by.css('[data-qa=menuProcessLibElement]'));

	/**
	 * Rename button
	 */
	public readonly renameBtn = element(by.css('[data-qa=renameBtn]'));

	/**
	 * Delete button
	 */
	public readonly deleteBtn = element(by.css('[data-qa=deleteBtn]'));

	/**
	 * Import button
	 */
	public readonly import = element(by.css('[data-qa=importBtn]'));

	/**
	 * Generate documentation button
	 */
	public readonly generateDoc = element(by.css('[data-qa=getReportBtn]'));

	/**
	 * Inner web elements with caption in folder
	 */
	public readonly innerItemsInFolderWithCaption = element.all(by.css('[node-level="1"] .node-caption'));

	/**
	 * Return folder webElement by title in DOM
	 * @param name Title of folder
	 * @param level aria level in library, 0 - source, 1 - included(folder in folder), 2 -(folder in folder in folder)
	 */
	public getFolderByNameWithLevel(name: string, level: number): ElementFinder {
		return element(by.css(`[data-qa=folderList][node-level='${level}'] .node-caption[title=${name}]`));
	}

	/**
	 *  Return process webElement by title in DOM
	 * @param name Title of process
	 * @param level aria level in library, 0 - source, 1 - included(process in folder), 2 -(process in folder in folder)
	 */
	public getProcessByNameWithLevel(name: string, level: number): ElementFinder {
		return element(by.css(`[data-qa=processList][node-level='${level}'] .node-caption[title='${name}']`));
	}

	/**
	 * Return new Search component.
	 */
	public getSearchComponent(): SearchComponent {
		return new SearchComponent();
	}

	/**
	 * Choose item in library by name
	 * @param item Name of type item in library.
	 * @param name Name of element position
	 * @param onlyReturn return webElement without click()
	 */
	public async selectItemInLibraryByName(item: 'folder' | 'process', name: string, onlyReturn?: boolean): Promise<ElementFinder> {
		const elementList = this.selectProcessOrFolder(item);
		if (!onlyReturn) {
			await elementList.filter(elem => elem.getText()
				.then(text => text === name)).click();
		} else {
			const elementInArray = await elementList.filter(elem => elem.getText().then(text => text === name));
			const webElement: ElementFinder = elementInArray[0];
			return webElement;
		}
	}

	/**
	 * Perform double click by process.
	 * @param name Process name.
	 */
	public async dblClickProcessItemByName(name: string) {
		const process1ListItem = (await filterElementsByText(this.processListWithCaption, name))[0];
		await browser.actions().mouseMove(process1ListItem).perform();
		await browser.actions().doubleClick(process1ListItem).perform();
	}

	/**
	 * Click item in library by name and return this item webElement
	 * @param item Name of type item in library.
	 * @param name Name of element position
	 * @param level level aria level in library, 0 - source, 1 - included(process in folder), 2 -(process in folder in folder)
	 */
	public async selectItemByNameWithLevel(item: 'folder' | 'process', name: string, level: number = 0): Promise<ElementFinder> {
		let webElement: ElementFinder;
		switch (item) {
			case 'folder':
				webElement = this.getFolderByNameWithLevel(name, level);
				break;
			case 'process':
				webElement = this.getProcessByNameWithLevel(name, level);
				break;
		}
		await webElement.click();
		return webElement;
	}

	/**
	 * Open menu of selected item in library
	 * @param webElement ElementFinder in library
	 */
	public async openMenuInSelectedItem(webElement: ElementFinder): Promise<void> {
		const selectorOfIem = await webElement.locator().toString().match(/\[.+\]/)[0];
		const menuSelector = await this.menuProcessLibElement.locator().toString().match(/\[.+\]/)[0];
		return element(by.css(`${selectorOfIem}~${menuSelector}`)).click();
	}

	/**
	 * Choose some item process or folder
	 * @param name Name of type item in library
	 */
	public selectProcessOrFolder(name: string): ElementArrayFinder {
		if (name === 'folder') {
			return this.folderListWithCaption;
		} else if (name === 'process') {
			return this.processListWithCaption;
		} else {
			throw new Error('no items, need to use \'folder\' or \'process\'');
		}
	}

	/**
	 * Choose action in menu some item
	 * @param action Menu option.
	 */
	public async selectActionInMenuItem(action: 'rename' | 'delete' | 'import' | 'generateDoc'): Promise<void> {
		switch (action) {
			case 'rename':
				await actions.clickWhenElementClickable(this.renameBtn);
				break;
			case 'delete':
				await actions.clickWhenElementClickable(this.deleteBtn);
				break;
			case 'import':
				await actions.clickWhenElementClickable(this.import);
				break;
			case 'generateDoc':
				await actions.clickWhenElementClickable(this.generateDoc);
				break;
		}
	}

	/**
	 * Imports process to selected lib item.
	 */
	public async importToSelectedElement(selectedElement: ElementFinder, filePath: string): Promise<void> {
		const selector = '.ts-menu input[type="file"][accept=".bpmn"]';
		await this.openMenuInSelectedItem(selectedElement);
		await this.selectActionInMenuItem('import');
		await this.styleElement(selector, {display: 'initial'});
		await element(by.css(selector)).sendKeys(filePath);
		await this.styleElement(selector, {display: 'none'});
		await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
	}

	/**
	 * Get text for inner web elements in folder
	 */
	public async getTextOfElementsInFolder(): Promise<string> {
		// need to change locators after developers refactoring aria attributes in tree-lib (by A.Dudka)
		const expandedListElements = this.innerItemsInFolderWithCaption.getText();
		return expandedListElements;
	}

	/**
	 * Press Key enter in active element
	 */
	public async pressEnterOnActiveElement(): Promise<void> {
		await browser.sleep(1000); // need to use, because we can't control active element
		await browser.switchTo().activeElement();
		await browser.actions().sendKeys(protractor.Key.ENTER).perform();
	}

	/**
	 * Rename active element
	 */
	public async renameActiveElement(name: string): Promise<void> {
		await waits.waitForElementVisible(browser.element(by.css('.editable-node.ts-input')));
		await browser.switchTo().activeElement().sendKeys(name);
		await browser.actions().sendKeys(protractor.Key.ENTER).perform();
	}

	/**
	 * Lost focus from active element
	 */
	public async changeFocus(): Promise<void> {
		return this.processLibToolsArea.click();
	}
	/**
	 * Returns count element's of LibArea
	 */
	public async countLibAreaElement(): Promise<any> {
		return this.processLibArea.getText();
	}

	/**
	 * Drag and drop some web element.
	 * @param location Web element should be move.
	 * @param target Web element target.
	 * @param coordinates Coordinates.
	 */
	public async dragAndDropElement(location: ElementFinder, target: ElementFinder, coordinates?: Point): Promise<void> {
		// drag and drop doesn't works correctly in chrome with html5 page, more https://github.com/angular/protractor/issues/583;
		await browser.actions().mouseDown(location).perform();
		await browser.actions().mouseMove(target, coordinates).perform();
		await browser.actions().mouseMove(target, coordinates).perform();
		await browser.actions().mouseUp().perform();
	}

	/**
	 * Select folder by name if passed and press button for expand.
	 */
	public async expandFolder(folder: string = '') {
		if (folder) {
			await this.selectItemInLibraryByName('folder', folder);
		}
		const selectedAndExpanedFolder = element.all(by.css('[data-qa=folderList].selected.expanded'));
		if (await selectedAndExpanedFolder.count() > 0) {
			// folder already expanded
			return;
		}
		const expandFolderButton = element(by.css('[data-qa=folderList].selected [data-qa=expandFolder]'));
		await expandFolderButton.click();
	}
}
